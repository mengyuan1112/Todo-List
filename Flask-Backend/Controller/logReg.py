import hashlib
import os
import re
import jwt

import datetime

from google.oauth2 import id_token
from google.auth.transport import requests

from flask_cors import CORS
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo


app = Flask(__name__)
cors = CORS(app)
"""
    Database: Mongodb
    host: localhost
    port: 27017
    database name: Todo_list
    collection name: user
    DB document [username, name, salt_password, email, salt, self_ticket, public_ticket]
"""
# app.config['MONGO_URI'] = "mongodb://localhost:27017/Todo_list"
UserDB = PyMongo(app, uri="mongodb://localhost:27017/Todo_list")
# GoogleDB = PyMongo(app, uri="mongodb://localhost:27017/Todo_list")


regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'  # Regex for check email validation
key = "HelloWord"


@app.route('/register', methods=['POST'])
def register():
    """
    :return: String with content "pass" and other
    """
    data = request.get_json()
    if not valid_pwd(data['password']):
        return jsonify({"result": "The password is not satisfied categories"})
    elif not re.search(regex, data['email']):
        return jsonify({"result": "The email is not valid"})
    elif UserDB.db.user.find_one({"email": data['email']}) is not None:
        return jsonify({"result": "The email already existed please sign in or change to another email"})
    elif UserDB.db.user.find_one({"username": data['username']}) is not None:
        return jsonify({"result": "Username is already exist please enter different one"})
    salt = os.urandom(32)  # reference: https://nitratine.net/blog/post/how-to-hash-passwords-in-python/
    salt_password = hashlib.pbkdf2_hmac('sha256', data['password'].encode('utf-8'), salt, 100000)

    user_document = {"username": data['username'], "name": data['username'], "salt_password": salt_password, "email": data['email'],
                     "salt": salt, "self_ticket": [], "public_ticket": []}
    UserDB.db.user.insert_one(user_document)
    return jsonify({"result": "Pass"})


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


@app.route('/login', methods=['POST', 'GET'])
def login():
    """
    :return: String with content "pass" and other
    """
    if request.method == 'GET':
        token = request.headers['Authorization'].split(" ")[1]
        status = check_token(token)
        return jsonify(status)
    else:
        data = request.get_json()
        if request.cookies.get('login') is not None:
            user = return_user(request.cookies.get('login'))
            if user is not None:
                return jsonify({"result": "Pass"})
        password = data['password']
        query = UserDB.db.user.find_one({"username": data['username']})
        if query is None:
            return jsonify({"result": "The user is not existed"})
        elif query['username'] == data['username']:
            new_salt_password = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), query['salt'], 100000)
            if new_salt_password != query['salt_password']:
                return jsonify({"result": "Password is wrong"})
        token = gen_jwt(data['username'])
    return jsonify({"result": "Pass", "token": token, "name": query['name']})


@app.route("/google/login", methods=['POST'])
def google_login():
    token = request.get_json()['token']
    try:
        id_info = id_token.verify_oauth2_token(token, requests.Request(), None)
        UserDB.db.googleUser.insert_one(id_info)
        first_name = id_info['family_name']
        last_name = id_info['given_name']
        response = {'result': "successful", 'first_name': first_name, 'last_name': last_name}
        return jsonify(response)
    except ValueError:
        ValueError
    return jsonify({"result": "unsuccessful"})


def return_user(cookie):
    query = UserDB.db.user.find_one({'cookies': cookie})
    if query is None:
        return None
    else:
        return query


def gen_jwt(username):
    issue_time = datetime.datetime.utcnow()
    token = jwt.encode({"iss": username, "iat": issue_time, "exp": issue_time + datetime.timedelta(minutes=30)},
                       key,
                       algorithm="HS256")
    return token


def check_token(token):
    try:
        form = jwt.decode(token, key, algorithms="HS256")
        username = form['iss']
        user = UserDB.db.user.find_one({"username": username})
        response = {"username": user['username'], "name": user['name'],
                    "email": user['email'], "self_ticket": user['self_ticket'],
                    "public_ticket": user['public_ticket']}
        return response
    except jwt.exceptions.ExpiredSignatureError:
        return {"result": "Expired"}


if __name__ == "__main__":
    app.run()
