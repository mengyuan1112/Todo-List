from flask import request
from flask_socketio import send, emit, join_room
from .app import socketio
from .database import FriendsDB, ImageDB, friends_clients


@socketio.on("IntoPersonal", namespace='/friends')
def online_friend(data):
    friends_clients[data["username"]] = request.sid
    return


# {'username': {}, 'friendName': 'friend1'}
@socketio.on('Addedfriend', namespace='/friends')
def add_friend(data, t):
    print("friend SID: "+str(request.sid))
    user = data['username']
    friend = data['friendName']
    user_friends = FriendsDB.find_one({"username": user})['friends']
    if friend in user_friends:
        emit("Addedfriend", {"result": "already added", "friendPhoto":"", "friendStatus": False})
        return
    if FriendsDB.find_one({"username": friend}) is None:
        emit("Addedfriend", {"result": "Not Exist", "friendPhoto": "", "friendStatus": False})
        return
    user_friends.append(friend)
    FriendsDB.update_one({"username": user},
                         {"$set": {"friends": user_friends}})
    friends_query = FriendsDB.find_one({"username": friend})['friends']
    friends_query.append(user)
    FriendsDB.update_one({"username": friend},
                         {"$set": {"friends": friends_query}})
    status = False
    if friend in friends_clients:
        status = True
        emit("Addedfriend", {"result": "pass", "friendPhoto": ImageDB.find_one({"username": user})["icon"],
                             "friendStatus": True, "friendName": user}, broadcast=False, to=friends_clients[friend])
        #print("sent to: "+str(friend) + " client number: "+str(friends_clients[friend]))

    emit("Addedfriend", {"result": "pass", "friendPhoto": ImageDB.find_one({"username": friend})["icon"],
                         "friendStatus": status, "friendName": friend})

# {'username': {}, 'friendName': 'friend1', 'friendPhoto': '', 'friendStatus': ''}
@socketio.on("Deletefriend", namespace="/friends")
def delete_friend(data):
    print(data)
    user = data["username"]
    friend = data["friendName"]
    user_friends = FriendsDB.find_one({"username": user})['friends']
    # consist delet has error with idx of user_friends
    print("friend list is: " + str(user_friends))
    for i in range(0, len(user_friends)):
        print("idx is: " + str(i))
        if friend == user_friends[i]:
            del user_friends[i]
            FriendsDB.update_one({"username": user},
                                 {"$set": {"friends": user_friends}})
            break
    friends_query = FriendsDB.find_one({"username": friend})['friends']
    for i in range(0, len(friends_query)):
        if user == friends_query[i]:
            del friends_query[i]
            FriendsDB.update_one({"username": friend},
                                 {"$set": {"friends": friends_query}})
            break
    return