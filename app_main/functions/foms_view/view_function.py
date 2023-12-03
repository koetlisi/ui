from django.shortcuts import render, redirect
from ...functions.jwt_decode import userInformation


def view_function(request, url):
    token = request.COOKIES.get('access_token')
    if token is None:
        return redirect('/')
    user = userInformation(token)
    return render(request, url, {
        'name': user.name,
        'surname': user.last_name,  # Pass the charts to the template
    })
