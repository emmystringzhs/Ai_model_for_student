from django.contrib.sessions.backends.db import SessionStore
from django.http import HttpResponseRedirect
from django.urls import reverse


class KillSessionsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Check if the user is visiting the homepage
        if request.path == reverse('home'):
            # Check if there are any active sessions
            session_keys = request.session.keys()
            for session_key in session_keys:
                session = SessionStore(session_key=session_key)
                if session.get_expiry_age() <= 0:
                    # If the session has expired, delete it
                    del request.session[session_key]

        response = self.get_response(request)

        return response


from authentication.models import Visitor

class SaveVisitorIPMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        visitor_ip = request.META.get('REMOTE_ADDR')
        
        # Save the IP address to the Django database
        Visitor.objects.create(ip_address=visitor_ip)
        
        response = self.get_response(request)
        return response

