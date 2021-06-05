import os
import hashlib

from flask_cors import CORS
from flask import request, jsonify
from flask import Blueprint
from .database import UserDB, TicketDB, GoogleDB, ImageDB

profile = Blueprint('profile', __name__)
"""
    Database: Mongodb
    host: localhost
    port: 27017
    database name: Todo_list
    collection name: user
    DB document [username, name, icon, salt_password, email, salt, self_ticket, public_ticket]
"""



@profile.route('/<user_name>/profile', methods=['GET'])
def user_profile(user_name):
    user_info = UserDB.find_one({"username": user_name})
    user_image = ImageDB.find_one({"username": user_name})
    doc = {"username": user_info['username'], "name": user_info['name'],
           "icon": user_image["icon"], "email": user_info['email']}
    return jsonify(doc)


@profile.route('/<user_name>/profile/password', methods=['POST'])
def change_password(user_name):
    data = request.get_json()
    old_password = data['oldPassword']
    new_password = data['newPassword']
    user_info = UserDB.find_one({"username": user_name})
    salted_password = hashlib.pbkdf2_hmac(
        'sha256', old_password.encode('utf-8'), user_info['salt'], 100000)
    if salted_password != user_info['salt_password']:
        return jsonify({"result": "Password is wrong"})
    else:
        salt = os.urandom(32)
        new_salted_password = hashlib.pbkdf2_hmac(
            'sha256', new_password.encode('utf-8'), salt, 100000)
        UserDB.update_many({"username": user_name},
                                {"$set": {"salt_password": new_salted_password, "salt": salt}})
        return jsonify({"result": "Pass"})


@profile.route('/<user_name>/profile/nickname', methods=['POST'])
def change_nickname(user_name):
    data = request.get_json()
    new_nickname = data['newName']
    UserDB.update_one({"username": user_name}, {
                           "$set": {"name": new_nickname}})
    return jsonify({"result": "Pass"})


@profile.route('/<user_name>/profile/icon', methods=['POST'])
def change_icon(user_name):
    data = request.get_json()
    print(str(data))
    new_icon = data['icon']
    ImageDB.update_one({"username": user_name},
                           {"$set": {"icon": new_icon}})
    return jsonify({"result": "Pass"})