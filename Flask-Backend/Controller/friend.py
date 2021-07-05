from flask import request
from flask_socketio import send, emit, join_room
from .app import socketio
from .database import FriendsDB, ImageDB
from .ticketSocket import clients


# {'username': {}, 'friendName': 'friend1'}
@socketio.on('Addedfriend', namespace='/friends')
def add_friend(data, t):
    print(data)
    user = data['username']
    friend = data['friendName']
    user_friends = FriendsDB.find_one({"username": user})['friends']
    if friend in user_friends:
        emit("Addedfriend", {"result": "already added", "friendPhoto":"",
                             "friendStatus": False})
        return
    user_friends.append(friend)
    FriendsDB.update_one({"username": user},
                         {"$set": {"friends": user_friends}})
    if FriendsDB.find_one({"username": friend}) is None:
        emit("Addedfriend", {"result": "Not Exist", "friendPhoto": "",
                             "friendStatus": False})
        return
    friends_query = FriendsDB.find_one({"username": friend})['friends']
    friends_query.append(user)
    FriendsDB.update_one({"username": friend},
                         {"$set": {"friends": friends_query}})
    status = False
    if friend in clients:
        status = True
        emit("Addedfriend", {"result": "pass", "friendPhoto": ImageDB.find_one({"username": user})["icon"],
                             "friendStatus": True}, to=clients[friend])

    emit("Addedfriend", {"result": "pass", "friendPhoto": ImageDB.find_one({"username": friend})["icon"],
                         "friendStatus": status})

# {'username': {}, 'friendName': 'friend1', 'friendPhoto': '', 'friendStatus': ''}
@socketio.on("Deletefriend", namespace="/friends")
def delet_friend(data):
    print(data)
    user = data["username"]
    friend = data["friendName"]
    user_friends = FriendsDB.find_one({"username": user})['friends']
    for i in range(0, len(user_friends)):
        if friend == user_friends[i]:
            del user_friends[i]
            FriendsDB.update_one({"username": user},
                                 {"$set": {"friends": user_friends}})
    friends_query = FriendsDB.find_one({"username": friend})['friends']
    for i in range(0, len(friends_query)):
        if user == friends_query[i]:
            del friends_query[i]
            FriendsDB.update_one({"username": friend},
                                 {"$set": {"friends": friends_query}})
    return