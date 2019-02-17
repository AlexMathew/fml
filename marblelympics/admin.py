from django.contrib import admin

from .models import Event, Marblelympics, Team

admin.site.register(Team)
admin.site.register(Marblelympics)
admin.site.register(Event)
