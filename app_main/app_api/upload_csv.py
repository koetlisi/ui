import os

import requests
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings


# OopCompanion:suppressRename

class UploadCsv(APIView):
    @staticmethod
    def post(request):
        response = Response()
        uploaded_file = request.FILES['csv']
        csv_files_path = os.path.join(settings.MEDIA_ROOT, 'csv')
        if not os.path.exists(csv_files_path):
            os.makedirs(csv_files_path)
        file_path = os.path.join(csv_files_path, uploaded_file.name)
        with open(file_path, 'wb+') as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)
        data = request.POST.copy()
        relative_path = os.path.relpath(file_path, settings.MEDIA_ROOT)
        data['name'] = relative_path

        try:
            response.data = requests.post('http://127.0.0.1:8004/api/register/csv', data=data).json()
            return response

        except requests.exceptions.RequestException as e:
            return JsonResponse({'message': f'Error: {str(e)}'})

