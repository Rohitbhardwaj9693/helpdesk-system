from rest_framework import generics
from rest_framework.pagination import PageNumberPagination

from .models import Category
from .serializers import CategorySerializer
from accounts.permissions import IsAdmin


class CategoryCreateView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdmin]


class CategoryPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "limit"
    max_page_size = 100


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all().order_by("-id")
    serializer_class = CategorySerializer
    permission_classes = [IsAdmin]
    pagination_class = CategoryPagination

    def get_queryset(self):
        queryset = Category.objects.all().order_by("-id")

        search = self.request.query_params.get("search", "")

        if search:
            queryset = queryset.filter(
                Q(name__icontains=search)
            )
        status = self.request.query_params.get("status")

        if status:
            if status.upper() == "ACTIVE":
                queryset = queryset.filter(is_active=True)

            elif status.upper() == "INACTIVE":
                queryset = queryset.filter(is_active=False)
        return queryset

        