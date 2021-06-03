# if websocket is not connect try to uninstall socket then install again

from datetime import date
from flask import Flask
from flask_socketio import SocketIO, send

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.Todo_list

app = Flask(__name__)
# app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")
UserDB = db

# print(date.today())


@socketio.on("AddedTask", namespace='/main')
def add_task(data):
    # print(data)
    user_info = UserDB.user.find_one({"username": data['username']})
    user, title, content, deadline_date, deadline_time, create_date, create_time = parsing_task(
        data)

    ticket = {"create_time": create_time, "title": title, "content": content,
              "date": deadline_date, "time": deadline_time}
    self_ticket = user_info['self_ticket']  # {}

    if create_date in self_ticket.keys():
        ticket_arr = self_ticket[create_date]
        ticket_arr.append(ticket)
        ticket_dic = {create_date: ticket_arr}
        UserDB.user.update_one({"username": data['username']},
                               {"$set": {"self_ticket": ticket_dic}})
    else:
        ticket_dic = {create_date: [ticket]}
        UserDB.user.update_one({"username": data['username']},
                               {"$set": {"self_ticket": ticket_dic}})
    # database - self_ticket: {date: [{},{},{}]}
    send(data, broadcast=False)


@socketio.on("deleteTaskFromTodo", namespace='/main')
def delete_task(data):
    user, title, content, deadline_date, deadline_time, create_date, create_time = parsing_task(
        data)
    user_info = UserDB.user.find_one({"username": user})
    self_ticket = user_info['self_ticket']
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
    user_info = UserDB.user.find_one({"username": user})
    complete_arr = user_info['complete_ticket'][create_date]
    for i in range(0, len(complete_arr)):
        if complete_arr[i]["title"] == title:
            del complete_arr[i]
            break
    if len(complete_arr) == 0:
        complete_ticket = user_info['complete_ticket']
        complete_ticket.pop(create_date)
        UserDB.user.update_one({"username": user},
                               {"$set": {"complete_ticket": complete_ticket}})
        return
    UserDB.user.update_one({"username": user},
                           {"$set": {"complete_ticket": {create_date: complete_arr}}})
    return


@socketio.on("moveFromToDoToFinish", namespace='/main')
def move_from_todo_to_finish(data):
    user, title, content, deadline_date, deadline_time, create_date, create_time = parsing_task(data)
    user_info = UserDB.user.find_one({"username": user})
    self_ticket = user_info['self_ticket']
    ticket_arr = self_ticket[create_date]
    complete_ticket = user_info['complete_ticket']  # {}

    for i in range(0, len(ticket_arr)):
        if ticket_arr[i]['title'] == title:
            if create_date in complete_ticket.keys():
                # database - self_ticket: {date: [{},{},{}]}
                complete_arr = complete_ticket[create_date]
                complete_arr.append(ticket_arr[i])
                UserDB.user.update_one({"username": user},
                                       {"$set": {"complete_ticket": {create_date: complete_arr[i]}}})
            else:
                UserDB.user.update_one({"username": user},
                                       {"$set": {"complete_ticket": {create_date: [ticket_arr[i]]}}})

            del ticket_arr[i]
            update_ticket_arr(create_date, ticket_arr, user)
            break
    return


@socketio.on("moveFromFinishToTodo", namespace='/main')
def move_from_finish_to_todo(data):
    user, title, content, deadline_date, deadline_time, create_date, create_time = parsing_task(data)
    user_info = UserDB.user.find_one({"username": user})
    complete_arr = user_info['complete_ticket'][create_date]
    ticket_arr = []
    if create_date in user_info['self_ticket'].keys():
        ticket_arr = user_info['self_ticket'][create_date]
    for i in range(0, len(complete_arr)):
        if complete_arr[i]["title"] == title:
            ticket_arr.append(complete_arr[i])
            del complete_arr[i]
            break
    if len(complete_arr) == 0:
        complete_dic = UserDB.user.find_one({"username": user})['complete_ticket']
        complete_dic.pop(create_date)
        UserDB.user.update_one({"username": user},
                               {"$set": {"complete_ticket": complete_dic}})
    else:
        UserDB.user.update_one({"username": user},
                               {"$set": {"complete_ticket": {create_date: complete_arr}}})
    UserDB.user.update_one({"username": user},
                           {"$set": {"self_ticket": {create_date: ticket_arr}}})
    return


# getData
# EditTaskContent



def parsing_task(data):
    data_time_arr = data['currentDate'].split("T")
    create_date = data_time_arr[0]
    create_time = data_time_arr[1]
    user, title, content, deadline_date, deadline_time = \
        data['username'], data['title'], data['content'], data['date'], data['time']
    return user, title, content, deadline_date, deadline_time, create_date, create_time


def update_ticket_arr(create_date, ticket_arr, user):
    if len(ticket_arr) == 0:
        self_ticket = UserDB.user.find_one({"username": user})['self_ticket']
        self_ticket.pop(create_date)
        UserDB.user.update_one({"username": user},
                               {"$set": {"self_ticket": self_ticket}})
        return
    ticket_dic = {create_date: ticket_arr}
    UserDB.user.update_one({"username": user},
                           {"$set": {"self_ticket": ticket_dic}})
    return


if __name__ == '__main__':
    print("websocket is running")
    socketio.run(app, host="localhost", port=2000)
