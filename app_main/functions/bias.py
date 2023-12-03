import pandas as pd
import plotly.express as px


def bar(analyte_code, stream_tag):
    file_path = 'http://localhost:8001/media/csv/MA_QC_Data_1023.csv'
    df = pd.read_csv(file_path)

    df['Received'] = pd.to_datetime(df['Received'])

    matching_rows = df.loc[df['AnalyteCode'] == analyte_code, 'ExpectedValue']

    if not matching_rows.empty:
        expected_value = matching_rows.iloc[0]
    else:
        # Handle the case where there are no matching rows, e.g., set a default value
        expected_value = 0.0  # Replace 0.0 with an appropriate default value

    months = df['Received'].dt.to_period("M").unique()

    results_dfs = []

    for month in months:
        if pd.isna(month):
            continue

        month_str = str(month)

        filtered_data = df[
            (df['Received'].dt.to_period("M") == month) &
            (df['AnalyteCode'] == analyte_code) &
            (df['Stream Tag'] == stream_tag)
            ]

        mean = filtered_data['Result'].mean()
        if expected_value != 0:
            bias = ((mean - expected_value) / expected_value) * 100
        else:
            # Handle the case where expected_value is zero, e.g., set bias to a default value
            bias = 0.0  # Replace 0.0 with an appropriate default value

        results_df = pd.DataFrame({'Month': [month_str], 'Bias': [bias]})
        results_dfs.append(results_df)

    final_results_df = pd.concat(results_dfs, ignore_index=True)

    fig = px.bar(final_results_df, x='Month', y='Bias', title=f'Bias of {analyte_code} for Each Month',
                 labels={'Bias': 'Bias'},
                 height=400)

    # Save the plot as HTML
    plot_html = fig.to_html(full_html=False)

    return plot_html


# plotly_utils.py

# plotly_utils.py
'''
import pandas as pd
import plotly.express as px

def bar(stream_tag):
    file_path = 'http://localhost:8001/media/csv/MA_QC_Data_1023.csv'
    df = pd.read_csv(file_path)

    df['Received'] = pd.to_datetime(df['Received'])

    analyte_codes = df['AnalyteCode'].unique()

    all_plots = {}

    for analyte_code in analyte_codes:
        matching_rows = df.loc[df['AnalyteCode'] == analyte_code, 'ExpectedValue']

        if not matching_rows.empty:
            expected_value = matching_rows.iloc[0]
        else:
            # Handle the case where there are no matching rows, e.g., set a default value
            expected_value = 0.0  # Replace 0.0 with an appropriate default value

        months = df['Received'].dt.to_period("M").unique()

        results_dfs = []

        for month in months:
            if pd.isna(month):
                continue

            month_str = str(month)

            filtered_data = df[
                (df['Received'].dt.to_period("M") == month) &
                (df['AnalyteCode'] == analyte_code) &
                (df['Stream Tag'] == stream_tag)
            ]

            mean = filtered_data['Result'].mean()
            if expected_value != 0:
                bias = ((mean - expected_value) / expected_value) * 100
            else:
                # Handle the case where expected_value is zero, e.g., set bias to a default value
                bias = 0.0  # Replace 0.0 with an appropriate default value

            results_df = pd.DataFrame({'Month': [month_str], 'Bias': [bias]})
            results_dfs.append(results_df)

        final_results_df = pd.concat(results_dfs, ignore_index=True)

        fig = px.bar(final_results_df, x='Month', y='Bias', title=f'Bias of {analyte_code} for Each Month',
                     labels={'Bias': 'Bias'},
                     height=400)

        # Save the plot as HTML
        plot_html = fig.to_html(full_html=False)
        all_plots[analyte_code] = plot_html

    return all_plots
'''
