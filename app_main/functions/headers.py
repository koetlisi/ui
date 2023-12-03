
def get_headers(request):
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': request.COOKIES.get('laravel_token')
    }


