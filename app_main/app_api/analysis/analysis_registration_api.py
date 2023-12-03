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
        incoming_json = request.body.decode('utf-8')
        json_data = json.loads(incoming_json)
        data = {
            'description': request.data.get('description'),
            'name': request.data.get('name'),
            'analytes_id': json_data.get('analytes_id', []),
            'analytical_method_id': json_data.get('analytical_method_id', []),
            'sam_prep_method_id': json_data.get('sam_prep_method_id', []),
        }
        return boot(request, '/api/analyses/registration', data)
