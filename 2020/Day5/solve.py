text_input = open("2020/Day5/input.txt", "r")
data = text_input.read().split("\n")

def get_all_seat_ids(input_data: list) -> int:
    return [get_seat_id(seat) for seat in input_data]


def get_max_seat_id(input_data: list):
    return max(get_all_seat_ids(input_data))


def get_my_seat(input_data: list) -> int:
    seat_ids = sorted(get_all_seat_ids(input_data))
    missing_seats = [
        seat_id - 1 for index, seat_id in enumerate(seat_ids) 
        if index != 0 and seat_id - seat_ids[index-1] != 1
    ]
    return missing_seats


def get_seat_id(seat: str):
    row: int
    column: int
    row_range = [0,127]
    column_range = [0,7]
    for index, char in enumerate(seat):
        if index == 6:
            row = row_range[0] if char == "F" else row_range[1]
        elif index == 9:
            column = column_range[0] if char == "L" else column_range[1]
        elif char == "F":
            row_range = get_lower(row_range)
        elif char == "B":
            row_range = get_upper(row_range)
        elif char == "R":
            column_range = get_upper(column_range)
        elif char == "L":
            column_range = get_lower(column_range)
    return (row * 8) + column


def get_upper(data_range: list) -> list:
    top = data_range[1]
    bottom = data_range[0]
    return [int(top-((top-bottom)/2) + 0.5), top]


def get_lower(data_range: list) -> list:
    top = data_range[1]
    bottom = data_range[0]
    return [bottom, int(top-((top-bottom)/2) - 0.5)]

# Examples from question for testing
print(get_seat_id("BFFFBBFRRR") == 567)
print(get_seat_id("FFFBBBFRRR") == 119)
print(get_seat_id("BBFFBBFRLL") == 820)

# Part one solve
print(get_max_seat_id(data))

#Part two solve
print(get_my_seat(data))