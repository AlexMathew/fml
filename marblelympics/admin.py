from django.contrib import admin

from .models import Event, FantasyPlayer, Marblelympics, PlayerEntry, Team

admin.site.register(Team)
admin.site.register(Marblelympics)
admin.site.register(Event)
admin.site.register(FantasyPlayer)
admin.site.register(PlayerEntry)
