from flask_socketio import SocketIO, send, emit
from .app import socketio
from .database import FriendsDB


@socketio.on("Addedfriend", namespace="/friends")
def add_friend(data):
    print("this is from data: " + str(data))
    friend, user = data['friendName'], data['name']
    user_friend = FriendsDB.find_one({"username": user})
    friend_list = user_friend['friends'].append(friend)
    FriendsDB.update_one({"username": user},
                         {"$set": {"friends": friend_list}})
    emit("Addedfriend", "pass", broadcast=False)
