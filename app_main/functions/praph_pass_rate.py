import pandas as pd
import plotly.graph_objects as go
import plotly.express as px


def graph_pass_rate(df, ldate=None, udate=None, acode=None, stag=None, scode=None):
    if ldate is None or udate is None or acode is None or stag is None:
        df.loc[:, 'Received'] = pd.to_datetime(df['Received'])
        df.loc[:, 'AnalyteCode'] = df['AnalyteCode'].astype("string")
        df.loc[:, 'Stream Tag'] = df['Stream Tag'].astype("string")
        lower_bound = pd.to_datetime('2023-09-25 17:58:00')
        upper_bound = pd.to_datetime('2023-10-01 17:58:00')
        WCMQC2020_IR_Chart = df.loc[(df['Stream Tag'] == stag) &
                                    (df['AnalyteCode'] == acode) &
                                    (df['Received'] >= lower_bound) &
                                    (df['Received'] <= upper_bound) &
                                    (df['LFL'] < df['Result']) &
                                    (df['Result'] < df['UFL'])]
        if not WCMQC2020_IR_Chart.empty:
            failed_results = ((WCMQC2020_IR_Chart['Result'] < WCMQC2020_IR_Chart['LFL']).sum() +
                              (WCMQC2020_IR_Chart['Result'] > WCMQC2020_IR_Chart['UFL']).sum())
            total_count = WCMQC2020_IR_Chart.shape[0]
            pass_rate = 100 - (failed_results / total_count) * 100
            pass_rate_data = df.groupby('AnalyteCode').apply(lambda x: ((x['Result'] < x['LFL']).sum() +
                                                                        (x['Result'] > x['UFL']).sum()) /
                                                                       x.shape[0] * 100)

            fig = go.Figure(data=[go.Bar(x=pass_rate_data.index, y=pass_rate_data.values)])
            fig.update_layout(title=f'Pass Rate for Analytes ({acode})', xaxis_title='Analyte Code',
                              yaxis_title=f'% Pass Rate ({pass_rate})', yaxis=dict(range=[0, 100]))
            return fig.to_html()
        else:
            return "<p>No data within the specified range and conditions.</p>"
    else:
        df.loc[:, 'Received'] = pd.to_datetime(df['Received'])
        df.loc[:, 'AnalyteCode'] = df['AnalyteCode'].astype("string")
        df.loc[:, 'Stream Tag'] = df['Stream Tag'].astype("string")
        lower_bound = pd.to_datetime(ldate)
        upper_bound = pd.to_datetime(udate)
        filtered_df = df.loc[(df['Stream Tag'] == stag) &
                             (df['Received'] >= lower_bound) &
                             (df['Received'] <= upper_bound)]

        # Calculate pass rate for each AnalyteCode in the filtered DataFrame
        pass_rates = {}
        for analyte_code in filtered_df['AnalyteCode'].unique():
            analyte_data = filtered_df[filtered_df['AnalyteCode'] == analyte_code]
            total_count = analyte_data.shape[0]
            failed_results = ((analyte_data['Result'] < analyte_data['LFL']).sum() +
                              (analyte_data['Result'] > analyte_data['UFL']).sum())
            pass_rate = 100 - (failed_results / total_count) * 100
            pass_rates[analyte_code] = pass_rate

        # Convert the pass rates dictionary to a DataFrame
        pass_rate_df = pd.DataFrame(list(pass_rates.items()), columns=['AnalyteCode', 'PassRate'])

        # Plotting using Plotly Express bar chart
        fig = px.bar(pass_rate_df, x='AnalyteCode', y='PassRate',
                     title=f'Pass Rate for AnalyteCodes in StreamTag: {stag}',
                     labels={'AnalyteCode': 'Analyte Code', 'PassRate': f'% Pass Rate'})
        fig.add_shape(type='line', x0=min(pass_rate_df['AnalyteCode']), y0=95,
                      x1=max(pass_rate_df['AnalyteCode']), y1=95,
                      line=dict(color='red', width=2, dash='dash'))
        # Convert the figure to an HTML string
        fig_html = fig.to_html(full_html=False)

        return fig_html
