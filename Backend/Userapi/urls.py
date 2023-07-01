from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    
    path('signup/',views.handleSignUp,name="handleSignUp"),
    path('login/',views.handelLogin,name='handelLogin'),
    path('logout/',views.handelLogout,name='handelLogout'),
    path('userdata/',views.getuserdata,name='getuserdata'),
    path('gettoken/',views.gettoken,name='gettoken'),
    path('qrdata/',views.getdatausingqrcode,name='qrdata'),
    path('facematch/',views.facematch,name='facematch'),
    path('verify/',views.getdatausingqrcode, name='verify'),

]