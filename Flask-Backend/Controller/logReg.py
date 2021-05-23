import hashlib
import os
import re
from flask_cors import CORS
from google.oauth2 import id_token
from google.auth.transport import requests
from secrets import token_urlsafe

from flask import Flask, request, jsonify, Response, make_response
from flask_pymongo import PyMongo


app = Flask(__name__)
cors = CORS(app)
"""
    Database: Mongodb
    host: localhost
    port: 27017
    database name: Todo_list
    collection name: user
    DB document [name, salt_password, email, salt, cookies, self_ticket, public_ticket]
"""
app.config['MONGO_URI'] = "mongodb://localhost:27017/Todo_list"
mongo = PyMongo(app)


regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'  # Regex for check email validation


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
    elif mongo.db.user.find_one({"email": data['email']}) is not None:
        return jsonify({"result": "The email already existed please sign in or change to another email"})
    elif mongo.db.user.find_one({"username": data['username']}) is not None:
        return jsonify({"result": "Username is already exist please enter different one"})
    salt = os.urandom(32)  # reference: https://nitratine.net/blog/post/how-to-hash-passwords-in-python/
    salt_password = hashlib.pbkdf2_hmac('sha256', data['password'].encode('utf-8'), salt, 100000)

    user_document = {"username": data['username'], "salt_password": salt_password, "email": data['email'],
                     "salt": salt, "cookies": None, "self_ticket": [], "public_ticket": []}
    mongo.db.user.insert_one(user_document)
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


@app.route('/login', methods=['POST'])
def login():
    """
    :return: String with content "pass" and other
    """
    data = request.get_json()
    if request.cookies.get('login') is not None:
        user = return_user(request.cookies.get('login'))
        if user is not None:
            return jsonify({"result": "Pass"})
    password = data['password']
    query = mongo.db.user.find_one({"username": data['username']})
    if query is None:
        return jsonify({"result": "The user is not existed"})
    elif query['username'] == data['username']:
        new_salt_password = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), query['salt'], 100000)
        if new_salt_password != query['salt_password']:
            return jsonify({"result": "Password is wrong"})

    response_cookie = token_urlsafe(16)
    response = make_response({"result": "Pass"})
    response.set_cookie(key="login", value=response_cookie, max_age=3*60)
    response.headers['Content-type'] = "application/json"
    return response


@app.route("/google/login", methods=['POST'])
def google_login():
    print(str(request.get_json()))
    token = request.get_json()['token']
    # name = request.get_json()['name']
    idinfo = id_token.verify_oauth2_token(token, requests.Request(), None)
    print(str(idinfo))
    try:
        # idinfo = id_token.verify_oauth2_token(token, requests.Request())
        print("a")

    except ValueError:
        print(ValueError)
        ValueError
    return "hello"


def return_user(cookie):
    query = mongo.db.user.find_one({'cookies': cookie})
    if query is None:
        return None
    else:
        return query


if __name__ == "__main__":
    app.run()
