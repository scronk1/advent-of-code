
def run():
    # word = "sample"
    word = "input"

    data = get_data(word)

    data = data.split("\n")

    if word == "sample":
        key = 10
    else:
        key = 2_000_000

    [sensors, beacons] = get_sensors(data)

    [relevant_sensors, relevant_beacons] = get_relevant(sensors, beacons, key)

    hits = 0
    for i in range(-3 * key, 3 * key):
        if i % 100_000 == 0:
            print(i)
        checker = 0
        for index, sensor in enumerate(relevant_sensors):
            beacon = relevant_beacons[index]
            distance = abs(sensor[0] - beacon[0]) + abs(sensor[1] - beacon[1])
            point = [i, key]
            if abs(sensor[0] - i) + abs(sensor[1] - key) <= distance and not is_beacon_or_sensor(point, beacons, sensors):
                checker += 1
        if checker != 0:
            hits += 1

    print(hits)


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
