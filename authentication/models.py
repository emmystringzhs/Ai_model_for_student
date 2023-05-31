from django.db import models

# Create your models here.

from django.db import models

class Visitor(models.Model):
    ip_address = models.CharField(max_length=45)
    user_agent = models.CharField(max_length=255)
    referrer = models.URLField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    # Additional fields can be added as per your requirements

    def __str__(self):
        return self.ip_address

