input_data = open("2022/Day05/input.txt", "r", encoding="utf-8").read()
sample_data = open("2022/Day05/sample.txt", "r", encoding="utf-8").read()

def run(data, sample):
    instructions = data.split("\n\n")[1]

    # I know this is gross but I'm not well today so it'll have to do
    if sample:
        start = [
            ["N", "Z"],
            ["D", "C", "M"],
            ["P"]
        ]
    else:
        start = [
            ["P","V","Z","W","D","T"],
            ["D","J","F","V","W","S","L"],
            ["H","B","T","V","S","L","M","Z"],
            ["J","S","R"],
            ["W","L","M","F","G","B","Z","C"],
            ["B","G","R","Z","H","V","W","Q"],
            ["N","D","B","C","P","J","V"],
            ["Q","B","T","P"],
            ["C","R","Z","G","H"]
        ]

    for item in instructions.split("\n"):
        item = item.split(" ")
        m = int(item[1])
        f = int(item[3])
        t = int(item[5])
        crates = [start[f - 1].pop(0) for _i in range(0, m)]
       
        # part one
        # [start[t - 1].insert(0, crate) for crate in crates]

        #part two
        crates.reverse()
        [start[t - 1].insert(0, crate) for crate in crates]
        
    print("".join([item[0] for item in start]))


run(input_data, False)
# run(sample_data, True)
