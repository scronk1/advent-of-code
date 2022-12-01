import numpy as np

data = open("2015/Day06/input.txt", "r", encoding="utf-8").read()


def run(input_data):
    matrix = np.zeros((1000, 1000))
    instructions = input_data.split("\n")
    for ins in instructions:
        instr, first, sec = parse_instr(ins)
        for i in range(first[0], sec[0] + 1):
            for j in range(first[1], sec[1] + 1):
                if instr == "on":
                    matrix[i][j] += 1
                elif instr == "off":
                    if (matrix[i][j] > 0):
                        matrix[i][j] -= 1
                else:
                    matrix[i][j] += 2

    ans = sum([sum(item) for item in matrix])
    print(ans)


def parse_instr(instruction):
    words = instruction.split(" ")
    if len(words) == 5:
        words.pop(0)
    instr = words[0]
    first = [int(c) for c in words[1].split(",")]
    sec = [int(c) for c in words[3].split(",")]

    return instr, first, sec


run(data)
