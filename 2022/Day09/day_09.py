from copy import deepcopy
import numpy as np

def run():
    # data = get_data("sample1")
    data = get_data("sample")
    # data = get_data("input")

    data = data.split("\n")

    # part one sample
    # matrix = np.zeros((5,6))
    # start = [4, 0]

    # part two sample
    matrix = np.zeros((21,26))
    start = [15, 11]

    # input
    # matrix = np.zeros((1000,1000))
    # start = [500, 500]

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
            print(_k)
            if direction == "R":
                head[1] += 1
            if direction == "U":
                head[0] -= 1
            if direction == "D":
                head[0] += 1
            if direction == "L":
                head[1] -= 1
            # follow(head, tail, direction)
            [head, one] = follow(head, one, direction)
            [one, two] = follow(one, two, direction)
            [two, three] = follow(two, three, direction)
            [three, four] = follow(three, four, direction)
            [four, tail] = follow(four, tail, direction)
            # [five, six] = follow(five, six, direction)
            # [six, seven] = follow(six, seven, direction)
            # [seven, eight] = follow(seven, eight, direction)
            # [seven, tail] = follow(eight, tail, direction)

            matrix[tail[0]][tail[1]] = 1
    print(matrix)
    print(sum([sum(item) for item in matrix]))

def follow(head, tail, direction):
    if not check_adjacent(head, tail):
        x_diff = head[0] - tail[0]
        y_diff = head[1] - tail[1]
        if x_diff > 1:
            tail[0] += 1
            if y_diff > 0:
                tail[0] += x_diff / abs(x_diff)
        if y_diff > 1:
            tail[1] += 1
        # if x_diff > 1 and y_diff == 1:
        #     tail[0] += x_diff / abs(x_diff)
        # if y_diff > 1 and x_diff == 1:
        #     tail[1] += x_diff / abs(x_diff)
        if direction == "R":
            if check_diagonal_move(head, tail):
                tail[0] += get_move(head[0], tail[0])
            tail[1] +=1
        if direction == "U":
            if check_diagonal_move(head, tail):
                print("Move", get_move(head[1], tail[1]))
                tail[1] += get_move(head[1], tail[1])
            tail[0] -=1
        if direction == "D":
            if check_diagonal_move(head, tail):
                tail[1] += get_move(head[1], tail[1])
            tail[0] +=1
        if direction == "L":
            if check_diagonal_move(head, tail):
                tail[0] += get_move(head[0], tail[0])
            tail[1] -= 1
    return head, tail


def get_move(leader, follower):
    if leader - follower < 0:
        return -1
    elif leader - follower > 0:
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

run()
