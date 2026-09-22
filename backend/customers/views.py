from rest_framework import generics
from .models import Customer
from .serializers import CustomerSerializer
from accounts.permissions import IsAdmin
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
class CustomerPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "limit"
    max_page_size = 100

class CustomerCreateView(generics.CreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAdmin]


class CustomerListView(generics.ListAPIView):
    # queryset = Customer.objects.all().order_by("-id")
    serializer_class = CustomerSerializer
    permission_classes = [IsAdmin]
    pagination_class = CustomerPagination
    def get_queryset(self):
        queryset = Customer.objects.all().order_by("-id")

        search = self.request.query_params.get("search", "")

        if search:
            queryset = queryset.filter(
                Q(full_name__icontains=search)
                | Q(email__icontains=search)
                | Q(phone__icontains=search)
                | Q(company__icontains=search)
            )
        status = self.request.query_params.get("status")

        if status:
            if status.upper() == "ACTIVE":
                queryset = queryset.filter(is_active=True)

            elif status.upper() == "INACTIVE":
                queryset = queryset.filter(is_active=False)
        return queryset