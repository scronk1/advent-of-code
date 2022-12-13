from math import floor


class Monkey():
    def __init__(self, monkey_id, items, operation, test, true_condition, false_condition) -> None:
        self.monkey_id = monkey_id
        self.items = items
        self.operation = operation
        self.test = test
        self.true = true_condition
        self.false = false_condition
        self.inspect_counter = 0

    def run_operation(self, old) -> int:
        self.inspect_counter += 1
        op = self.operation.split(" ")
        op_type = op[3]
        op_val = op[4]
        if op_val == "old":
            op_val = old
        else:
            op_val = int(op_val)
        if op_type == "*":
            return old * op_val
        if op_type == "+":
            return old + op_val

    def run_test(self, value):
        return self.true if value % self.test == 0 else self.false


class Item():
    def __init__(self, worry):
        self.worry = worry

    def reduce_worry(self):
        self.worry = floor(self.worry / 3)

    def manage_worry(self, value):
        self.worry %= value


def run():
    # data = get_data("sample")
    data = get_data("input")

    data = data.split("\n\n")

    monkeys = []

    for monkey in data:
        facts = monkey.split("\n")
        monkey_id = int(facts[0][7])
        items = [Item(int(value)) for value in facts[1].split(": ")[1].split(",")]
        operation = facts[2].split(": ")[1]
        test = int(facts[3].split(" ")[-1])
        true_condition = int(facts[4].split(" ")[-1])
        false_condition = int(facts[5].split(" ")[-1])
        monkeys.append(Monkey(monkey_id, items, operation, test, true_condition, false_condition))

    # part 1
    # for _i in range(0, 20):
    #     for monkey in monkeys:
    #         for item in monkey.items:
    #             item.worry = monkey.run_operation(item.worry)
    #             item.reduce_worry()
    #             throw = monkey.run_test(item.worry)
    #             monkeys[throw].items.append(item)
    #         monkey.items = []

    # inspects = [monkey.inspect_counter for monkey in monkeys]
    # inspects.sort(reverse=True)
    # print(inspects[0] * inspects[1])

    # part 2

    worry_check = 1
    for monkey in monkeys:
        worry_check *= monkey.test

    for _i in range(0, 10_000):
        for monkey in monkeys:
            for item in monkey.items:
                item.worry = monkey.run_operation(item.worry)
                item.manage_worry(worry_check)
                throw = monkey.run_test(item.worry)
                monkeys[throw].items.append(item)
            monkey.items = []

    inspects = [monkey.inspect_counter for monkey in monkeys]
    print(inspects)
    inspects.sort(reverse=True)
    print(inspects[0] * inspects[1])



def get_data(file_name):
    return open(f"2022/Day11/{file_name}.txt", "r", encoding="utf-8").read()


run()
