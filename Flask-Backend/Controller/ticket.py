from datetime import date
from flask import Blueprint
# from .database import db
from flask import request, jsonify
from .database import UserDB, TicketDB, GoogleDB, ImageDB

ticket = Blueprint("ticket", __name__)
# UserDB = db


@ticket.route("/<username>/main", methods=['GET'])
def hello(username):
    today = str(date.today())

    ticket_info = TicketDB.find_one({"username": username})
    today_self_ticket = []
    if today in ticket_info['self_ticket'].keys():
        today_self_ticket = ticket_info['self_ticket'][today]

    today_complete_ticket = []
    if today in ticket_info['complete_ticket'].keys():
        today_complete_ticket = ticket_info['complete_ticket'][today]

    today_shared_ticket = []
    if today in ticket_info['public_ticket'].keys():
        today_shared_ticket = ticket_info['public_ticket'][today]

    document = {"todo": today_self_ticket,
                "finishedList": today_complete_ticket, "sharedList": today_shared_ticket}
    # print(document)
    print(str(document))
    return jsonify(document)
