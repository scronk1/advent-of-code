import hashlib

data = open("2015/Day04/input.txt", "r", encoding="utf-8").read()

def run(input_data):
    for i in range(1_000_000, 10_000_000):
        key = f"{input_data}{i}"
        key_hash = hashlib.md5(key.encode())
        key_hex = key_hash.hexdigest()
        if key_hex[0:6] == "000000":
            print(key)
            break

run(data)
