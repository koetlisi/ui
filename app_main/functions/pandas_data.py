import pandas as pd


def pandas_data(filename):
    csv_url = 'http://localhost:8001/media/csv/MA_QC_Data_1023.csv'
    data = pd.read_csv(csv_url)
    df = pd.DataFrame(data)
    return df
