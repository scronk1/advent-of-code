data = open("2015/Day02/input.txt", "r", encoding="utf-8").read()

def run(input_data):
    list_data = input_data.split("\n")
    wrap_sums = []
    ribbon_sums = []
    for item in list_data:
        sizes = [int(a) for a in item.split("x")]
        length = sizes[0]
        wid = sizes[1]
        heig = sizes[2]

        sizes.sort()
        ribbon_sums.append(2*sizes[0] + 2*sizes[1] + (length * wid * heig))

        min_side = min([length*wid, wid*heig, heig*length])
        paper = 2*length*wid + 2*wid*heig + 2*heig*length + min_side
        wrap_sums.append(paper)

    print(sum(wrap_sums))
    print(sum(ribbon_sums))

run(data)
