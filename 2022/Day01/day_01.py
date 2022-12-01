input_data = open("2022/Day01/input.txt", "r", encoding="utf-8").read()
sample_data = open("2022/Day01/sample.txt", "r", encoding="utf-8").read()

def run_1(data, answer):
    sums = get_sums(data)
    assert max(sums) == answer


def run_2(data, answer):
    sums = get_sums(data)
    sums.sort(reverse=True)
    assert sum(sums[0:3]) == answer


def get_sums(data):
    return [sum([int(cal) for cal in item.split("\n")]) for item in data.split("\n\n")]


run_1(sample_data, 24000)
run_2(sample_data, 45000)

run_1(input_data, 64929)
run_2(input_data, 193697)
