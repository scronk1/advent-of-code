text_input = open("Day3/input.txt", "r")
data = text_input.read().split("\n")


def run_tree_finder(input_data, h_pattern, v_pattern):
    try:
        tree_count = 0
        for row_index in range(0, len(data), v_pattern):
            if row_index != 0:
                column_index = int((row_index * h_pattern) / v_pattern)
                column_index = reduce_column_index(column_index)
                tree_value = input_data[row_index][column_index]
                if tree_value == "#":
                    tree_count += 1
        return tree_count
    except Exception as e:
        print(e)


def reduce_column_index(index):
    while index > len(data[0]) - 1:
        index -= len(data[0])
    return index


right_1_down_1 = run_tree_finder(data, 1, 1)
right_3_down_1 = run_tree_finder(data, 3, 1)
right_5_down_1 = run_tree_finder(data, 5, 1)
right_7_down_1 = run_tree_finder(data, 7, 1)
right_1_down_2 = run_tree_finder(data, 1, 2)

answer = right_3_down_1 * right_1_down_1 * right_5_down_1 * right_7_down_1 * right_1_down_2
print(answer)
