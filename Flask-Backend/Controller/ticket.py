from flask import Flask
from flask_socketio import SocketIO, send

from flask import Blueprint

from pymongo import MongoClient
#client = MongoClient()
client = MongoClient('localhost', 27017)
db = client.Todo_list


app = Flask(__name__)
# app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")
UserDB = db.db


@socketio.on("AddedTask", namespace='/main')
def add_task(data):
    user_info = UserDB.user.find_one({"username": data['username']})
    user, title, content, deadline_date, deadline_time, create_date, create_time = parsing_task(
        data)

    ticket = {"create_time": create_time, "title": title, "content": content,
              "date": deadline_date, "time": deadline_time}
    print(ticket)

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
    print(type(data['currentDate']))
    print(str(data))
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
            ticket_dic = {create_date: ticket_arr}
            UserDB.user.update_one({"username": data['username']},
                                   {"$set": {"self_ticket": ticket_dic}})
            break
    send(data, broadcast=False)


# TODO
@socketio.on("deleteTaskFromFinished", namespace='/main')
def delete_task_from_finished(data):
    return 1


@socketio.on("")
def parsing_task(data):
    data_time_arr = data['currentDate'].split("T")
    create_date = data_time_arr[0]
    create_time = data_time_arr[1]
    user, title, content, deadline_date, deadline_time = \
        data['username'], data['title'], data['content'], data['date'], data['time']
    return user, title, content, deadline_date, deadline_time, create_date, create_time


if __name__ == '__main__':
    print("websocket is running")
    socketio.run(app, host="localhost", port=2000, debug=True)
