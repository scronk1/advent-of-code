input_data = open("2022/Day03/input.txt", "r", encoding="utf-8").read()
sample_data = open("2022/Day03/sample.txt", "r", encoding="utf-8").read()

def run(data):
    data = data.split("\n")
    part_1 = 0
    for item in data:
        limit = int(len(item)/2)
        common = list(set(item[0:limit]) & set(item[limit:]))
        assert len(common) == 1
        part_1 += get_points(common[0])
    print(part_1)

    part_2 = 0
    for i in range(0, len(data), 3):
        a = set(data[i])
        b = set(data[i + 1])
        c = set(data[i + 2])
        common = list(a & b & c)
        assert len(common) == 1
        part_2 += get_points(common[0])
    print(part_2)


def get_points(letter):
    letters = "abcdefghijklmnopqrstuvwxyz"
    if letters.find(letter) >= 0:
        return letters.find(letter) + 1
    else:
        return letters.find(letter.lower()) + 1 + 26


run(input_data)
# run(sample_data)
