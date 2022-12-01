import numpy as np

data = open("2015/Day03/input.txt", "r", encoding="utf-8").read()

def run(input_data):
    matrix = np.zeros((1000,1000))
    s_row = 500
    s_col = 500
    r_row = 500
    r_col = 500
    matrix[500][500] = 1
    for index, item in enumerate(input_data):
        if index % 2 == 0:
            s_col, s_row = move_santa(item, s_col, s_row)
            matrix[s_row, s_col] = 1
        else:
            r_col, r_row = move_santa(item, r_col, r_row)
            matrix[r_row, r_col] = 1
    ans = sum([sum(item) for item in matrix])
    print(ans)


def move_santa(i, col, row):
    if i == ">":
        col += 1
    elif i == "<":
        col -= 1
    elif i == "^":
        row += 1
    else:
        row -= 1
    return col, row


run(data)
