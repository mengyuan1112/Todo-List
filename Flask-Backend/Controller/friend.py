from flask import request
from flask_socketio import emit
from app import socketio
from .database import FriendsDB, ImageDB, friends_clients, clients


@socketio.on("IntoPersonal", namespace='/friends')
def online_friend(data):
    friends_clients[data["username"]] = request.sid
    friend_list = FriendsDB.find_one({"username": data["username"]})["friends"]
    for friend in friend_list:
        if friend in friends_clients:
            emit("userStatus", {
                "friendName": data["username"], "friendPhoto": ImageDB.find_one({"username": data['username']})['icon'], "friendStatus": True}, to=friends_clients[friend])
        if friend in clients:
            emit("userStatus", {
                "friendName": data["username"], "friendPhoto": ImageDB.find_one({"username": data['username']})['icon'], "friendStatus": True}, to=clients[friend])
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
            if friend in friends_clients:
                emit("Deletefriend", {"username": user}, to=friends_clients[friend])
            break
    return


@socketio.on("logout", namespace='/friends')
def logout(data):
    username = data['username']
    print("before logout: " + str(username) + " friends_clients: " + str(friends_clients) + " clients: " + str(clients))
    friend_list = FriendsDB.find_one({"username": username})["friends"]
    if username in friends_clients:
        friends_clients.pop(username)
    if username in clients:
        clients.pop(username)
    for friend in friend_list:
        print("send to friend: " + friend)
        if friend in friends_clients:
            emit("userStatus", {
                "friendName": data["username"], "friendPhoto": ImageDB.find_one({"username": data['username']})['icon'], "friendStatus": False}, to=friends_clients[friend])
        if friend in clients:
            emit("userStatus", {
                "friendName": data["username"], "friendPhoto": ImageDB.find_one({"username": data['username']})['icon'], "friendStatus": False}, to=clients[friend])
    print("after logout: " + str(username) + " friends_clients: " + str(friends_clients) + " clients: " + str(clients))
    return