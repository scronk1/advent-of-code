class X():
    def __init__(self) -> None:
        self.value:int = 1
    
    def add(self, value: int) -> None:
        self.value += (value)


class TVRow():
    def __init__(self) -> None:
        self.row = ""
        self.complete = False

    def add(self, x: X):
        if len(self.row) in [x.value - 1, x.value, x.value + 1]:
            self.row += "#"
        else:
            self.row += "."
        if len(self.row) == 40:
            self.complete = True


class TV():
    def __init__(self) -> None:
        self.rows = []

    def add_row(self, row: TVRow):
        self.rows.append(row)


def run():
    # data = get_data("mini_sample")
    # data = get_data("sample")
    data = get_data("input")

    data = data.split("\n")

    x = X()

    signals = []
    cycle = 1

    row = TVRow()
    tv = TV()

    for instruction in data:
        [row, tv] = row_stuff(row, x, tv)
        if instruction.startswith("addx"):
            val = int(instruction.split(" ")[1])
            cycle += 1
            [row, tv] = row_stuff(row, x, tv)
            if cycle in [20, 60, 100, 140, 180, 220]:
                signals.append(cycle * x.value)
            x.add(val)

        cycle += 1
        if cycle in [20, 60, 100, 140, 180, 220]:
            signals.append(cycle * x.value)

    print(sum(signals))
    print("\n".join([tv_row.row for tv_row in tv.rows]))


def row_stuff(row, x, tv):
    row.add(x)
    if row.complete:
        tv.add_row(row)
        row = TVRow()
    return row, tv

def get_data(file_name):
    return open(f"2022/Day10/{file_name}.txt", "r", encoding="utf-8").read()

# part two
# wrong POPKFKEJ
# right PAPKFKEJ
run()
