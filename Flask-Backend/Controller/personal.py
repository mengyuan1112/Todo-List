from flask import request, jsonify,json
from flask import Blueprint
from .database import FriendsDB


personal = Blueprint('personal', __name__)


@personal.route('/<user_name>/friend', methods=['GET'])
def get_friend(user_name):
    friend_list = FriendsDB.find_one({"username": user_name})["friends"]
    return jsonify({"username": user_name,"friend_list":friend_list})
