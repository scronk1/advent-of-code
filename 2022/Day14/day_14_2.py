import numpy as np

def run():
    # data = get_data("sample")
    data = get_data("input")

    matrix = np.zeros((1000,1000))

    for item in data.split("\n"):
        rocks = item.split(" -> ")
        for index, p in enumerate(rocks):
            if p != rocks[-1]:
                [x, y] = [int(val) for val in p.split(",")]
                [next_x, next_y] = [int(val) for val in rocks[index + 1].split(",")]
                if next_x - x != 0:
                    x_diff = get_diff(next_x, x)
                    for j in range(x, next_x + x_diff, x_diff):
                        matrix[y][j] = 1
                if next_y - y != 0:
                    y_diff = get_diff(next_y, y)
                    for i in range(y, next_y + y_diff, y_diff):
                        matrix[i][x] = 1
    room_floor = max([i for i, _j in enumerate(matrix) if sum(_j) > 0]) + 2
    matrix[room_floor] = [1.0 for i in range(0, 1000)]

    # print("\n".join([" ".join([str(int(val)) for val in item[493:504]]) for item in matrix[0: 12]]))
    x = 500
    y = 0
    counter = 0
    for i in range(100_000):
        new_x, new_y = move(x, y, matrix)
        matrix[new_y][new_x] = 9
        counter += 1
        if new_x == 500 and new_y == 0:
            print(counter)
            break


def move(x, y, matrix):
    if check(matrix[y + 1][x]):
        return move(x, y + 1, matrix)
    elif check(matrix[y + 1][x - 1]):
        return move(x - 1, y + 1, matrix)
    elif check(matrix[y + 1][x + 1]):
        return move(x + 1, y + 1, matrix)
    else:
        return x, y


def check(val):
    return val != 9 and val != 1 and val != 9.0 and val != 1.0


def get_diff(head, tail):
    if head - tail < 0:
        return -1
    elif head - tail > 0:
        return 1
    else:
        return 0

def get_data(file_name):
    return open(f"2022/Day14/{file_name}.txt", "r", encoding="utf-8").read()

# part one - 994
run()
