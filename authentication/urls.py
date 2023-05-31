from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('get_response', views.get_response, name='get_response'),
    path('', views.home, name="home"),
    path('chatbot', views.chatbot, name='chatbot'),
    path('signin', views.signin, name='signin'),
    path('sign_out', views.sign_out, name='sign_out'),
    path('signup', views.signup, name='signup'),
]
