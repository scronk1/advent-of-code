import ast

def run():
    # data = get_data("sample")
    data = get_data("input")

    pairs = data.split("\n\n")
    ordered = []
    for index, pair in enumerate(pairs):
        [left, right] = pair.split("\n")
        left = ast.literal_eval(left)
        right = ast.literal_eval(right)
        result = check(left, right)
        if result < 1:
            ordered.append(index + 1)
    print(ordered)
    print(sum(ordered))


def check(left, right):
    # pylint: disable=consider-using-enumerate
    if isinstance(left, int) and isinstance(right, int):
        if left > right:
            return 1
        if left < right:
            return -1
        return 0
    if isinstance(left, list) and isinstance(right, list):
        min_length = min(len(left), len(right))
        for i in range(min_length):
            result = check(left[i], right[i])
            if result != 0:
                return result
        return check(len(left), len(right))
    if isinstance(right, int):
        return check(left, [right])
    if isinstance(left, int):
        return check([left], right)


def get_data(file_name):
    return open(f"2022/Day13/{file_name}.txt", "r", encoding="utf-8").read()

# part one
# wrong 5626 (high), 4194 (low), 4451 (?), 5167 (?)

# aiming for - 5506
run()
