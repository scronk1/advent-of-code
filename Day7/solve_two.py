text_input = open("Day7/input.txt", "r")
data = text_input.read().split("\n")

def get_solve_two(input_data: list):
    shiny_gold_rule = [rule for rule in input_data if "shiny gold bags contain" in rule][0]
    prev_bags = get_sub_bags(shiny_gold_rule.split(" "))
    for index in range(0,10):
        current_bags = find_bags(prev_bags, input_data)
        if current_bags == prev_bags:
            return current_bags
        else:
            prev_bags = current_bags
    # bags_2 = find_bags(bags_1, input_data)
    # bags_3 = find_bags(bags_2, input_data)
    # bags_4 = find_bags(bags_3, input_data)
    # bags_5 = find_bags(bags_4, input_data)
    # bags_6 = find_bags(bags_5, input_data)
    # bags_7 = find_bags(bags_6, input_data)
    # bags_8 = find_bags(bags_7, input_data)
    # bags_9 = find_bags(bags_8, input_data)
    # bags_10 = find_bags(bags_9, input_data)
    # bags_11 = find_bags(bags_10, input_data)
    # return bags_11
    
def solve_two_handler(input_data: list):
    all_bags = get_solve_two(input_data)
    total = 0
    for bag in all_bags:
        total += get_numbers(bag)
    return total
        


def get_numbers(bag: dict):
    first = bag["count"]
    bag_total = bag["count"]
    for sub_bag in bag["sub_bags"]:
        sub_bag_total = get_numbers(sub_bag)
        if sub_bag_total != 0:
            bag_total += first*sub_bag_total
    return bag_total
            
        


def find_bags(bags: list, input_data: list):
    new_bags = []
    for bag in bags:
        if "sub_bags" not in bag.keys():
            for rule in input_data:
                if f"{bag['colour']} bags contain" in rule:
                    new_sub_bags = get_sub_bags(rule.split(" "))
                    new_bags.append({
                        "count": bag["count"],
                        "colour": bag["colour"],
                        "sub_bags": new_sub_bags
                    })
        else:
            new_bags.append({
                "count": bag["count"],
                "colour": bag["colour"],
                "sub_bags": find_bags(bag["sub_bags"], input_data)
            })
    return new_bags
        
    
def get_sub_bags(words: list) -> list:
    sub_bags = []
    try:
        sub_bags.append({
            "count": int(words[4]),
            "colour": f"{words[5]} {words[6]}"
        })
        sub_bags.append({
            "count": int(words[8]),
            "colour": f"{words[9]} {words[10]}"
        })
        sub_bags.append({
            "count": int(words[12]),
            "colour": f"{words[13]} {words[14]}"
        })
        sub_bags.append({
            "count": int(words[16]),
            "colour": f"{words[17]} {words[18]}"
        })
    except IndexError:
        pass
    except ValueError:
        sub_bags = []
    return sub_bags

test_text_input = open("Day7/test_data_two.txt", "r")
test_data = test_text_input.read().split("\n")
print(solve_two_handler(test_data) == 126)

print(solve_two_handler(data))