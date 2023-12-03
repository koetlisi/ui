import requests


def get_country_flag(country_code):
    # Fetch country details using restcountries API
    url = f"https://restcountries.com/v3.1/alpha/{country_code}"
    response = requests.get(url)
    if response.status_code == 200:
        country_data = response.json()
        return country_data[0]['flags'][0] if 'flags' in country_data[0] else None
    return None
