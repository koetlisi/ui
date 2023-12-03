from rest_framework.views import APIView
from app_main.app_api.api_get_boot import boot_get


class OptionSelectAnalytes(APIView):
    @staticmethod
    def get(request):
        return boot_get(request, '/api/get/all/analytes', {})
