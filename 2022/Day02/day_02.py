input_data = open("2022/Day02/input.txt", "r", encoding="utf-8").read()
sample_data = open("2022/Day02/sample.txt", "r", encoding="utf-8").read()

def run(data):
    list_data = [[item.split(" ")[0], item.split(" ")[1]] for item in data.split("\n")]
    scores = []
    reverse_scores = []
    for item in list_data:
        scores.append(get_score(item) + get_result(item))
        reverse_scores.append(get_reverse_score(item) + get_reverse_result(item))
    print(sum(scores))
    print(sum(reverse_scores))


def get_score(item):
    return {
        "X": 1,
        "Y": 2,
        "Z": 3
    }[item[1]]


def get_result(item):
    if get_match(item[0]) == item[1]:
        return 3
    elif item[0] == "A" and item[1] == "Y":
        return 6
    elif item[0] == "B" and item[1] == "Z":
        return 6
    elif item[0] == "C" and item[1] == "X":
        return 6
    else:
        return 0


def get_match(item):
    return {
        "A": "X",
        "B": "Y",
        "C": "Z"
    }[item]


def get_reverse_score(item):
    return {
        "A": {
            "X": 3,
            "Y": 1,
            "Z": 2
        },
        "B": {
            "X": 1,
            "Y": 2,
            "Z": 3
        },
        "C": {
            "X": 2,
            "Y": 3,
            "Z": 1
        }
    }[item[0]][item[1]]


def get_reverse_result(item):
    return {
        "X": 0,
        "Y": 3,
        "Z": 6
    }[item[1]]


run(input_data)
# run(sample_data)
