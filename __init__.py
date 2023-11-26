# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/


import os
from pathlib import Path

import folder_paths
import numpy as np
from PIL import Image, ImageDraw, ImageFont

from nodes import SaveImage

# Hack for pytest since we don't wanna import server in the tests.
try:
    import pm5n.api  # noqa: F401
except ModuleNotFoundError:
    pass
from pm5n.database import session  # noqa: F401
from pm5n.database.models.expansions import Expansion, Tag  # noqa: F401
from pm5n.nodes.prompt import TextConcat, TextMulti


def bootstrap_db():
    """Give the user an initial expansion to work with."""
    with session() as sess:
        example = Expansion(
            trigger="_example_",
            expansion="gorgeous flower blooming in the sun, highly ornate fractal pot, sunbeams",
            img="placeholder.png",
            tags=[
                Tag(name="example"),
                Tag(name="flower"),
                Tag(name="fractal"),
            ],
        )
        sess.add(example)


class PromptNode:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "prompt": ("STRING", {"multiline": True}),
                "clip": ("CLIP",),
            },
        }

    CATEGORY = "pm5n"
    FUNCTION = "handler"
    OUTPUT_NODE = True
    RETURN_TYPES = ("CONDITIONING",)
    RETURN_NAMES = ("Prompt",)

    @classmethod
    def IS_CHANGED(*args, **kwargs):
        return True

    def handler(self, clip, prompt: str, **kwargs):
        # TODO: think about other tokens that may need stripping, not just commas..
        clean_tokens = [tok.strip(",") for tok in prompt.split(" ")]
        with session() as sess:
            expansions = (
                sess.query(Expansion).filter(Expansion.trigger.in_(clean_tokens)).all()
            )
            expanded_prompt = prompt
            for exp in expansions:
                expanded_prompt = expanded_prompt.replace(exp.trigger, exp.expansion)
            tokens = clip.tokenize(expanded_prompt)
            cond, pooled = clip.encode_from_tokens(tokens, return_pooled=True)
            return ([[cond, {"pooled_output": pooled}]],)


class StackingPreviewNode(SaveImage):
    palette_map = {
        "white": (255, 255, 255),
        "black": (0, 0, 0),
        "yellow": (255, 244, 189),
        "red": (244, 185, 184),
        "blue": (133, 210, 208),
        "purple": (136, 123, 176),
    }

    def __init__(self):
        self.output_dir = folder_paths.get_temp_directory()
        self.type = "temp"
        self.prefix = "tps_img"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "border_width": (
                    "INT",
                    {"default": 0, "min": 0, "max": 10, "step": 5},
                ),
                "border_color": ([k for k, v in cls.palette_map.items()],),
                "label": ("STRING", {"default": ""}),
                "purge_this_run": ("BOOLEAN", {"default": False}),
                "grid_row_length": ("INT", {"default": 5, "min": 1, "max": 10}),
            },
            "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
        }

    RETURN_TYPES = ()
    FUNCTION = "save_images"
    OUTPUT_NODE = True
    CATEGORY = "pm5n"

    """
    TODO:

    This is the new version that needs implementation.. Here are the steps:

    1. Load all the images from the tmp folder that match the prefix
    2. Iterate over them and derive their size based on width * height. Pick the smallest.
    3. Count the images and calculate how many rows and columns we need to display them all based on row length var including padding and title dimensions if set.
    4. Create a new image with the size of the smallest image * rows and columns.
    5. Iterate over the images again, apply padding and title if these are set and paste them into the new image at coordinates calulated by row and column.
    6. Save the new image to the output folder as well as return all the separate images for this session to the UI.

    Extra consideration: The grid images need to be rotated in name when purging happens so they dont overwrite anything in the output..
    """

    def save_images(
        self,
        images: list,
        label: str,
        border_width: int,
        border_color: str,
        purge_this_run: bool,
        grid_row_length: int,
        **kwargs,
    ):
        (
            full_output_folder,
            filename,
            counter,
            subfolder,
            _,
        ) = folder_paths.get_save_image_path(
            self.prefix, self.output_dir, images[0].shape[1], images[0].shape[0]
        )

        # Kill all images in the tmp dir if the user wants to purge this run
        if purge_this_run:
            for image in Path(full_output_folder).glob("*.png"):
                image.unlink()

        # Iterate over all incoming images and save them to the tmp dir
        for new_img in images:
            np_data = 255.0 * new_img.cpu().numpy()
            img = Image.fromarray(np.clip(np_data, 0, 255).astype(np.uint8))
            file = f"{filename}_{counter:05}_.png"

            # Add a white border to the image if selected:
            if border_width != 0:
                padding_top = 20 if label else 0
                new_size = (
                    img.width + border_width,
                    img.height + border_width + padding_top,
                )
                img_w_border = Image.new(
                    "RGB", new_size, self.palette_map[border_color]
                )
                # This centers the image using halfway points of border h/w
                # But we should pad the top if there's a label
                box = tuple((n - o) // 2 for n, o in zip(new_size, img.size))
                if label:
                    # Adjust box to include padding for label
                    box = (
                        box[0],
                        box[1] + padding_top // 2,
                    )
                img_w_border.paste(img, box)
                img = img_w_border

                # Draw the label on the padded area
                if label:
                    font = ImageFont.truetype("arial.ttf", 16)
                    draw = ImageDraw.Draw(img)
                    text_width, text_height = font.getbbox(label)[2:]
                    position = (
                        (img.width - text_width) / 2,
                        (padding_top - text_height) / 2,
                    )
                    draw.text(
                        position,
                        label,
                        font=font,
                        fill="white" if border_color == "black" else "black",
                    )
            img.save(os.path.join(full_output_folder, file), compress_level=4)
            counter += 1

        # Populate the list of all images in the tmp dir..
        results = []
        grid_images: list[Image.Image] = []
        for image in Path(full_output_folder).glob("*.png"):
            if not image.name.startswith(self.prefix) or image.name.endswith(
                "grid.png"
            ):
                continue
            results.append(
                {
                    "filename": image.name,
                    "subfolder": subfolder,
                    "type": self.type,
                }
            )
            grid_images.append(Image.open(image))

        # Construct and save a grid image to the output folder
        # First find the smallest image based on width * height
        smallest = min(grid_images, key=lambda x: x.width * x.height)

        # Construct a grid based on total count of images and row limit..
        img_count = len(grid_images)
        grid_width = (
            grid_row_length * smallest.width
            if img_count > grid_row_length
            else img_count * smallest.width
        )
        grid_height = int(np.ceil(img_count / grid_row_length)) * smallest.height
        grid_img = Image.new(
            "RGB", (grid_width, grid_height), self.palette_map[border_color]
        )
        for i, img in enumerate(grid_images):
            # Calculate row and column based on index and row length
            row = i // grid_row_length
            col = i % grid_row_length
            # If image is of different size than the smallest image dimensions, make it scaled
            # to the smallest image dimensions
            if img.width != smallest.width or img.height != smallest.height:
                img = img.resize((smallest.width, smallest.height))
            # Paste the image into the grid
            grid_img.paste(img, (col * img.width, row * img.height))
        # Save the grid image to the output folder
        grid_img.save(
            os.path.join(full_output_folder, f"{filename}_{counter}_grid.png"),
            compress_level=0,
        )
        results.append(
            {
                "filename": f"{filename}_{counter}_grid.png",
                "subfolder": subfolder,
                "type": self.type,
            }
        )

        return {"ui": {"images": results}}


NODE_CLASS_MAPPINGS = {
    "SuperPromptNode": PromptNode,
    "TextConcat": TextConcat,
    "TextMulti": TextMulti,
    "PreviewStack": StackingPreviewNode,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "SuperPromptNode": "PM5N: Super Prompt",
    "TextConcat": "PM5N: Text Concatenate",
    "TextMulti": "PM5N: Text Multiline",
    "PreviewStack": "PM5N: Preview Stack",
}

WEB_DIRECTORY = "web"

# Only seed the db if the user asks for it.
if os.getenv("PM5N_BOOTSTRAP"):
    bootstrap_db()
