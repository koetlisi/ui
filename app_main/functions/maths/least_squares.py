from sklearn.linear_model import LinearRegression
import numpy as np


def least_squares(rod_mass, scaled_rod_mass, scaled_value):
    w_known = np.array(scaled_rod_mass).reshape(-1, 1)
    m_known = np.array(rod_mass)
    model = LinearRegression().fit(w_known, m_known)
    w_u = np.array(scaled_value).reshape(-1, 1)
    return model.predict(w_u)
