from django.contrib import admin

from .models import Event, FantasyPlayer, Marblelympics, PlayerEntry, Team


class TeamAdmin(admin.ModelAdmin):
    readonly_fields = ('cdn_image',)


admin.site.register(Team, TeamAdmin)
admin.site.register(Marblelympics)
admin.site.register(Event)
admin.site.register(FantasyPlayer)
admin.site.register(PlayerEntry)
