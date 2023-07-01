
from __future__ import print_function, unicode_literals
from facepplib import FacePP, exceptions
import emoji
from django.shortcuts import render,redirect,HttpResponsePermanentRedirect
from django.http import Http404, HttpResponseNotFound,HttpResponse
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import *
from django.views.decorators.csrf import csrf_exempt
import json
from cryptography.fernet import Fernet






@csrf_exempt
def getdatausingqrcode(request):
    temp=json.loads(request.body)
    # print(temp)
    # return HttpResponse(request.body)
    item = False
    try:
        
        item = tokan.objects.get(key=temp['key'])
    except tokan.DoesNotExist:
        item = None
    if item != None:
        data=Userdata.objects.values().filter(email=item)
        response = json.dumps(data[0])
        return HttpResponse(response,content_type="application/json")
        # return HttpResponse(request.body)
    else:
        return HttpResponseNotFound("Data Doesn't Exist")
    

@csrf_exempt
def hello(request):
    # if request.user.is_authenticated:
    temp=json.loads(request.body)
    # print(temp)
    data={}
    
        
    for i in temp:
        if i!="password":
            data[i]=temp[i]
    
    data1=Userdata(**data)
    
    data1.save()
    
    message=""
    for i in data:
        message = message+data[i]

    newdata=data
    key = Fernet.generate_key()

    fernet = Fernet(key)


    encMessage = fernet.encrypt(message.encode())
    encMessage=encMessage.decode()
    email=data['email']
    data=tokan(key=encMessage,email=email)
    data.save()
    response = json.dumps(newdata)
    return HttpResponse(response,content_type="application/json")
    
    #return HttpResponse(request.body)
    # else:
    #     return HttpResponse('{"response":"login first"}')


def getuserdata(request):
    if request.user.is_authenticated:
        data=Userdata.objects.values().filter(email=request.user.email)
        # print(data[0])
        response = json.dumps(data[0])
        return HttpResponse(response,content_type="application/json")
    else:
        return HttpResponse('{"response":"login first"}')

    
@csrf_exempt
def gettoken(request):
    if request.method == "POST":
        temp=json.loads(request.body)

        data=tokan.objects.values().filter(email=temp['email'])
        response = json.dumps(data[0])
        return HttpResponse(response,content_type="application/json")
    
    else:
        raise Http404


@csrf_exempt
def handleSignUp(request):
    if request.method == "POST":
        temp=json.loads(request.body)
    
        #print(temp)
        
        check = User.objects.filter(email=temp['email'])
        if len(check) > 0:
            raise Http404

       
        
        myuser = User.objects.create_user(temp['email'], temp['email'], temp['password'])
        # myuser.first_name = temp['fname']
        # myuser.last_name = temp['lname']
        #myuser.save()
        return hello(request)
        # response={"response":"Your account has been successfully created"}

        # response=json.dumps(response)
        
        # return HttpResponse(response)

    else:
         raise Http404

@csrf_exempt
def handelLogin(request):
    if request.method == "POST":
       
        print(request)
        temp=json.loads(request.body)
        
        user = authenticate(username=temp['email'],password=temp['password'])
        if user is not None:
            login(request, user)
            print("login")
            return getuserdata(request)
        else:
            raise Http404
    else:
        raise Http404


@csrf_exempt
def handelLogout(request):
    if request.user.is_authenticated:
        logout(request)
        print("logout")
        return HttpResponse("{'response':'succesfully logout'}")
    else:
        print("by")
        return HttpResponse("{'response':'login first'}")



face_detection = ""
faceset_initialize = ""
face_search = ""
face_landmarks = ""
dense_facial_landmarks = ""
face_attributes = ""
beauty_score_and_emotion_recognition = ""

# # define face comparing function
# def face_comparing(app, Image1, Image2):

	
# 	print()
# 	print('-'*30)
# 	print('Comparing Photographs......')
# 	print('-'*30)


# 	cmp_ = app.compare.get(image_url1 = Image1,image_url2 = Image2)

# 	print('Photo1', '=', cmp_.image1)
# 	print('Photo2', '=', cmp_.image2)

# 	# Comparing Photos
# 	if cmp_.confidence > 70:
# 	    print('Both photographs are of same person......')
#     else:
# 		print('Both photographs are of two different persons......')

def func(app,Image1,Image2):
    print("comparing pthotographs")
    cmp=app.compare.get(image_url1=Image1,image_url2=Image2)
    if cmp.confidence > 90:
        print("both are same person", cmp.confidence)
        return 1
    else:
        print("different person",cmp.confidence)
        return 0


@csrf_exempt
def facematch(request):
    if request.method=='POST':
        temp=json.loads(request.body)
        img=temp['img']
        token=temp['token']
        # print(img)
        # print(token)
        val=tokan.objects.values().filter(key=token)
        email=""
        for i in val:
            for j in i:
                if j=='email':
                    email=i[j]
        

        # print(email)
        val1=Userdata.objects.values().filter(email=email)
        pic=""
        for i in val1:
            for j in i:
                if j=='pic':
                    pic=i[j]
        print("frontend image")
        print(img)
        print("Backend image")
        print(pic)
        api_key ='xQLsTmMyqp1L2MIt7M3l0h-cQiy0Dwhl'
        api_secret ='TyBSGw8NBEP9Tbhv_JbQM18mIlorY6-D'
        response=0
        try:
                    
           
            
            # call api
            app_ = FacePP(api_key = api_key,
                        api_secret = api_secret)
            funcs = [
                face_detection,
                # face_comparing_localphoto,
                # face_comparing_websitephoto,
                faceset_initialize,
                face_search,
                face_landmarks,
                dense_facial_landmarks,
                face_attributes,
                beauty_score_and_emotion_recognition
            ]
            
            # Pair 1
            # image1 = 'https://upload.wikimedia.org/wikipedia/commons/2/21/MarkRuffalo07TIFF.jpg'
            # image2 = 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2012/04/26/18/Untitled-5.jpg?quality=75&width=990&auto=webp&crop=982:726,smart'
            image1 = img
            image2 = pic
            
            response=func(app_, image1, image2)
            
           	

        except exceptions.BaseFacePPError as e:
            print('Error:', e)
        print(response)
        if response==1:
            ans={'verify':True}
            ans=json.dumps(ans)
            return HttpResponse(ans,content_type="application/json")
        else:
            ans={'verify':False}
            ans=json.dumps(ans)
            return HttpResponse(ans,content_type="application/json")
    else:
        raise Http404