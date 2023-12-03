import requests
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..headers.header import headers
from ...functions.create_barcode import create_barcode
from ...functions.generate_unique_ean13 import generate_unique_ean13
from ...settings.globals import my_api


class SampleRegistrationAPI(APIView):
    @staticmethod
    def post(request):
        token = request.COOKIES.get('laravel_token')
        generate_ean13 = generate_unique_ean13()
        barcode_path = create_barcode(generate_ean13)

        data = {
            'frequency': request.data.get('frequency'),
            'sample_type': request.data.get('sample_type'),
            'state': request.data.get('state'),
            'barcode_path': barcode_path,
            'description': request.data.get('description'),
            'weight': request.data.get('weight'),
            'name': request.data.get('name'),
            'collection_date': request.data.get('collection_date'),
            'analyte': request.POST.getlist('analyte[]'),  # Access the list directly without getlist()
            'barcode': generate_ean13
        }

        try:
            api_response = requests.post(my_api + '/api/sample/registration', json=data,
                                         headers=headers(token))
            api_response.raise_for_status()
            return Response(api_response.json(), status=status.HTTP_200_OK)
        except requests.exceptions.HTTPError as err:
            print(err.response.text)
            return Response(err.response.text, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


