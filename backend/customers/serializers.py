from rest_framework import serializers
from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            "id",
            "full_name",
            "email",
            "phone",
            "company",
            "is_active",
            "created_at",
            "updated_at",
        ]