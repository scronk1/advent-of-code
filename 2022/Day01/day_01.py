input_data = open("2022/Day01/input.txt", "r", encoding="utf-8").read()
sample_data = open("2022/Day01/sample.txt", "r", encoding="utf-8").read()

def run(data, answer, answer_2):
    list_form = data.split("\n\n")
    sums = []
    for item in list_form:
        elf = [int(item) for item in item.split("\n")]
        sums.append(sum(elf))

    assert max(sums) == answer

    sums.sort(reverse=True)
    assert sum(sums[0:3]) == answer_2


run(sample_data, 24000, 45000)
run(input_data, 64929, 193697)
