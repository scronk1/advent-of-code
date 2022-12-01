import re

text_input = open("Day4/input.txt", "r")
data = text_input.read().split("\n\n")


def get_valid_passports(input_data) -> int:
    valid_count = 0
    for item in input_data:
        passport = split_fields(item)
        byr = "byr" in passport and len(passport["byr"]) == 4 and 1920 <= int(passport["byr"]) <= 2002
        iyr = "iyr" in passport and len(passport["iyr"]) == 4 and 2010 <= int(passport["iyr"]) <= 2020
        eyr = "eyr" in passport and len(passport["eyr"]) == 4 and 2020 <= int(passport["eyr"]) <= 2030
        hgt = "hgt" in passport and validate_height(passport["hgt"])
        hcl = "hcl" in passport and passport["hcl"][0] == "#" and validate_hair_colour(passport["hcl"])
        ecl = "ecl" in passport and passport["ecl"] in ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
        pid = "pid" in passport and len(passport["pid"]) == 9
        if byr and iyr and eyr and hgt and hcl and ecl and pid:
            valid_count += 1
    return valid_count


def validate_hair_colour(hair_colour: str) -> bool:
    pattern = re.compile("[a-f0-9]+")
    match = pattern.fullmatch(hair_colour[1:])
    return match is not None


def validate_height(height: str) -> bool:
    units = height[-2:]
    value = int(height[:-2]) if height[:-2] != "" else 0
    if units == "cm":
        return 150 <= value <= 193
    elif units == "in":
        return 59 <= value <= 76
    else:
        return False


def split_fields(input_data) -> dict:
    passport = {}
    fields = re.split(' |\n', input_data)
    for field in fields:
        key_value = field.split(":")
        passport.update({
            key_value[0]: key_value[1]
        })
    return passport


print(get_valid_passports(data))
