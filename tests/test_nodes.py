from pm5n.nodes.prompt import TextConcat


def test_concat_happy_path():
    node = TextConcat()
    result = node.handler(text_a="hello,", text_b="world")
    assert result == ("hello,world",)


def test_concat_comma_combos():
    node = TextConcat()
    inputs = {
        "text_a": "a cat,",
        "text_b": "in a hat, with a rat",
        "text_c": ",on top of a mat,",
        "text_d": "and a bat",
        "text_e": "",
        "text_f": "above the flat,",
    }
    result = node.handler(**inputs)
    assert result == (
        "a cat,in a hat, with a rat,on top of a mat,and a bat,above the flat",
    )
