from django.contrib.auth import logout
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class Logout(APIView):
    @staticmethod
    def get(request):
        response = Response()

        try:
            response.delete_cookie('access_token')
            response.delete_cookie('laravel_token')
            logout(request)
            response.data = {"code": 200, "msg": "Successfully logged out!"}
            return response
        except Exception as e:
            # Handle exceptions during logout process
            error_message = f'Logout error: {str(e)}'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
