# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/


import os

import pm5n.api  # noqa: F401
from pm5n.database import session  # noqa: F401
from pm5n.database.models.expansions import Expansion, Tag  # noqa: F401


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


NODE_CLASS_MAPPINGS = {
    "PromptNode": PromptNode,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "PromptNode": "Super Prompt",
}

WEB_DIRECTORY = "web"

# Only seed the db if the user asks for it.
if os.getenv("PM5N_BOOTSTRAP"):
    bootstrap_db()
