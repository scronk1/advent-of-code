import numpy as np

def run():
    # data = get_data("sample")
    data = get_data("input")

    data = [[int(val) for val in item] for item in data.split("\n")]

    print(part_one(data))
    print(part_two(data))


def part_two(data):
    scores = np.zeros((len(data), len(data)))
    # pylint: disable=consider-using-enumerate
    for i in range(0, len(data)):
        for j in range(0, len(data)):
            val = data[i][j]

            left_trees = data[i][:j]
            left_trees.reverse()
            left = get_trees(left_trees, val)

            right = get_trees(data[i][j+1:], val)

            up_trees = [item[j] for item in data[:i]]
            up_trees.reverse()
            up = get_trees(up_trees, val)

            down = get_trees([item[j] for item in data[i+1:]], val)

            score = left * right * up * down
            scores[i][j] = score
    return max([max(item) for item in scores])


def get_trees(list_of_trees, height):
    counter = 0
    for tree in list_of_trees:
        counter +=1
        if tree >= height:
            return counter
    return counter


def part_one(data):
    visible = np.zeros((len(data), len(data)))
    # pylint: disable=consider-using-enumerate
    for i in range(0, len(data)):
        for j in range(0, len(data)):
            # edges
            if i == 0 or j == 0 or i == len(data) - 1 or j == len(data) - 1:
                visible[i][j] = 1
            # left
            elif max(data[i][:j]) < data[i][j]:
                visible[i][j] = 1
            # right
            elif max(data[i][j+1:]) < data[i][j]:
                visible[i][j] = 1
            # up
            elif max([item[j] for item in data[i+1:]]) < data[i][j]:
                visible[i][j] = 1
            # down
            elif max([item[j] for item in data[:i]]) < data[i][j]:
                visible[i][j] = 1
    return sum([sum(item) for item in visible])



def get_data(file_name):
    return open(f"2022/Day08/{file_name}.txt", "r", encoding="utf-8").read()


run()
