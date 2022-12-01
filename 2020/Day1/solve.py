text_input = open("2020/Day1/input.txt", "r")
data = text_input.read()
day_one_expenses = data.split("\n")


def find_value(expenses):
    for expense in expenses:
        new_expenses = expenses[1:len(expenses)]
        for expense2 in new_expenses:
            even_newer_expenses = new_expenses[1:len(new_expenses)]
            for expense3 in even_newer_expenses:
                if int(expense) + int(expense2) + int(expense3) == 2020:
                    return int(expense) * int(expense2) * int(expense3)


print(find_value(day_one_expenses))
