from django.urls import path
from .views import (CustomerCreateView,
CustomerListView)


urlpatterns = [
    path("", CustomerCreateView.as_view(), name="customer-list-create"),
    path("list/", CustomerListView.as_view(), name="customer-list")
]