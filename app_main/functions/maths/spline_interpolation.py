from scipy.interpolate import interp1d


def spline_interpolation(rod_mass, scaled_mass, scaled_value):
    spline_function = interp1d(rod_mass, scaled_mass, kind='cubic')
    estimated_mass = spline_function(scaled_value)
    return estimated_mass
