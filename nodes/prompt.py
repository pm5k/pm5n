# TODO this is still very much a work in progress.. do not use..
import re


class TextMulti:
    def __init__(self):
        pass

    @classmethod
    def IS_CHANGED(*args, **kwargs):
        return True

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {"text": ("STRING", {"multiline": True})},
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "handler"
    OUTPUT_IS_LIST = (True,)
    OUTPUT_NODE = True
    CATEGORY = "pm5n"

    def handler(self, text):
        return (text,)


class TextConcat:
    def __init__(self):
        pass

    @classmethod
    def IS_CHANGED(*args, **kwargs):
        return True

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {},
            "optional": {
                "text_a": ("STRING", {"forceInput": True}),
                "text_b": ("STRING", {"forceInput": True}),
                "text_c": ("STRING", {"forceInput": True}),
                "text_d": ("STRING", {"forceInput": True}),
                "text_e": ("STRING", {"forceInput": True}),
                "text_f": ("STRING", {"forceInput": True}),
                "text_g": ("STRING", {"forceInput": True}),
            },
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "handler"

    CATEGORY = "pm5n"

    @staticmethod
    def handle_newlines(text):
        # Correcting the regular expression based on the provided examples
        # We will make sure there are no spaces after an opening parenthesis '('
        # and no spaces before a closing parenthesis ')' or a colon ':'

        # First, normalize the text by replacing newline and multiple spaces with a single space
        normalized_text = re.sub(r"\s*\n\s*|\s{2,}", " ", text).strip()

        # Apply rule 1 and 2: Remove spaces after '(' and before ')'
        normalized_text = re.sub(r"\(\s+", "(", normalized_text)
        normalized_text = re.sub(r"\s+\)", ")", normalized_text)

        # Apply rule 3: Remove spaces before a colon that is after a word character
        normalized_text = re.sub(r"\s+(:)", r"\1", normalized_text)
        return normalized_text

    def handler(self, **kwargs):
        print(kwargs)
        items = [
            self.handle_newlines(text)
            for key, text in kwargs.items()
            if key.startswith("text_")
            if text.strip() != ""
        ]

        # Sort out the comma combos
        for index, item in enumerate(items):
            next_item = items[index + 1] if index + 1 < len(items) else None

            if not next_item:
                break

            # If both current item has trailing comma and next item has a preceding one, remove the trailing comma
            if item.endswith(",") and next_item.startswith(","):
                items[index] = item[:-1]
            # If current item has no trailing comma and next item has no preceding one, add a trailing comma
            elif not item.endswith(",") and not next_item.startswith(","):
                items[index] = item + ", "
            else:
                continue

        # Eliminate any extra trailing comma
        result = "".join(items).strip(",").replace(" ,", ",")
        print(f">>> RESULTING CONCAT IS: [{result}] <<<")
        return (result,)
