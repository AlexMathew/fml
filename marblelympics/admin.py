from django.contrib import admin

from .models import Event, FantasyPlayer, Marblelympics, PlayerEntry, Team


class TeamAdmin(admin.ModelAdmin):
    readonly_fields = ('cdn_image',)


class EventAdmin(admin.ModelAdmin):
    readonly_fields = ('scoring_status',)


admin.site.register(Team, TeamAdmin)
admin.site.register(Marblelympics)
admin.site.register(Event, EventAdmin)
admin.site.register(FantasyPlayer)
admin.site.register(PlayerEntry)
