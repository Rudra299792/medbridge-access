from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
from django.db.models import Q
import logging
from myapp.models import Patient, Doctor
import re

def create_unique_group_name(user1, user2):
    # Replace any character that is not alphanumeric, hyphen, underscore, or period
    sanitized_user1 = re.sub(r'[^\w\.-]', '_', user1)
    sanitized_user2 = re.sub(r'[^\w\.-]', '_', user2)
    
    # Sort to ensure consistent group naming
    sorted_users = sorted([sanitized_user1, sanitized_user2])
    
    return f"chat_{sorted_users[0]}_{sorted_users[1]}"

logger = logging.getLogger(__name__)
User = get_user_model()


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        logger.debug("ChatConsumer: connect method called")
        self.user = self.scope['user']
        logger.debug(f"ChatConsumer: User from scope: {self.user}")
        
        if self.user.is_authenticated:
            logger.debug("ChatConsumer: User is authenticated")
            try:
                logger.debug("ChatConsumer: Attempting to get user profile")
                self.profile, self.profile_type = await self.get_user_profile(self.user)
                logger.debug(f"ChatConsumer: Profile retrieved - Type: {self.profile_type}")
                
                if not self.profile:
                    logger.warning("ChatConsumer: No profile found, closing connection")
                    await self.close()
                    return

                # Extract the room group name from the URL
                self.room_group_name = self.scope['url_route']['kwargs']['room_group_name']

                # Add the current WebSocket connection to the unique group
                await self.channel_layer.group_add(
                    self.room_group_name,
                    self.channel_name
                )
                logger.debug(f"ChatConsumer: Successfully added to group {self.room_group_name}")

                # Accept the WebSocket connection
                await self.accept()
                logger.debug("ChatConsumer: Connection accepted")

                # Fetch and send previous messages in this one-to-one chat
                previous_messages = await self.get_previous_messages()
                logger.debug(f"ChatConsumer: {len(previous_messages)} previous messages retrieved")
                await self.send(text_data=json.dumps({
                    'type': 'fetch_previous_messages',
                    'messages': previous_messages
                }))
                logger.debug("ChatConsumer: Previous messages sent")
            except Exception as e:
                logger.error(f"ChatConsumer: Error during connection: {e}", exc_info=True)
                await self.close()
        else:
            logger.warning("ChatConsumer: User is not authenticated, closing connection")
            await self.close()

    async def disconnect(self, close_code):
        if hasattr(self, 'room_group_name'):
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

    async def receive(self, text_data):
        logger.debug(f"Raw text_data received: {repr(text_data)}")
        
        if not isinstance(text_data, str):
            logger.debug(f"Expected text_data to be a string but got: {type(text_data)}")
            return
        
        try:
            text_data_json = json.loads(text_data)
        except json.JSONDecodeError as e:
            logger.debug(f"JSON decoding error: {str(e)}")
            await self.send(text_data=json.dumps({
                'type': 'error',
                'message': 'Invalid JSON format'
            }))
            return

        if not isinstance(text_data_json, dict):
            logger.debug(f"Expected JSON to decode to a dictionary but got: {type(text_data_json)}")
            await self.send(text_data=json.dumps({
                'type': 'error',
                'message': 'Invalid data structure'
            }))
            return

        logger.debug(f"text_data_json: {text_data_json}")
        message_type = text_data_json.get('type')
        
        if message_type == 'chat_message':
            message = text_data_json.get('message')
            receiver_username = text_data_json.get('to')
           
            if not message or not receiver_username:
                logger.debug("Missing 'message' or 'to' in data")
                await self.send(text_data=json.dumps({
                    'type': 'error',
                    'message': 'Missing message or receiver information'
                }))
                return
            
            try:
                # Fetch the User object for the receiver using sync_to_async
                receiver_user = await database_sync_to_async(User.objects.get)(username=receiver_username)
            except User.DoesNotExist:
                logger.debug(f"User with username {receiver_username} does not exist.")
                await self.send(text_data=json.dumps({
                    'type': 'error',
                    'message': 'Receiver user not found'
                }))
                return

            # Log the message details
            logger.debug(f"Sender: {self.scope['user'].username}, Receiver: {receiver_user.username}, Message: {message}")
            
            # Save the message with the room name
            await self.save_message(self.scope['user'], receiver_user, message, self.room_group_name)
            
            # Send the message to the group
            await self.channel_layer.group_send(
                self.room_group_name,  # Use the unique group name for this pair
                {
                    'type': 'chat_message',
                    'message': message,
                    'sender': self.scope['user'].username,
                }
            )
        else:
            logger.debug(f"Unknown message type: {message_type}")
            await self.send(text_data=json.dumps({
                'type': 'error',
                'message': 'Unknown message type'
            }))

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'sender': event['sender'],
            'roomName': self.room_group_name,  # Include room name in the response
        }))

    async def call_message(self, event):
        await self.send(text_data=json.dumps({
            'type': 'call',
            'from': event['from'],
            'call_type': event['call_type'],
        }))

    async def offer_message(self, event):
        await self.send(text_data=json.dumps({
            'type': 'offer',
            'from': event['from'],
            'offer': event['offer'],
        }))

    async def answer_message(self, event):
        await self.send(text_data=json.dumps({
            'type': 'answer',
            'from': event['from'],
            'answer': event['answer'],
        }))

    async def ice_candidate_message(self, event):
        await self.send(text_data=json.dumps({
            'type': 'ice-candidate',
            'from': event['from'],
            'candidate': event['candidate'],
        }))

    async def end_call_message(self, event):
        await self.send(text_data=json.dumps({
            'type': 'end-call',
            'from': event['from'],
        }))

    @database_sync_to_async
    def get_user_profile(self, user):
        logger.debug(f"get_user_profile: Fetching profile for user {user.username}")
        
        # Instead of using hasattr, use ORM queries to check existence
        try:
            if Patient.objects.filter(user=user).exists():
                logger.debug(f"get_user_profile: User {user.username} is a patient")
                return Patient.objects.get(user=user), 'patient'
            elif Doctor.objects.filter(user=user).exists():
                logger.debug(f"get_user_profile: User {user.username} is a doctor")
                return Doctor.objects.get(user=user), 'doctor'
        except Patient.DoesNotExist:
            logger.warning(f"get_user_profile: Patient profile not found for user {user.username}")
            return None, None
        except Doctor.DoesNotExist:
            logger.warning(f"get_user_profile: Doctor profile not found for user {user.username}")
            return None, None
        
        logger.warning(f"get_user_profile: No profile found for user {user.username}")
        return None, None

    
    @database_sync_to_async
    def save_message(self, sender, receiver, content, room_name):
        from .models import Message
        Message.objects.create(sender=sender, receiver=receiver, content=content, room_name=room_name)

    @database_sync_to_async
    def get_previous_messages(self):
        logger.debug(f"get_previous_messages: Fetching messages for room {self.room_group_name}")
        from .models import Message

        # Fetch messages based on the room name (room_group_name)
        messages = Message.objects.filter(room_name=self.room_group_name).order_by('timestamp')[:50]  # Limit to last 50 messages

        return [
            {
                'message': msg.content,
                'sender': msg.sender.username,
                'timestamp': msg.timestamp.isoformat()
            }
            for msg in messages
        ]
