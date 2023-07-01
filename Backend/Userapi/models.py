from email.policy import default
from statistics import mode
from django.db import models

# Create your models here.


class Userdata(models.Model):
    name=models.CharField(max_length=50,default="")
    email=models.CharField(max_length=50,default="")
    mobile=models.CharField(max_length=50,default="")
    dob=models.CharField(max_length=50,default="")
    uid=models.CharField(max_length=50,default="")
    gender=models.CharField(max_length=50,default="")
    pic=models.CharField(max_length=1000,default="")

    def __str__(self):
        return self.name


class tokan(models.Model):
    key=models.CharField(max_length=1000,default="")
    email=models.CharField(max_length=100,default="")


    def __str__(self):
        return self.email




    

