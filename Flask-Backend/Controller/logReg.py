import hashlib
import os
import re
import jwt
import datetime
import base64

from google.oauth2 import id_token
from google.auth.transport import requests
from flask import request, jsonify
from flask import Blueprint
from .database import UserDB, TicketDB, GoogleDB, ImageDB, FriendsDB, friends_clients, clients
# from .friend import update_user



logReg = Blueprint('logReg', __name__)
"""
    Database: Mongodb
    host: localhost
    port: 27017
    database name: Todo_list
    collection name: user
    DB document [username, name, salt_password, email, salt, self_ticket, public_ticket]
"""

# Regex for check email validation
regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'
key = "HelloWord"

# blew is default icon
im = "data:image/jpeg;base64,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"


@logReg.route('/register', methods=['POST'])
def register():
    """
    :return: String with content "pass" and other
    """
    data = request.get_json()
    if not valid_pwd(data['password']):
        return jsonify({"result": "The password is not satisfied categories"})
    elif not re.search(regex, data['email']):
        return jsonify({"result": "The email is not valid"})
    elif UserDB.find_one({"email": data['email']}) is not None:
        return jsonify({"result": "The email already existed please sign in or change to another email"})
    elif UserDB.find_one({"username": data['username']}) is not None:
        return jsonify({"result": "Username is already exist please enter different one"})
    # reference: https://nitratine.net/blog/post/how-to-hash-passwords-in-python/
    salt = os.urandom(32)
    salt_password = hashlib.pbkdf2_hmac(
        'sha256', data['password'].encode('utf-8'), salt, 100000)
    # default_user_icon = base64.b64encode(open("defaultUser.jpg", "rb").read())

    user_document = {"username": data['username'], "name": data['username'], "salt_password": salt_password,
                     "email": data['email'], "salt": salt}
    ticket_document = {"username": data['username'], "self_ticket": {
    }, "complete_ticket": {}, "public_ticket": {}, "complete_public_ticket": {}}
    image_document = {"username": data['username'], "icon": im}
    friend_document = {"username": data['username'], "friends": []}
    UserDB.insert_one(user_document)
    TicketDB.insert_one(ticket_document)
    ImageDB.insert_one(image_document)
    FriendsDB.insert_one(friend_document)
    return jsonify({"result": "Pass"})



@logReg.route('/login', methods=['POST', 'GET'])
def login():
    """
    :return: String with content "pass" and other
    """
    if request.method == 'GET':
        token = request.headers['Authorization'].split(" ")[1]
        if token == "null":
            return jsonify({"result": "Expired"})
        status = check_token(token)
        return jsonify(status)
    else:
        data = request.get_json()
        # print("login cookies: " + str(request.cookies.get('login')))
        if request.cookies.get('login') is not None:
            user = return_user(request.cookies.get('login'))
            if user is not None:
                return jsonify({"result": "Pass"})
        password = data['password']
        query = UserDB.find_one({"username": data['username']})
        if query is None:
            return jsonify({"result": "The user is not existed"})
        elif query['username'] == data['username']:
            new_salt_password = hashlib.pbkdf2_hmac(
                'sha256', password.encode('utf-8'), query['salt'], 100000)
            if new_salt_password != query['salt_password']:
                return jsonify({"result": "Password is wrong"})
        token = gen_jwt(data['username'])
    return jsonify({"result": "Pass", "token": token, "username": query['username'], "name": query['name']})


@logReg.route("/google/login", methods=['POST'])
def google_login():
    google_token = request.get_json()['token']
    try:
        id_info = id_token.verify_oauth2_token(google_token, requests.Request(), None)

        first_name = id_info['family_name']
        last_name = id_info['given_name']
        token = gen_jwt(last_name + " " + first_name)
        response = {'result': "successful", "token": token,
                    'first_name': first_name, 'last_name': last_name, }

        user_document = {"username": last_name + " " + first_name, "name": first_name + " " + last_name,
                         "salt_password": "",
                         "email": "", "salt": ""}
        if GoogleDB.find_one({"name": last_name + " " + first_name}) is not None:
            return response
        GoogleDB.insert_one(id_info)
        ticket_document = {"username": last_name + " " + first_name, "self_ticket": {
        }, "complete_ticket": {}, "public_ticket": {}, "complete_public_ticket": {}}
        image_document = {"username": last_name + " " + first_name, "icon": im}
        friend_document = {"username": last_name + " " + first_name, "friends": [], "friendWith": []}
        UserDB.insert_one(user_document)
        TicketDB.insert_one(ticket_document)
        ImageDB.insert_one(image_document)
        FriendsDB.insert_one(friend_document)
        return jsonify(response)
    except ValueError:
        ValueError
    return jsonify({"result": "unsuccessful"})


# @logReg.route("/logout", methods=["POST"])
# def logout():
#     data = request.get_json()
#     username = data['username']
#     print("before logout: " + str(username) + " friends_clients: " + str(friends_clients) + " clients: " + str(clients))
#     if username in clients:
#         clients.pop(username)
#     if username in friends_clients:
#         friends_clients.pop(username)
#     print("after logout: " + str(username) + " " + str(friends_clients) + " clients: " + str(clients))
#     friend_list = FriendsDB.find_one({"username": username})["friends"]
#     for friend in friend_list:
#         if friend in friends_clients:
#             # socketio.emit("userStatus", {"username": username, "status": False}, to=friends_clients[friend])
#             update_user(username, friend, friends_clients)
#         if friend in clients:
#             # socketio.emit("userStatus", {"username": username, "status": False}, to=clients[friend])
#             update_user(username, friend, clients)
#     return jsonify({"status": "pass"})

def return_user(cookie):
    query = UserDB.find_one({'cookies': cookie})
    if query is None:
        return None
    else:
        return query


def gen_jwt(username):
    issue_time = datetime.datetime.utcnow()
    token = jwt.encode({"iss": username, "iat": issue_time, "exp": issue_time + datetime.timedelta(minutes=60)},
                       key,
                       algorithm="HS256")

    return token


def check_token(token):
    try:

        form = jwt.decode(token, key, algorithms=["HS256"])
        username = form['iss']
        user = UserDB.find_one({"username": username})
        ticket = TicketDB.find_one({"username": username})
        response = {"username": user['username'], "name": user['name'],
                    "email": user['email'], "self_ticket": ticket['self_ticket'],
                    "public_ticket": ticket['public_ticket'], "complete_ticket": ticket['complete_ticket']}
        return response
    except jwt.exceptions.ExpiredSignatureError:
        # print("token from except is: " + token)
        return {"result": "Expired"}


def valid_pwd(pwd):
    """
        Check the password is valid in categories.
        @:param pwd: String
        @special Character: [',', '.', '!', '@', '#', '$', '%', '^', '&', '*']
    """
    n = len(pwd)
    spec_list = [',', '.', '!', '@', '#', '$', '%', '^', '&', '*']
    up_case, low_case, num, special_char = False, False, False, False
    if n < 8:
        return False
    for i in pwd:
        if i.isupper:
            up_case = True
        if i.islower:
            low_case = True
        if i.isdigit():
            num = True
        if i in spec_list:
            special_char = True
    return up_case and low_case and num and special_char