from django import forms


class UsernameForm(forms.Form):
    username = forms.CharField(label='username', max_length=100)
    password = forms.CharField(label='password', max_length=100)
    nickname = forms.CharField(label='nickname', max_length=100)
