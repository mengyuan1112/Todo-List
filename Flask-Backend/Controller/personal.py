from flask import jsonify
from flask import Blueprint
from .database import FriendsDB
from .database import ImageDB
from .database import clients


personal = Blueprint('personal', __name__)


@personal.route('/<user_name>/friend', methods=['GET'])
def get_friend(user_name):
    user_friends_list = FriendsDB.find_one({"username": user_name})['friends']
    friend_list = []
    for friend in user_friends_list:
        friend_photo = ImageDB.find_one({"username": friend})['icon']
        if friend in clients:
            friend_status = {"friendName": friend, "friendPhoto": friend_photo, "friendStatus": True}
            friend_list.append(friend_status)
        else:
            friend_status = {"friendName": friend, "friendPhoto": friend_photo, "friendStatus": False}
            friend_list.append(friend_status)
    return jsonify({"user_name": user_name, "friend_list": friend_list})
