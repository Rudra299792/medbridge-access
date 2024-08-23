import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from chat.websocket_auth import TokenAuthMiddlewareStack  # Updated custom middleware stack
from chat.routing import websocket_urlpatterns  # WebSocket routing configuration
import logging

logger = logging.getLogger(__name__)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

try:
    # Initialize Django ASGI application early to ensure the app is ready before importing the URLRouter
    django_asgi_app = get_asgi_application()

    application = ProtocolTypeRouter({
        "http": django_asgi_app,  # Handles HTTP requests
        "websocket": TokenAuthMiddlewareStack(  # Use the updated TokenAuthMiddlewareStack
            URLRouter(
                websocket_urlpatterns  # Routes WebSocket requests
            )
        ),
    })

    logger.info("ASGI application successfully initialized.")

except Exception as e:
    logger.error(f"Failed to initialize ASGI application: {e}")
    application = None  # Optionally handle it in a way that suits your needs
