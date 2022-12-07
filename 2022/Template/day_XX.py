
def run():
    data = get_data("sample")
    # data = get_data("input")


def get_data(file_name):
    return open(f"2022/Template/{file_name}.txt", "r", encoding="utf-8").read()


run()
