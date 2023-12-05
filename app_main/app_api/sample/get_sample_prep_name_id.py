from rest_framework.views import APIView
from app_main.app_api.api_get_boot import boot_get


class GetSamplePrepNameIdAPI(APIView):
    @staticmethod
    def get(request):
        return boot_get(request, '/api/sample/prep/name_id', {})
