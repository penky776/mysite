from django.db import models

# Create your models here.


class Username(models.Model):
    username_text = models.CharField(max_length=20)

    def __str__(self):
        return self.username_text


class Password(models.Model):
    username = models.ForeignKey(Username, on_delete=models.CASCADE)
    password_text = models.CharField(max_length=100)

    def __str__(self):
        return self.password_text
