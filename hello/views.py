from django.shortcuts import render
from django.http import HttpResponse
from .forms import UsernameForm
from django.contrib.auth import authenticate
# Create your views here.


def index(request):
    if request.method == "POST":
        # room_name = "hello"
        form = UsernameForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                # return HttpResponse("Hello, " + username)
                context = {
                    'username': username,
                    # 'room_name': room_name,
                }
                return render(request, 'hello/index.html', context)
            else:
                return HttpResponse("login invalid")
    else:
        return render(request, 'hello/logthefuckin.html')
