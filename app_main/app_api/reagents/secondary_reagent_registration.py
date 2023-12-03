import json

from rest_framework.views import APIView
import requests
from rest_framework.response import Response
from rest_framework import status

from ..api_boot import boot
from ..headers.header import headers
from ...functions.create_barcode import create_barcode
from ...functions.generate_unique_ean13 import generate_unique_ean13
from ...functions.upload_file_and_return_path import upload_file_and_return_path
from ...settings.globals import my_api


class SecondaryReagentRegistrationAPI(APIView):
    @staticmethod
    def post(request):
        token = request.COOKIES.get('laravel_token')
        generate_ean13 = generate_unique_ean13()
        barcode_path = create_barcode(generate_ean13)

        data = {
            'pre_user_id': request.data.get('pre_user_id'),
            'test_user_id': request.data.get('test_user_id'),
            'test_method_id': request.data.get('test_method_id'),
            'expiry': request.data.get('expiry'),
            'name': request.data.get('name'),
            'storage_id': request.data.get('storage_id'),
            'concentration': request.data.get('concentration'),
            'description': request.data.get('description'),
            'prep_date': request.data.get('prep_date'),
            'precursor': request.POST.getlist('precursor[]'),
            'barcode': generate_ean13,
            'barcode_path': barcode_path,
            'documentation': upload_file_and_return_path('documentation', request.FILES['documentation'])
        }
        boot(request, '/api/secondary/reagent/registration', data)
