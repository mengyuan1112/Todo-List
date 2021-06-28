from flask import request
from flask_socketio import send, emit, join_room
from .app import socketio
from .database import FriendsDB


