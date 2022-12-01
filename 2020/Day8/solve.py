text_input = open("2020/Day8/input.txt", "r")
data = text_input.read().split("\n")


def get_accumulator(input_data: list):
    index = 0
    indexes = []
    accumulator = 0
    while index not in indexes:
        index, indexes, accumulator = run_process(input_data, index, indexes, accumulator)
        if accumulator == "END":
            break
    return accumulator


def check_infinite_loop(input_data:list):
    modified_data = input_data.copy()
    for index, command in enumerate(modified_data):
        command = command.split(" ")
        if command[0] == "jmp":
            modified_data[index] = f"nop {command[1]}"
            accumulator = get_accumulator_two(modified_data)
            if accumulator != "END":
                return accumulator
            else:
                modified_data[index] = f"jmp {command[1]}"
        elif command[0] == "nop":
            modified_data[index] == f"jmp {command[1]}"
            accumulator = get_accumulator_two(modified_data)
            if accumulator != "END":
                return accumulator
            else:
                modified_data[index] == f"nop {command[1]}"
        


def get_accumulator_two(modified_data: list):
    accumulator = get_accumulator(modified_data)
    if accumulator == "END":
        index = 0
        indexes = []
        accumulator = 0
        while index < len(modified_data):
            index, indexes, accumulator = run_process(modified_data, index, indexes, accumulator)
        return accumulator
    else:
        return "END"

def run_process(input_data, index, indexes, accumulator):
    try:
        command= input_data[index].split(" ")
        indexes.append(index)
        if command[0] == "acc":
            accumulator += int(command[1])
            index += 1
        elif command[0] == "jmp":
            index += int(command[1])
        elif command[0] == "nop":
            index += 1
        return index, indexes, accumulator
    except IndexError:
        return index, indexes, "END"



# Testing
test_text_input = open("Day8/test_data.txt", "r")
test_data = test_text_input.read().split("\n")

print(get_accumulator(test_data) == 5)
print(check_infinite_loop(test_data) == 8)

# Solve one

print(get_accumulator(data))

# Solve two

print(check_infinite_loop(data))