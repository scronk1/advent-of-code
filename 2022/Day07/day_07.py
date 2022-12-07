input_data = open("2022/Day07/input.txt", "r", encoding="utf-8").read()
sample_data = open("2022/Day07/sample.txt", "r", encoding="utf-8").read()

class FileInfo():
    def __init__(self, name, size) -> None:
        self.size: int = size
        self.name: str = name


class DirInfo():
    def __init__(self, name: str, parent):
        self.name: str = name
        self.parent = parent
        self.dirs: dict = {}
        self.files = []
        if parent:
            self.path = f'{parent.path}/{name}'
        else:
            self.path = '/'

    def add_child(self, child):
        if not child.name in self.dirs:
            self.dirs[child.name] = child
        if child.parent is None:
            child.parent = self

    def size(self):
        total = 0
        for file in self.files:
            total += file.size
        for subdir in self.dirs.values():
            total += subdir.size()
        return total


def run(data):
    data = data.split("\n")

    root = DirInfo("/", None)
    current = root

    for row in data[1:]:
        if row.startswith("$"):
            if row.startswith("$ cd"):
                if row == "$ cd ..":
                    current = current.parent
                else:
                    name = row.split(" ")[2]
                    new_dir = DirInfo(name, current)
                    current.add_child(new_dir)
                    current = new_dir
        else:
            if not row.startswith("dir"):
                [size, name] = row.split(" ")
                current.files.append(FileInfo(name, int(size)))

    all_sizes = [root.size()]
    get_sum(all_sizes, root)

    small_sizes = [size for size in all_sizes if size < 100_000]
    part_one = sum(small_sizes)
    print(part_one)

    needed = root.size() - (70_000_000 - 30_000_000)

    part_two_sizes = [size for size in all_sizes if size >= needed]
    print(min(part_two_sizes))


def get_sum(sizes, root: DirInfo):
    for key in root.dirs:
        value = root.dirs[key]
        sizes.append(value.size())
        get_sum(sizes, value)


# part one 
# wrong 99796, 980487
# right 1432936

# part two
# wrong 10_822_209 too high

run(input_data)
# run(sample_data)
