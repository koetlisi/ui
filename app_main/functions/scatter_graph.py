
import plotly.graph_objects as go
import pandas as pd


def graph_analytical_results(df, ldate=None, udate=None, acode=None, stag=None):
    df = df
    if ldate is None or udate is None or acode is None or stag is None :
        df.loc[:, 'Received'] = pd.to_datetime(df['Received'])
        df.loc[:, 'AnalyteCode'] = df['AnalyteCode'].astype("string")
        df.loc[:, 'Stream Tag'] = df['Stream Tag'].astype("string")
        lower_bound = pd.to_datetime('2023-09-25 17:58:00')
        upper_bound = pd.to_datetime('2023-10-01 17:58:00')
        WCMQC2020_IR_Chart = df.loc[(df['Stream Tag'] == 'WCMQC2020') &
                                    (df['AnalyteCode'] == 'IR') &
                                    (df['Received'] >= lower_bound) &
                                    (df['Received'] <= upper_bound) &
                                    (df['LFL'] < df['Result']) &
                                    (df['Result'] < df['UFL'])]

        if not WCMQC2020_IR_Chart.empty:
            WCM_IQC_clean = WCMQC2020_IR_Chart.ffill()
            WCMQC2020_IR_Chart['AnalyteCodeCount'] = WCMQC2020_IR_Chart.groupby('AnalyteCode').cumcount()
            fig = go.Figure()

            fig.add_trace(
                go.Scatter(x=WCMQC2020_IR_Chart['AnalyteCodeCount'], y=WCM_IQC_clean['Result'], mode='lines+markers',
                           name='Result',
                           line=dict(color='blue')))
            fig.add_trace(
                go.Scatter(x=WCMQC2020_IR_Chart['AnalyteCodeCount'], y=WCM_IQC_clean['ExpectedValue'], mode='lines',
                           name='ExpectedValue',
                           line=dict(color='green')))
            fig.add_trace(
                go.Scatter(x=WCMQC2020_IR_Chart['AnalyteCodeCount'], y=WCM_IQC_clean['LFL'], mode='lines', name='LFL',
                           line=dict(color='red')))
            fig.add_trace(
                go.Scatter(x=WCMQC2020_IR_Chart['AnalyteCodeCount'], y=WCM_IQC_clean['UFL'], mode='lines', name='UFL',
                           line=dict(color='red')))
            fig.add_trace(
                go.Scatter(x=WCMQC2020_IR_Chart['AnalyteCodeCount'], y=WCM_IQC_clean['LWL'], mode='lines', name='LWL',
                           line=dict(color='orange', dash='dot')))
            fig.add_trace(
                go.Scatter(x=WCMQC2020_IR_Chart['AnalyteCodeCount'], y=WCM_IQC_clean['UWL'], mode='lines', name='UWL',
                           line=dict(color='purple', dash='dot')))

            fig.update_layout(title='IR Chart', xaxis_title='Occurrence of AnalyteCode', yaxis_title='Values')
            return fig.to_html()
        else:
            return "<p>No data within the specified range and conditions.</p>"
    else:
        df.loc[:, 'Received'] = pd.to_datetime(df['Received'])
        df.loc[:, 'AnalyteCode'] = df['AnalyteCode'].astype("string")
        df.loc[:, 'Stream Tag'] = df['Stream Tag'].astype("string")
        lower_bound = pd.to_datetime(ldate)
        upper_bound = pd.to_datetime(udate)
        WCMQC2020_IR_Chart = df.loc[(df['Stream Tag'] == stag) &
                                    (df['AnalyteCode'] == acode) &
                                    (df['Received'] >= lower_bound) &
                                    (df['Received'] <= upper_bound) &
                                    (df['LFL'] < df['Result']) &
                                    (df['Result'] < df['UFL'])]

        if not WCMQC2020_IR_Chart.empty:
            WCM_IQC_clean = WCMQC2020_IR_Chart.ffill()
            WCMQC2020_IR_Chart['AnalyteCodeCount'] = WCMQC2020_IR_Chart.groupby('AnalyteCode').cumcount()
            fig = go.Figure()

            fig.add_trace(
                go.Scatter(x=WCMQC2020_IR_Chart['AnalyteCodeCount'], y=WCM_IQC_clean['Result'], mode='lines+markers',
                           name='Result',
                           line=dict(color='blue')))
            fig.add_trace(
                go.Scatter(x=WCMQC2020_IR_Chart['AnalyteCodeCount'], y=WCM_IQC_clean['ExpectedValue'], mode='lines',
                           name='ExpectedValue',
                           line=dict(color='green')))
            fig.add_trace(
                go.Scatter(x=WCMQC2020_IR_Chart['AnalyteCodeCount'], y=WCM_IQC_clean['LFL'], mode='lines', name='LFL',
                           line=dict(color='red')))
            fig.add_trace(
                go.Scatter(x=WCMQC2020_IR_Chart['AnalyteCodeCount'], y=WCM_IQC_clean['UFL'], mode='lines', name='UFL',
                           line=dict(color='red')))
            fig.add_trace(
                go.Scatter(x=WCMQC2020_IR_Chart['AnalyteCodeCount'], y=WCM_IQC_clean['LWL'], mode='lines', name='LWL',
                           line=dict(color='orange', dash='dot')))
            fig.add_trace(
                go.Scatter(x=WCMQC2020_IR_Chart['AnalyteCodeCount'], y=WCM_IQC_clean['UWL'], mode='lines', name='UWL',
                           line=dict(color='purple', dash='dot')))

            fig.update_layout(title=acode + ' Chart', xaxis_title='Occurrence of AnalyteCode', yaxis_title='Values')
            return fig.to_html()
        else:
            return "<p>No data within the specified range and conditions.</p>"


