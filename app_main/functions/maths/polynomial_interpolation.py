import numpy as np


def polynomial_interpolation(rod_mass, scaled_mass, scaled_value):
    x = np.array(rod_mass)
    y = np.array(scaled_mass)
    z = np.polyfit(x, y, len(scaled_mass)-1)
    p = np.poly1d(z)
    return p(scaled_value)
