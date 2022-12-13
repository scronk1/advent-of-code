import numpy as np

LETTERS = "abcdefghijklmnopqrstuvwxyz"

class Pos():
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def left(self):
        self.y -= 1

    def right(self):
        self.y += 1

    def up(self):
        self.x -= 1

    def down(self):
        self.x += 1

    def get_moves(self, data):
        values = [
            data[self.x][self.y + 1],
            data[self.x][self.y - 1],
            data[self.x + 1][self.y],
            data[self.x - 1][self.y]
        ]
        l = list(LETTERS)
        if (l.index(data[self.x][self.y]) == "S"):
            return [val for val in values]
        else:
            return [val for val in values if l.index(val) < l.index(data[self.x][self.y])]


def run():
    data = get_data("sample")
    # data = get_data("input")
    data = [list(row) for row in data.split("\n")]
    grid = np.zeros((5, 8))
    
    nodes = []
 
    init_graph = {}
    for node in nodes:
        init_graph[node] = {}

    init_graph["Reykjavik"]["Oslo"] = 5
    init_graph["Reykjavik"]["London"] = 4
    init_graph["Oslo"]["Berlin"] = 1
    init_graph["Oslo"]["Moscow"] = 3
    init_graph["Moscow"]["Belgrade"] = 5
    init_graph["Moscow"]["Athens"] = 4
    init_graph["Athens"]["Belgrade"] = 1
    init_graph["Rome"]["Berlin"] = 2
    init_graph["Rome"]["Athens"] = 2

    


def get_data(file_name):
    return open(f"2022/Template/{file_name}.txt", "r", encoding="utf-8").read()


run()
