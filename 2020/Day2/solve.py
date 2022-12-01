text_input = open("Day2/input.txt", "r")
data = text_input.read().split("\n")


def old_policy(input_data):
    valid_count = 0
    for item in input_data:
        min, max, letter, password = extract_data(item)
        count = password.count(letter)
        if max >= count >= min:
            valid_count += 1
    return valid_count


def new_policy(input_data):
    valid_count = 0
    for item in input_data:
        first, second, letter, password = extract_data(item)
        first_check = password[first - 1]
        second_check = password[second - 1]
        if first_check == letter or second_check == letter:
            if not (first_check == letter and second_check == letter):
                valid_count += 1
    return valid_count


def extract_data(item):
    components = item.split(" ")
    min = int(components[0].split("-")[0])
    max = int(components[0].split("-")[1])
    letter = components[1][0].lower()
    password = components[2].lower()
    return min, max, letter, password


print(old_policy(data))
print(new_policy(data))
