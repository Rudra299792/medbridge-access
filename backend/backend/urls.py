from django.conf import settings
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.views.static import serve
import os

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('myapp.urls')),
    
    # Serve images from specific subdirectories in the build folder
    re_path(r'^icons/(?P<path>.*)$', serve, {'document_root': os.path.join(settings.BASE_DIR, 'frontend/build/icons')}),
    re_path(r'^hospitals/(?P<path>.*)$', serve, {'document_root': os.path.join(settings.BASE_DIR, 'frontend/build/hospitals')}),
    re_path(r'^banner/(?P<path>.*)$', serve, {'document_root': os.path.join(settings.BASE_DIR, 'frontend/build/banner')}),
    re_path(r'^countries/(?P<path>.*)$', serve, {'document_root': os.path.join(settings.BASE_DIR, 'frontend/build/countries')}),

    # Catch-all for React app
    re_path(r'^.*$', TemplateView.as_view(template_name=os.path.join(settings.BASE_DIR, 'frontend/build/index.html'))),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
