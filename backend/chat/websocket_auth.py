from channels.auth import AuthMiddlewareStack
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError
import logging

logger = logging.getLogger(__name__)

@database_sync_to_async
def get_user(token_key):
    User = get_user_model()
    try:
        # Decode the token to get the user_id
        access_token = AccessToken(token_key)
        user = User.objects.get(id=access_token['user_id'])
        return user
    except TokenError as e:
        logger.error(f"Token error: {e}")
        return None
    except User.DoesNotExist:
        logger.error("User not found for token")
        return None

class TokenAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        logger.debug("TokenAuthMiddleware: Starting token validation")

        query_string = scope.get('query_string', b'').decode()
        token = None

        # Extract token from query string
        for param in query_string.split('&'):
            if param.startswith('token='):
                token = param.split('=')[1]
                break

        if token:
            logger.debug(f"Token found: {token}")
            user = await get_user(token)
            if user:
                scope['user'] = user
                logger.debug(f"User set in scope: {scope['user'].username}")
            else:
                logger.error("Invalid token. Closing connection.")
                await send({
                    "type": "websocket.close",
                    "code": 4001,  # Custom close code indicating authentication failure
                })
                return
        else:
            logger.error("No token found. Closing connection.")
            await send({
                "type": "websocket.close",
                "code": 4000,  # Custom close code indicating missing token
            })
            return
        
        return await self.inner(scope, receive, send)

def TokenAuthMiddlewareStack(inner):
    return TokenAuthMiddleware(AuthMiddlewareStack(inner))
