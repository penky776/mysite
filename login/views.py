from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate
# Create your views here.


def index(request):
    # user = authenticate(username='user1', password='user1password')
    # if user is not None:
    #     return render(request, 'login/index.html/')
    # else:
    #     return HttpResponse("login invalid")
    return render(request, 'login/index.html')
