from ..functions.login import login_api_calling
from ..models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import jwt
import datetime


class LoginApi(APIView):
    @staticmethod
    def post(request):
        response = Response()
        try:
            email = request.data['email']
            password = request.data['password']

            user = User.objects.filter(email=email).first()
            if user is None:
                response.data = {'code': 402, 'msg': 'User not found'}
                return response

            if not user.check_password(password):
                response.data = {'code': 401, 'msg': 'Incorrect password'}
                return response

            payload = {
                'id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=8760),
                'iat': datetime.datetime.utcnow()
            }
            token = jwt.encode(payload, 'secret', algorithm='HS256')
            print(token)
            response.set_cookie(key='access_token', value=token, httponly=True)
            login_response = login_api_calling(email, password, token)

            # Assuming login_api_calling is a function that handles the API call for login
            if login_response:
                response.data = login_response
                response_data = response.data
                access_token = response_data.get('data', {}).get('access_token')
                if access_token:
                    response.set_cookie(key='laravel_token', value=access_token, httponly=True)
                return response
            else:
                return Response({'message': 'Failed to log in'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except KeyError as e:
            return Response({'message': f'Missing key in request: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message': f'An unexpected error occurred: {str(e)}'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
