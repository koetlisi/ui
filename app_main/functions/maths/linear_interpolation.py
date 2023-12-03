def linear_interpolation(rod_mass, scaled_rod_mass, scaled_value):
    for i in range(len(rod_mass) - 1):
        if rod_mass[i] <= scaled_value <= rod_mass[i + 1]:
            return scaled_rod_mass[i] + (scaled_value - rod_mass[i]) * (scaled_rod_mass[i + 1] - scaled_rod_mass[i])
    return -1
