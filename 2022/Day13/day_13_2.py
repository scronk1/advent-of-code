import ast

def run():
    # data = get_data("sample")
    data = get_data("input")

    parsed = []
    for item in data.split("\n"):
        if item != "":
            parsed.append(ast.literal_eval(item))
    parsed.append([[2]])
    parsed.append([[6]])

    for _i in range(0, 1_000):
        for index, item in enumerate(parsed):
            try:
                result = check(item, parsed[index + 1])
                if result == 1:
                    parsed[index], parsed[index + 1] = parsed[index + 1], parsed[index]
            except IndexError:
                pass

    for row in parsed:
        print(row)

    first = parsed.index([[2]]) + 1
    second = parsed.index([[6]]) + 1
    print(first * second)



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

# part two

run()
