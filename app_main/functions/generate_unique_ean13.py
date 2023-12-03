import random


def generate_unique_ean13():
    return ''.join(str(random.randint(0, 9)) for _ in range(12))
