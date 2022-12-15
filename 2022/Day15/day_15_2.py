from math import floor
from time import perf_counter

def run():
    tic = perf_counter()
    # word = "sample"
    word = "input"

    data = get_data(word)

    data = data.split("\n")

    if word == "sample":
        key = 10
    else:
        key = 2_000_000

    length = (2 * key) + 1

    for i in range(0, length):
        if i % 100_000 == 0:
            print("Progress", floor((i/length) * 100), "%", "Time elapsed:", round(perf_counter() - tic, 3), "s")
        result = get_hits(i, data)
        if result != 0:
            print(result, i)
            print((result * 4_000_000) + i)
            return


def get_hits(key, data):

    [sensors, beacons] = get_sensors(data)

    [relevant_sensors, relevant_beacons] = get_relevant(sensors, beacons, key)
    # x is 0 is col
    # y is 1 is row
    coverage = []

    for index, sensor in enumerate(relevant_sensors):
        beacon = relevant_beacons[index]
        distance = abs(sensor[0] - beacon[0]) + abs(sensor[1] - beacon[1])
        diff = abs(sensor[1] - key)
        coverage.append([sensor[0] - distance + diff, sensor[0] + distance - diff])
    coverage.sort()

    start = 0
    end = 0
    for index, item in enumerate(coverage):
        try:
            if item[0] > end + 1:
                return item[0] - 1
            if item[1] < start - 1:
                return item[1] + 1
            if item[0] < start:
                start = item[0]
            if item[1] > end:
                end = item[1]
        except IndexError:
            return 0
    return 0


def get_sensors(data):
    sensors = []
    beacons = []
    for row in data:
        words = row.split(" ")
        x = int(words[2][2:-1])
        y = int(words[3][2:-1])
        sensors.append([x, y])
        b_x = int(words[-2][2:-1])
        b_y = int(words[-1][2:])
        beacons.append([b_x, b_y])

    return sensors, beacons


def get_relevant(sensors, beacons, key):
    relevant_sensors = []
    relevant_beacons = []
    for index, sensor in enumerate(sensors):
        x = sensor[0]
        y = sensor[1]
        b_x = beacons[index][0]
        b_y = beacons[index][1]
        distance = abs(x - b_x) + abs(y - b_y)

        if y - distance < key and y + distance > key:
            relevant_sensors.append(sensor)
            relevant_beacons.append(beacons[index])
    return relevant_sensors, relevant_beacons


def is_beacon_or_sensor(current, beacons, sensors):
    return current in beacons or current in sensors


def get_data(file_name):
    return open(f"2022/Day15/{file_name}.txt", "r", encoding="utf-8").read()


run()
