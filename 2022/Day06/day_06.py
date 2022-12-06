input_data = open("2022/Day06/input.txt", "r", encoding="utf-8").read()
sample_data = open("2022/Day06/sample.txt", "r", encoding="utf-8").read()

def run(data):
    for index, _char in enumerate(list(data)):
        chars = set(data[index: index + 4])
        if len(chars) == 4:
            print(index + 4)
            break
    for index, _char in enumerate(list(data)):
        two_chars = set(data[index: index + 14])
        if len(two_chars) == 14:
            print(index + 14)
            break

run(input_data)
# run(sample_data)
