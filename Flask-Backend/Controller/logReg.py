import re
from flask import Flask, request
from flask_pymongo import PyMongo
import hashlib, os

app = Flask(__name__)
"""
    Database: Mongodb
    host: localhost
    port: 27017
    database name: Todo_list
    collection name: user
    DB document [name, salt_password, email, salt, self_ticket, public_ticket]
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
        return "The password is not satisfied categories"
    elif not re.search(regex, data['email']):
        return "The email is not valid"
    elif mongo.db.user.find_one({"email": data['email']}) is not None:
        return "The email already existed please sign in or change to another email"
    salt = os.urandom(32)  # reference: https://nitratine.net/blog/post/how-to-hash-passwords-in-python/
    salt_password = hashlib.pbkdf2_hmac('sha256', data['password'].encode('utf-8'), salt, 100000, 128)

    user_document = {"name": data['name'], "salt_password": salt_password, "email": data['email'],
                     "salt": salt, "self_ticket": [], "public_ticket": []}
    mongo.db.user.insert_one(user_document)
    return "pass"


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
    password = data['password']
    query = mongo.db.user.find_one({"email": data['email']})
    if query is None:
        return "The user is not existed"
    elif query['email'] == data['email']:
        new_salt_password = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), query['salt'], 100000)
        if new_salt_password != query['salt_password']:
            return "Password is wrong"
    return "pass"


if __name__ == "__main__":
    app.run()
