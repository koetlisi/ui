import requests
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..api_boot import boot
from ..headers.header import headers
from ...settings.globals import my_api


class AnalyteUnitsRegistrationAPI(APIView):
    @staticmethod
    def post(request):
        return boot(request, '/api/analyte/registration', request.data)
