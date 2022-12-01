text_input = open("Day7/input.txt", "r")
data = text_input.read().split("\n")


def get_solve_one(input_data: list):
    types_count = 0
    shiny_gold_colours = [f"{rule.split(' ')[0]} {rule.split(' ')[1]}" for rule in input_data if "shiny gold" in rule and "shiny gold bags contain" not in rule]
    types_count += len(shiny_gold_colours)

    all_colours = []

    #Forgive the manual garbage
    colours_1 = get_all_related_colours(shiny_gold_colours, input_data)
    all_colours += colours_1
    types_count += len(colours_1)

    colours_2 = iterate_colours(colours_1, all_colours, input_data)
    all_colours += colours_2
    types_count += len(colours_2)
 
    colours_3 = iterate_colours(colours_2, all_colours, input_data)
    all_colours += colours_3
    types_count += len(colours_3)

    colours_4 = iterate_colours(colours_3, all_colours, input_data)
    all_colours += colours_4
    types_count += len(colours_4)

    colours_5 = iterate_colours(colours_4, all_colours, input_data)
    all_colours += colours_5
    types_count += len(colours_5)

    colours_6 = iterate_colours(colours_5, all_colours, input_data)
    all_colours += colours_6
    types_count += len(colours_6)

    colours_7 = iterate_colours(colours_6, all_colours, input_data)
    all_colours += colours_7
    types_count += len(colours_7)

    colours_8 = iterate_colours(colours_7, all_colours, input_data)
    all_colours += colours_8
    types_count += len(colours_8)

    return types_count


def iterate_colours(prev_colour, all_colours, input_data):
    colours = get_all_related_colours(prev_colour, input_data)
    matching = [colour for colour in all_colours if colour in colours]
    [colours.remove(colour) for colour in matching]
    return colours


def get_all_related_colours(colours: list, input_data: list) -> list:
    all_colour_rules = []
    for colour in colours:
        for rule in input_data:
            if colour in rule and f"{colour} bags contain" not in rule:
                added_colour = f"{rule.split(' ')[0]} {rule.split(' ')[1]}"
                all_colour_rules.append(added_colour)
    all_colour_rules = list(dict.fromkeys(all_colour_rules))
    return all_colour_rules

# Testing

test_text_input = open("Day7/test_data_one.txt", "r")
test_data = test_text_input.read().split("\n")
print(get_solve_one(test_data) == 4)

# Solve one

print(get_solve_one(data))
    
