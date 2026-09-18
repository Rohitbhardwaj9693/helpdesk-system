from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdmin ,IsManager ,IsAgent
from .serializers import (
    LoginSerializer,
    UserSerializer,
    CreateUserSerializer,
)
from .models import User
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
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
class UserListCreateView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        search = request.query_params.get("search","")
        users = User.objects.all().order_by("-id")
        role = request.query_params.get("role")

        if search:
            users = users.filter(
                Q(full_name__icontains=search)
                |Q(email__icontains=search)
                |Q(phone__icontains=search)
                |Q(department__icontains=search)
            )


        if role:
         users = users.filter(role=role)
        paginator = UserPagination()
        page = paginator.paginate_queryset(users, request)

        serializer = UserSerializer(page, many=True)

        return paginator.get_paginated_response(serializer.data)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def post(self, request):
        serializer = CreateUserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            return Response(
                {
                    "message": "User created successfully",
                    "user": UserSerializer(user).data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class UserPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "limit"
    max_page_size = 100
    