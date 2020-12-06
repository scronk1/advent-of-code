text_input = open("Day6/input.txt", "r")
data = text_input.read().split("\n\n")


def get_anyone_letters(group: list) -> list:
    letters = []
    for index, person in enumerate(group):
        for letter in person:
            if letter not in letters:
                letters.append(letter)
    return letters


def get_everyone_letters(group: list) -> list:
    letters = [letter for letter in group.pop(0)]
    for person in group:
        letters = [letter for letter in person if letter in letters]
    return letters


def get_plane_total(input_data: list, method: str) -> int:
    count = 0
    for group in input_data:
        group = group.split("\n")
        if method == "anyone":
            letters = get_anyone_letters(group)
        elif method == "everyone":
            letters = get_everyone_letters(group)
        count += len(letters)
    return count


# Testing

test_text_input = open("Day6/test_data.txt", "r")
test_data = test_text_input.read().split("\n\n")

print(get_plane_total(test_data, "anyone") == 11)
print(get_plane_total(test_data, "everyone") == 6)

# Solve one

print(get_plane_total(data, "anyone"))

# Solve two

print(get_plane_total(data, "everyone"))