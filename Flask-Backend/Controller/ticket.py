from datetime import date
from flask import Blueprint
from .database import db
from flask import request, jsonify

ticket = Blueprint("ticket", __name__)
UserDB = db


@ticket.route("/<username>/main", methods=['GET'])
def hello(username):
    today = str(date.today())
    user_info = UserDB.user.find_one({"username": username})
    today_self_ticket = {}
    if today in user_info['self_ticket'].keys():
        today_self_ticket = user_info['self_ticket'][today]

    today_complete_ticket = {}
    if today in user_info['complete_ticket'].keys():
        today_self_ticket = user_info['complete_ticket'][today]

    today_shared_ticket = {}
    if today in user_info['public_ticket'].keys():
        today_self_ticket = user_info['public_ticket'][today]

    document = {"todo": today_self_ticket, "finishedList": today_complete_ticket, "sharedList": today_shared_ticket}
    return jsonify(document)