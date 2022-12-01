text_input = open("Day9/input.txt", "r")
data = text_input.read().split("\n")


def get_weird_number(input_data: list, preamble_length: int):
    preamble = input_data[:preamble_length]
    for index in range(preamble_length, len(input_data)):
        check_data = input_data[(index - preamble_length):index]
        check = check_value(check_data, int(input_data[index])) 
        if not check:
            return int(input_data[index])



def check_value(values: list, expected: int) -> bool:
    for value in values:
        new_values = values[1:len(values)]
        for value2 in new_values:
            if int(value) + int(value2) == expected:
                return True


def find_set(input_data: list, goal: int) -> list:
    for index, value in enumerate(input_data):
        total = int(value)
        total_set = [int(value)]
        new_values = input_data[(index+1):len(input_data)]
        for value2 in new_values:
            total += int(value2)
            total_set.append(int(value2))
            if total == goal:
                total_set.sort()
                return total_set[0] + total_set[len(total_set)-1]                    


# Testing
test_text_input = open("Day9/test_data.txt", "r")
test_data = test_text_input.read().split("\n")

print(get_weird_number(test_data, 5) == 127)
print(find_set(test_data, 127) == 62)

# Solve one
print(get_weird_number(data, 25))


# Solve two
print(find_set(data, 675280050))