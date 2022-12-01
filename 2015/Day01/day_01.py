input_data = open("2015/Day01/input.txt", "r", encoding="utf-8").read()

def run(data):
    list_data = list(data)
    counter = 0
    position = 0
    for index, item in enumerate(list_data):
        if item == "(":
            counter += 1
        else:
            counter -= 1
        if counter < 0 and position == 0:
            position = index + 1
    print(counter)
    print(position)

run(input_data)
