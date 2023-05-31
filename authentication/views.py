from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
import json
from . import chatbrain

# Create your views here.

def home(request):
    return render(request, "authentication/index.html")


def chatbot(request):
    return render(request, "authentication/chatbot.html")


def signin(request):
    if request.method == "POST":
        username = request.POST['username']
        pass1 = request.POST['login-password']

        user = authenticate(username=username, password=pass1)
        if user is not None:
            login(request, user)
            return redirect('chatbot')
        else:
            messages.error(request, "Bad credentials")
            return redirect('home')

    return render(request, "authentication/signin.html")


def sign_out(request):
    logout(request)
    messages.success(request, "Logged out successfully")
    return redirect("home")


def signup(request):
    if request.method == "POST":
        username = request.POST['signup-username']
        email = request.POST['signup-email']
        pass1 = request.POST['signup-password']
        pass2 = request.POST['signup-password-confirm']
        if User.objects.filter(username=username):
            messages.error(
                request, "Username already exist! Please try some other username")
            return redirect('home')

        if User.objects.filter(email=email):
            messages.error(request, "Email already registerd!")
            return redirect('home')

        if len(username) > 10:
            messages.error(request, "Username must be under 10 characters")

        if pass1 != pass2:
            messages.error(request, "Password didn't match!")

        if not username.isalnum():
            messages.error(request, "username must be alpha-Numeric!")
            return redirect('home')

        myuser = User.objects.create_user(
            username=username, email=email, password=pass1)
        myuser.save()

        messages.success(request,
                         "Your account has been successfully created. We have sent you an E-mail please confirm your "
                         "email to confirm your ")

        # Welcome email

        subject = "Welcome to Emmy!concept"

        #     return redirect('signin')
        # else:
        #     error_message = 'Passwords do not match. Please try again.'
        #     return render(request, "authentication/signin.html", {'error_message': error_message})

    return render(request, "authentication/signin.html")


@csrf_exempt
def get_response(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            message = data['message']
            brain = chatbrain.CustomChatGPT(message)
            response = "I'm sorry, I don't understand. Please try asking another question."
            return JsonResponse({'response': brain})
        except:
            return JsonResponse({'response': 'An error occurred. Please try again.'})
    else:
        return JsonResponse({'response': 'Invalid request method.'})

