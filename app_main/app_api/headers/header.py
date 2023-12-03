def headers(token):
    # token = '1|zQD6DUOGCzGiCoam9vBB2h5s3IEcA5nZ07i0iC9E3db42733'  # Replace with your Bearer token

    header = {
        'Authorization': f'Bearer {token}',   # Example: User-Agent header
        'Accept': 'application/vnd.api+json, application/json',
        'Content-Type': 'application/vnd.api+json,application/json',
    }
    return header
