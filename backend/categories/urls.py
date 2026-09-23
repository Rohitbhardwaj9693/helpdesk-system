from django.urls import path

from .views import CategoryCreateView, CategoryListView


urlpatterns = [
    path("", CategoryCreateView.as_view(), name="category-create"),
    path("list/", CategoryListView.as_view(), name="category-list"),
]