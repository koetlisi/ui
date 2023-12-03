import jwt
from rest_framework import response
from ..models import User
from ..serializers import UserSerializer


def userInformation(token):
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        response.data = {"code": 402, "msg": "Token has expired.!"}
        return response

    user = User.objects.filter(id=payload['id']).first()
    return user
