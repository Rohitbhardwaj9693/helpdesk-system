from rest_framework import serializers
from .models import User

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=[
            "id",
            "full_name",
            "email",
            "phone",
            "role",
            "department",
            "is_active",
            "last_login",
            "date_joined",
        ]    
class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8
    )    
    confirm_password = serializers.CharField(
        write_only =True
    )
    class Meta:
        model = User
        fields=[
            "full_name",
            "email",
            "role",
            "department",
            "is_active",
            "password",
            "confirm_password"
        ]    
    def validate(self,data):
        if data["password"] != data["confirm_password"]:
            raise serializers.validationError(
                {"confirmed_password":"Password do not match"}
            ) 
        return data
    def create(self,validated_data):
        validated_data.pop("confirm_password") 
        password = validated_data.pop("password")
        user = User.objects.create_user(
            password=password,
            **validated_data
        )  
        return user