# if websocket is not connect try to uninstall socket then install again

from datetime import date
from flask import Flask
from flask_socketio import SocketIO, send
from .app import socketio
from pymongo import MongoClient
from .database import UserDB, TicketDB, GoogleDB, ImageDB

# client = MongoClient('localhost', 27017)
# db = client.Todo_list
#
# app = Flask(__name__)
# UserDB = db



@socketio.on("AddedTask", namespace='/main')
def add_task(data):
    print(data)
    ticket_info = TicketDB.find_one({"username": data['username']})
    user, title, content, deadline_date, deadline_time, create_date, create_time = parsing_task(
        data)

    ticket = {"create_time": create_time, "title": title, "content": content,
              "date": deadline_date, "time": deadline_time}
    self_ticket = ticket_info['self_ticket']  # {}

    if create_date in self_ticket.keys():
        ticket_arr = self_ticket[create_date]
        ticket_arr.append(ticket)
        ticket_dic = {create_date: ticket_arr}
        TicketDB.update_one({"username": data['username']},
                            {"$set": {"self_ticket": ticket_dic}})
    else:
        ticket_dic = {create_date: [ticket]}
        TicketDB.update_one({"username": data['username']},
                            {"$set": {"self_ticket": ticket_dic}})
    # database - self_ticket: {date: [{},{},{}]}
    send(data, broadcast=False)


@socketio.on("deleteTaskFromTodo", namespace='/main')
def delete_task(data):
    user, title, content, deadline_date, deadline_time, create_date, create_time = parsing_task(
        data)
    ticket_info = TicketDB.find_one({"username": user})
    self_ticket = ticket_info['self_ticket']
    ticket_arr = self_ticket[create_date]
    for i in range(0, len(ticket_arr)):
        if ticket_arr[i]['title'] == title:
            del ticket_arr[i]
            update_ticket_arr(create_date, ticket_arr, user)
            break
    send(data, broadcast=False)


@socketio.on("deleteTaskFromFinished", namespace='/main')
def delete_task_from_finished(data):

    user, title, content, deadline_date, deadline_time, create_date, create_time = parsing_task(data)
    ticket_info = TicketDB.find_one({"username": user})
    complete_arr = ticket_info['complete_ticket'][create_date]

    for i in range(0, len(complete_arr)):
        if complete_arr[i]["title"] == title:
            del complete_arr[i]
            break
    if len(complete_arr) == 0:
        complete_ticket = ticket_info['complete_ticket']
        complete_ticket.pop(create_date)
        TicketDB.update_one({"username": user},
                            {"$set": {"complete_ticket": complete_ticket}})
        return
    TicketDB.update_one({"username": user},
                        {"$set": {"complete_ticket": {create_date: complete_arr}}})
    return


@socketio.on("moveFromToDoToFinish", namespace='/main')
def move_from_todo_to_finish(data):

    user, title, content, deadline_date, deadline_time, create_date, create_time = parsing_task(data)
    ticket_info = TicketDB.find_one({"username": user})
    self_ticket = ticket_info['self_ticket']

    ticket_arr = self_ticket[create_date]
    complete_ticket = ticket_info['complete_ticket']  # {}

    for i in range(0, len(ticket_arr)):
        if ticket_arr[i]['title'] == title:
            if create_date in complete_ticket.keys():
                # database - self_ticket: {date: [{},{},{}]}
                complete_arr = complete_ticket[create_date]
                print("this is: " + str(complete_arr))
                complete_arr.append(ticket_arr[i])
                print("this is updated: " + str(complete_arr))
                TicketDB.update_one({"username": user},
                                    {"$set": {"complete_ticket": {create_date: complete_arr}}})
            else:
                TicketDB.update_one({"username": user},
                                    {"$set": {"complete_ticket": {create_date: [ticket_arr[i]]}}})

            del ticket_arr[i]
            update_ticket_arr(create_date, ticket_arr, user)
            break
    return


@socketio.on("moveFromFinishToTodo", namespace='/main')
def move_from_finish_to_todo(data):

    user, title, content, deadline_date, deadline_time, create_date, create_time = parsing_task(data)
    ticket_info = TicketDB.find_one({"username": user})
    complete_arr = ticket_info['complete_ticket'][create_date]

    ticket_arr = []
    if create_date in ticket_info['self_ticket'].keys():
        ticket_arr = ticket_info['self_ticket'][create_date]
    for i in range(0, len(complete_arr)):
        if complete_arr[i]["title"] == title:
            ticket_arr.append(complete_arr[i])
            del complete_arr[i]
            break
    if len(complete_arr) == 0:

        complete_dic = TicketDB.find_one({"username": user})['complete_ticket']

        complete_dic.pop(create_date)
        TicketDB.update_one({"username": user},
                            {"$set": {"complete_ticket": complete_dic}})
    else:
        TicketDB.update_one({"username": user},
                            {"$set": {"complete_ticket": {create_date: complete_arr}}})
    TicketDB.update_one({"username": user},
                        {"$set": {"self_ticket": {create_date: ticket_arr}}})
    return


@socketio.on("getData", namespace='/main')
def get_data(data):
    user_info = TicketDB.find_one({"username": data['username']})
    day = data['currentDate']
    self_ticket, complete_ticket, public_ticket = get_data_by_date(
        user_info, day)
    res = {"todo": self_ticket, "finishedList": complete_ticket,
           "sharedList": public_ticket}
    send(res, broadcast=False)


@socketio.on("EditTaskContent", namespace='/main')
def edit_task_content(data):
    print(data)
    user = data['username']
    data_time_arr = data['currentDate'].split("T")
    current_date = data_time_arr[0]
    old_title = data['oldTitle']
    new_title = data['title']
    content = data['content']
    deadline_date = data['date']
    deadline_time = data['time']

    self_ticket = TicketDB.find_one({"username": user})['self_ticket']
    self_ticket_arr = TicketDB.find_one({"username": user})['self_ticket'][current_date]

    for i in range(0, len(self_ticket_arr)):
        if self_ticket_arr[i]['title'] == old_title:
            self_ticket_arr[i]['title'] = new_title
            if len(content) != 0:
                self_ticket_arr[i]['content'] = content
            if len(deadline_time) != 0:
                self_ticket_arr[i]['time'] = deadline_time
            if len(deadline_date) != 0:
                self_ticket_arr[i]['date'] = deadline_date
            break
    self_ticket[current_date] = self_ticket_arr
    TicketDB.update_one({"username": user},
                        {"$set": {"self_ticket": self_ticket}})
    return


@socketio.on("AddedSharedTask", namespace='/main')



@socketio.on("deleteTaskFromShareList", namespace='/main')


@socketio.on("moveFromFinishToSharedList", namespace='/main')


@socketio.on("EditSharedTaskContent", namespace='/main')



def parsing_task(data):
    data_time_arr = data['currentDate'].split("T")
    create_date = data_time_arr[0]
    create_time = data_time_arr[1]
    user, title, content, deadline_date, deadline_time = \
        data['username'], data['title'], data['content'], data['date'], data['time']
    return user, title, content, deadline_date, deadline_time, create_date, create_time


def update_ticket_arr(create_date, ticket_arr, user):
    if len(ticket_arr) == 0:
        self_ticket = TicketDB.find_one({"username": user})['self_ticket']
        self_ticket.pop(create_date)
        TicketDB.update_one({"username": user},
                            {"$set": {"self_ticket": self_ticket}})
        return
    ticket_dic = {create_date: ticket_arr}
    TicketDB.update_one({"username": user},
                        {"$set": {"self_ticket": ticket_dic}})
    return


def get_data_by_date(user_info, day):
    self_ticket = []
    public_ticket = []
    complete_ticket = []
    if day in user_info['self_ticket'].keys():
        self_ticket = user_info['self_ticket'][day]
    if day in user_info['complete_ticket'].keys():
        self_ticket = user_info['complete_ticket'][day]
    if day in user_info['public_ticket'].keys():
        self_ticket = user_info['public_ticket'][day]
    return self_ticket, public_ticket, complete_ticket


# if __name__ == '__main__':
#     print("websocket is running")
#     socketio.run(app, host="localhost", port=2000)
