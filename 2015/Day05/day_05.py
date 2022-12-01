data = open("2015/Day05/input.txt", "r", encoding="utf-8").read()

ALL = "abcdefghijklmnopqrstuvwxyz"


def run(input_data):
    part_one = [is_nice(text) for text in input_data.split("\n")]
    assert sum(part_one) == 255

    part_two = [is_new_nice(text) for text in input_data.split("\n")]
    assert sum(part_two) == 55


def is_nice(text):
    if is_present(text, "ab"):
        return False
    if is_present(text, "cd"):
        return False
    if is_present(text, "pq"):
        return False
    if is_present(text, "xy"):
        return False
    if sum([text.count(char) for char in "aeiou"]) < 3:
        return False
    if sum([is_present(text, f"{a}{a}") for a in ALL]) < 1:
        return False
    return True


def is_new_nice(text):
    first = False
    second = False
    for index, char in enumerate(list(text)):
        try:
            if char == text[index + 2]:
                first = True
                break
        except IndexError:
            break
    for index, char in enumerate(list(text)):
        try:
            pair = f"{char}{text[index+1]}"
            if is_present(text[index + 2:], pair):
                second = True
                break
        except IndexError:
            break
    return first and second


def is_present(text, char):
    return text.find(char) != -1


run(data)
