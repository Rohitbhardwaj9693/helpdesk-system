from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .serializers import LoginSerializer
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdmin ,IsManager ,IsAgent
# Create your views here.
class LoginView(APIView):
    def post(self,request):
        serializers = LoginSerializer(data=request.data)
        if not serializers.is_valid():
            return Response(
            serializers.errors,
            status=status.HTTP_400_BAD_REQUEST
            )   
        email = serializers.validated_data["email"]
        password = serializers.validated_data["password"]
        user = authenticate(
            request,
            email=email,
            password=password
        )  
        if user is None:
            return Response(
                {"message":"Invalid email or password"},
                status=status.HTTP_401_UNAUTHORIZED
            )  
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token 
        return Response(
    {
        "message": "Login successful",
        "refresh": str(refresh),
        "access": str(access),
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role,
            "department": user.department,
        },
    },
    status=status.HTTP_200_OK
)

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response(
            {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role,
                "department": user.department,
            },
            status=status.HTTP_200_OK
        )

class AdminTestView(APIView):
    permission_classes =[IsAdmin]
    def get(self,request):
        return Response(
            {"message":"You are admin"},
            status=status.HTTP_200_OK
        )
class ManagerTestView(APIView):
    permission_classes=[IsManager]
    def get(self,request):
        return Response(
            {"message":"You are Manager"},
            status=status.HTTP_200_OK
        )   
class AgentTestView(APIView):
    permission_classes=[IsAgent]
    def get(self,request):
        return Response(
            {"message":"You are Agent"},
            status=status.HTTP_200_OK
        )
