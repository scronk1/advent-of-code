input_data = open("2022/Day04/input.txt", "r", encoding="utf-8").read()
sample_data = open("2022/Day04/sample.txt", "r", encoding="utf-8").read()

def run(data):
    data = data.split("\n")
    part_one = 0
    part_two = 0
    for item in data:
        pair = item.split(",")
        a_split = pair[0].split("-")
        b_split = pair[1].split("-")
        a_range = set(range(int(a_split[0]), int(a_split[1]) + 1))
        b_range = set(range(int(b_split[0]), int(b_split[1]) + 1))
        common = a_range & b_range
        if common:
            part_two += 1
        if common == a_range or common == b_range:
            part_one += 1
    print(part_one)
    print(part_two)




run(input_data)
# run(sample_data)
