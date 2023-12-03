from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path


urlpatterns = [
    path("", include("app_main.includes.views")),
    path("", include("app_main.includes.apis")),

]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
