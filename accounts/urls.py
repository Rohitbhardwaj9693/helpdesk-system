from django.urls import path
from .views import (LoginView, MeView,AdminTestView,
    ManagerTestView,
    AgentTestView, UserListCreateView,)

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("me/", MeView.as_view(), name="me"),
    path("admin-test/",AdminTestView.as_view(),name="admin-test"),
    path("manager-test/",ManagerTestView.as_view(),name="manager-test"),
    path("agent-test/",AgentTestView.as_view(),name="agent-test"),
    path("users/", UserListCreateView.as_view(), name="user-list-create"),
]