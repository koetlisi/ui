import pandas as pd
import plotly.graph_objects as go


def graph_analytical_results_all(df, stag=None, ldate=None, udate=None):
    if stag is None or ldate is None or udate is None:
        return "<p>Please provide Stream Tag, Lower Date Bound, and Upper Date Bound.</p>"

    df['Received'] = pd.to_datetime(df['Received'])
    df['AnalyteCode'] = df['AnalyteCode'].astype("string")
    df['Stream Tag'] = df['Stream Tag'].astype("string")

    filtered_data = df.loc[(df['Stream Tag'] == stag) & (df['Received'] >= pd.to_datetime(ldate)) &
                           (df['Received'] <= pd.to_datetime(udate)) &
                           (df['LFL'] < df['Result']) & (df['Result'] < df['UFL'])]

    if filtered_data.empty:
        return "<p>No data within the specified range and conditions.</p>"

    unique_analytes = filtered_data['AnalyteCode'].unique()
    fig_dict = {}

    for analyte_code in unique_analytes:
        analyte_data = filtered_data[filtered_data['AnalyteCode'] == analyte_code]
        analyte_data['AnalyteCodeCount'] = analyte_data.groupby('AnalyteCode').cumcount()

        fig = go.Figure()

        fig.add_trace(
            go.Scatter(x=analyte_data['AnalyteCodeCount'], y=analyte_data['Result'], mode='lines+markers',
                       name='Result', line=dict(color='blue')))
        fig.add_trace(
            go.Scatter(x=analyte_data['AnalyteCodeCount'], y=analyte_data['ExpectedValue'], mode='lines',
                       name='ExpectedValue', line=dict(color='green')))
        fig.add_trace(
            go.Scatter(x=analyte_data['AnalyteCodeCount'], y=analyte_data['LFL'], mode='lines', name='LFL',
                       line=dict(color='red')))
        fig.add_trace(
            go.Scatter(x=analyte_data['AnalyteCodeCount'], y=analyte_data['UFL'], mode='lines', name='UFL',
                       line=dict(color='red')))
        fig.add_trace(
            go.Scatter(x=analyte_data['AnalyteCodeCount'], y=analyte_data['LWL'], mode='lines', name='LWL',
                       line=dict(color='orange', dash='dot')))
        fig.add_trace(
            go.Scatter(x=analyte_data['AnalyteCodeCount'], y=analyte_data['UWL'], mode='lines', name='UWL',
                       line=dict(color='purple', dash='dot')))

        fig.update_layout(title=f'{analyte_code} Chart', xaxis_title='Occurrence of AnalyteCode', yaxis_title='Values')
        fig_dict[analyte_code] = fig.to_html()

    return fig_dict
