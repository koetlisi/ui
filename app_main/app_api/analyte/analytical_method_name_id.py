from rest_framework.views import APIView
from app_main.app_api.api_get_boot import boot_get


class GetAnalyticalMethodNameId(APIView):
    @staticmethod
    def get(request):
        return boot_get(request, '/api/analytical/method/name-id', {})
