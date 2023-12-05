import json

from rest_framework.views import APIView
import requests
from rest_framework.response import Response
from rest_framework import status

from ..api_boot import boot
from ..headers.header import headers
from ...settings.globals import my_api


class AnalysisRegistrationAPI(APIView):
    @staticmethod
    def post(request):
        token = request.COOKIES.get('laravel_token')
        data = {
            'description': request.data.get('description'),
            'name': request.data.get('name'),
            'analytical_method_id': request.POST.getlist('analytes_id[]'),
            'analytes_id': request.POST.getlist('analytical_method_id[]'),
            'sam_prep_method_id': request.POST.getlist('sam_prep_method_id[]'),
        }
        try:
            api_response = requests.post(my_api + '/api/analyses/registration', json=data,
                                         headers=headers(token))
            api_response.raise_for_status()
            return Response(api_response.json(), status=status.HTTP_200_OK)
        except requests.exceptions.HTTPError as err:
            print(err.response.text)
            return Response(err.response.text, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        #return boot(request, '/api/analyses/registration', data)
