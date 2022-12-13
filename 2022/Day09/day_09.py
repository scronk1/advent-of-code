from copy import deepcopy
import numpy as np

def run():
    # data = get_data("sample1")
    # data = get_data("sample")
    data = get_data("input")

    data = data.split("\n")

    # part one sample
    # matrix = np.zeros((5,6))
    # start = [4, 0]

    # part two sample
    # matrix = np.zeros((21,26))
    # start = [15, 11]

    # input
    matrix = np.zeros((1000,1000))
    start = [500, 500]

    # ROW, COLUMN
    head = deepcopy(start)
    one = deepcopy(start)
    two = deepcopy(start)
    three = deepcopy(start)
    four = deepcopy(start)
    five = deepcopy(start)
    six = deepcopy(start)
    seven = deepcopy(start)
    eight = deepcopy(start)
    tail = deepcopy(start)

    matrix[head[0]][head[1]] = 1

    for instruction in data:
        [direction, steps] = instruction.split(" ")
        for _k in range(0, int(steps)):
            if direction == "R":
                head[1] += 1
            if direction == "U":
                head[0] -= 1
            if direction == "D":
                head[0] += 1
            if direction == "L":
                head[1] -= 1
            # follow(head, tail, direction)
            [head, one] = follow(head, one)
            [one, two] = follow(one, two)
            [two, three] = follow(two, three)
            [three, four] = follow(three, four)
            [four, five] = follow(four, five)
            [five, six] = follow(five, six)
            [six, seven] = follow(six, seven)
            [seven, eight] = follow(seven, eight)
            [eight, tail] = follow(eight, tail)
            matrix[tail[0]][tail[1]] = 1

    print("\n".join([" ".join([str(int(val)) for val in item]) for item in matrix]))
    print(sum([sum(item) for item in matrix]))

def follow(head, tail):
    if not check_adjacent(head, tail):
        x_diff = head[0] - tail[0]
        y_diff = head[1] - tail[1]
        x = get_move(x_diff)
        y = get_move(y_diff)
        if abs(x_diff) > 1:
            tail[0] += x
            if abs(y_diff) > 0:
                tail[1] += y
        elif abs(y_diff) > 1:
            tail[1] += y
            if abs(x_diff) > 0:
                tail[0] += x
    return head, tail


def get_move(value):
    if value < 0:
        return -1
    elif value > 0:
        return 1
    else:
        return 0


def check_adjacent(leader, follower):
    return abs(leader[1] - follower[1]) <= 1 and abs(leader[0] - follower[0]) <= 1


def check_diagonal_move(leader, follower):
    return (abs(leader[1] - follower[1]) == 1 and abs(leader[0] - follower[0]) > 1) or (abs(leader[1] - follower[1]) > 1 and abs(leader[0] - follower[0]) == 1)


def get_data(file_name):
    return open(f"2022/Day09/{file_name}.txt", "r", encoding="utf-8").read()

# part one
# wrong 8986 too high
# right 6266 (went too quickly)

# part two
# wrong 2369.0
# right 2369
run()
