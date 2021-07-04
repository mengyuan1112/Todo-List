# if websocket is not connect try to uninstall socket then install again

from flask import request
from flask_socketio import send, emit, join_room
from .app import socketio
from .database import TicketDB


clients = {}

# Done


@socketio.on("onlineUser", namespace='/main')
def online_user(data):
    clients[data["username"]] = request.sid
    join_room(request.sid)
    print("The username", data["username"],
          " has join.Their SID is : ", request.sid)
    return


@socketio.on("AddedTask", namespace='/main')
def add_task(data):
    ticket_info = TicketDB.find_one({"username": data['username']})

    # test room
    # clients[data["username"]] = request.sid
    # print("sid is:" + str(request.sid))
    # room = session.get('room')
    # join_room(room)
    # test room

    user, title, content, deadline_date, deadline_time, create_date, create_time = parsing_task(
        data)
    ticket = {"create_time": create_time, "title": title, "content": content,
              "date": deadline_date, "time": deadline_time}
    self_ticket = ticket_info['self_ticket']  # {}

    if create_date in self_ticket.keys():
        ticket_arr = self_ticket[create_date]
        ticket_arr.append(ticket)
        self_ticket[create_date] = ticket_arr
        TicketDB.update_one({"username": data['username']},
                            {"$set": {"self_ticket": self_ticket}})
    else:
        self_ticket[create_date] = [ticket]
        TicketDB.update_one({"username": data['username']},
                            {"$set": {"self_ticket": self_ticket}})
    # database - self_ticket: {date: [{},{},{}]}
    emit('AddedTask', data, broadcast=True)

# Done


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

# Done


@socketio.on("deleteTaskFromFinished", namespace='/main')
def delete_task_from_finished(data):
    user, title, content, deadline_date, deadline_time, create_date, create_time = parsing_task(
        data)
    ticket_info = TicketDB.find_one({"username": user})
    complete_arr = ticket_info['complete_ticket'][create_date]
    complete_ticket = ticket_info['complete_ticket']
    for i in range(0, len(complete_arr)):
        if complete_arr[i]["title"] == title:
            del complete_arr[i]
            break
    if len(complete_arr) == 0:
        complete_ticket.pop(create_date)
        TicketDB.update_one({"username": user},
                            {"$set": {"complete_ticket": complete_ticket}})
        return
    complete_ticket[create_date] = complete_arr
    TicketDB.update_one({"username": user},
                        {"$set": {"complete_ticket": complete_ticket}})
    return

# Done


@socketio.on("moveFromToDoToFinish", namespace='/main')
def move_from_todo_to_finish(data):

    user, title, content, deadline_date, deadline_time, create_date, create_time = parsing_task(
        data)
    ticket_info = TicketDB.find_one({"username": user})
    self_ticket = ticket_info['self_ticket']

    ticket_arr = self_ticket[create_date]  # current day's array
    # entire complete ticket {}
    complete_ticket = ticket_info['complete_ticket']

    for i in range(0, len(ticket_arr)):
        if ticket_arr[i]['title'] == title:
            if create_date in complete_ticket.keys():
                # database - self_ticket: {date: [{},{},{}]}
                complete_arr = complete_ticket[create_date]
                complete_arr.append(ticket_arr[i])
                complete_ticket[create_date] = complete_arr
                TicketDB.update_one({"username": user},
                                    {"$set": {"complete_ticket":  complete_ticket}})
            else:
                complete_ticket[create_date] = [ticket_arr[i]]
                TicketDB.update_one({"username": user},
                                    {"$set": {"complete_ticket": complete_ticket}})

            del ticket_arr[i]
            update_ticket_arr(create_date, ticket_arr, user)
            break
    return

# Done


@socketio.on("moveFromFinishToTodo", namespace='/main')
def move_from_finish_to_todo(data):

    user, title, content, deadline_date, deadline_time, create_date, create_time = parsing_task(
        data)
    ticket_info = TicketDB.find_one({"username": user})
    # current date complete_array
    complete_arr = ticket_info['complete_ticket'][create_date]
    complete_ticket = ticket_info['complete_ticket']
    self_ticket = ticket_info['self_ticket']
    ticket_arr = []  # current date to do array
    if create_date in ticket_info['self_ticket'].keys():
        ticket_arr = ticket_info['self_ticket'][create_date]

    # update current date complete array and to do array
    for i in range(0, len(complete_arr)):
        if complete_arr[i]["title"] == title:
            ticket_arr.append(complete_arr[i])
            del complete_arr[i]
            break

    if len(complete_arr) == 0:
        complete_ticket.pop(create_date)
        TicketDB.update_one({"username": user},
                            {"$set": {"complete_ticket": complete_ticket}})
    else:
        complete_ticket[create_date] = complete_arr
        TicketDB.update_one({"username": user},
                            {"$set": {"complete_ticket": complete_ticket}})
    self_ticket[create_date] = ticket_arr
    TicketDB.update_one({"username": user},
                        {"$set": {"self_ticket": self_ticket}})
    return


@socketio.on("getData", namespace='/main')
def get_data(data):

    user_info = TicketDB.find_one({"username": data['username']})

    data_time_arr = data['currentDate'].split("T")
    create_date = data_time_arr[0]
    self_ticket, complete_ticket, public_ticket = get_data_by_date(
        user_info, create_date)
    res = {"todo": self_ticket, "finishedList": complete_ticket,
           "sharedList": public_ticket}
    emit('getData', res, broadcast=False)


@socketio.on("EditTaskContent", namespace='/main')
def edit_task_content(data):
    user = data['username']
    data_time_arr = data['currentDate'].split("T")
    current_date = data_time_arr[0]
    old_title = data['oldTitle']
    new_title = data['title']
    content = data['content']
    deadline_date = data['date']
    deadline_time = data['time']

    self_ticket = TicketDB.find_one({"username": user})['self_ticket']
    self_ticket_arr = TicketDB.find_one({"username": user})[
        'self_ticket'][current_date]

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


# {'username': '2', 'currentDate': '2021-06-09T04:00:00.000Z',
# 'sharedWith': ['friend 1', 'friend 2'], 'title': 'hello', 'content': '', 'date': '', 'time': ''}


@socketio.on("AddedSharedTask", namespace='/main')
def add_shared_task(data):
    #clients[data["username"]] = request.sid
    user, title, friends, content, deadline_date, deadline_time, create_date, create_time = parsing_shared_task(
        data)
    user_shared_tickets = TicketDB.find_one(
        {'username': user})['public_ticket']
    ticket = {"creator": user, "create_time": create_time, "title": title, "content": content,
              "date": deadline_date, "time": deadline_time, "sharedWith": friends}
    if create_date in user_shared_tickets.keys():
        ticket_list = user_shared_tickets[create_date]
        ticket_list.append(ticket)
        user_shared_tickets[create_date] = ticket_list
    else:
        user_shared_tickets[create_date] = [ticket]

    TicketDB.update_one({"username": user},
                        {"$set": {"public_ticket": user_shared_tickets}})
    print("this is current clients", str(clients))
    for client in friends:
        if client in clients:
            print("Sending message to username: ", client,
                  " and the SID is ", clients[client])
            TicketDB.update_one({"username": client},
                                {"$set": {"public_ticket": user_shared_tickets}})
            emit("receviedShareTask", ticket, to=clients[client])
    return

# {'username': '2', 'currentDate': '2021-06-09T04:00:00.000Z',
# 'sharedWith': ['friend 1', 'friend 2'], 'title': '123', 'content': '', 'date': '', 'time': '', 'createdBy': '2'}


# delete all ticket by creator / self-leave in ticket
'''
@:return: route = "deleteTaskFromShareList"
@:return: {"title": title} / {"ticket": ticket}
@:return ticket = {"creator": creator, "create_time": create_time, "title": title, "content": content,
                  "date": deadline_date, "time": deadline_time, "sharedWith": friends}
'''


@socketio.on("deleteTaskFromShareList", namespace='/main')
def delete_task_from_shared_list(data):
    print("this is from delete: " + str(data))
    user, title, friends, content, deadline_date, deadline_time, create_date, create_time = parsing_shared_task(
        data)
    creator = data['creator']
    if user == creator:
        del_public_ticket(user, title, create_date)
        for friend in friends:
            if friend in clients:
                emit("deleteTaskFromShareList", {
                     "title": title}, to=clients[friend])
            del_public_ticket(friend, title, create_date)
    else:
        del_public_ticket(user, title, create_date)
        for i in range(0, len(friends)):
            if friends[i] == user:
                del friends[i]
                break
        ticket = {"creator": creator, "create_time": create_time, "title": title, "content": content,
                  "date": deadline_date, "time": deadline_time, "sharedWith": friends}
        update_del_ticket(creator, create_date, title, ticket)
        if creator in clients:
            emit("deleteTaskFromShareList", {
                 "ticket": ticket}, to=clients[creator])
        for friend in friends:
            if friend in clients:
                update_del_ticket(friend, create_date, title, ticket)
                emit("deleteTaskFromShareList", {
                     "ticket": ticket}, to=clients[friend])
    return


# self-undo the ticket from shared ticket and
@socketio.on("moveFromFinishToSharedList", namespace='/main')
def move_from_finish_to_shared_list(data):
    print("this is from move to finished: " + str(data))
    return

# {'username': '2', 'currentDate': '2021-06-09T04:00:00.000Z', 'oldTitle': 'asd',
# 'sharedWith': ['friend 1'], 'title': 'aegina', 'content': '', 'date': '', 'time': ''}


# (everyone) able to edit content
'''
:return: route = "receviedEditTask"
:return: {"oldTitle": data["oldTitle"], "updateTicket": ticket}
:ticket = {'username': creator, 'currentDate': data['currentDate'], 'title': data['title'], 'content': data['content'],
                   'create_time': data['create_time'], 'date': data['date']}
:ticket = {'username': user, 'currentDate': data['currentDate'], 'title': data['title'], 'content': data['content'],
              'create_time': data['create_time'], 'date': data['date']}
'''


@socketio.on("EditSharedTaskContent", namespace='/main')
def edit_shared_task_content(data):
    print("this is edit stuff: " + str(data))
    friends = data["sharedWith"]
    creator = data["creator"]
    edit_shared_ticket(data, creator)
    ticket = {'username': creator, 'currentDate': data['currentDate'], 'title': data['title'], 'content': data['content'],
              'create_time': data['create_time'], 'date': data['date']}
    emit("receviedEditTask", {
         "oldTitle": data["oldTitle"], "updateTicket": ticket}, to=clients[creator])
    for friend in friends:
        ticket = {'username': friend, 'currentDate': data['currentDate'], 'title': data['title'], 'content': data['content'],
                  'create_time': data['create_time'], 'date': data['date']}
        if friend in clients:
            print("send to client: " + str(clients[friend]))
            emit("receviedEditTask", {
                 "oldTitle": data["oldTitle"], "updateTicket": ticket}, to=clients[friend])
        edit_shared_ticket(data, friend)
    return


def parsing_task(data):
    data_time_arr = data['currentDate'].split("T")
    create_date = data_time_arr[0]
    create_time = data_time_arr[1]
    user, title, content, deadline_date, deadline_time = \
        data['username'], data['title'], data['content'], data['date'], data['time']
    return user, title, content, deadline_date, deadline_time, create_date, create_time


def parsing_shared_task(data):
    data_time_arr = data['currentDate'].split("T")
    create_date = data_time_arr[0]
    create_time = data_time_arr[1]
    user, title, friends, content, deadline_date, deadline_time =\
        data['username'], data['title'], data['sharedWith'], data['content'], data['date'], data['time']
    return user, title, friends, content, deadline_date, deadline_time, create_date, create_time


def update_ticket_arr(create_date, ticket_arr, user):
    self_ticket = TicketDB.find_one({"username": user})['self_ticket']
    if len(ticket_arr) == 0:
        self_ticket.pop(create_date)
        TicketDB.update_one({"username": user},
                            {"$set": {"self_ticket": self_ticket}})
        return
    # ticket_dic = {create_date: ticket_arr}
    self_ticket[create_date] = ticket_arr
    TicketDB.update_one({"username": user},
                        {"$set": {"self_ticket": self_ticket}})
    return


def get_data_by_date(user_info, day):
    # print("the day is: " + str(day))
    self_ticket = []
    public_ticket = []
    complete_ticket = []
    if day in user_info['self_ticket'].keys():
        self_ticket = user_info['self_ticket'][day]
    if day in user_info['complete_ticket'].keys():
        complete_ticket = user_info['complete_ticket'][day]
    if day in user_info['public_ticket'].keys():
        public_ticket = user_info['public_ticket'][day]
    return self_ticket, complete_ticket,  public_ticket


def del_public_ticket(user, title, create_date):
    cur_public_ticket_list = TicketDB.find_one({"username": user})[
        'public_ticket'][create_date]
    for i in range(0, len(cur_public_ticket_list)):
        each_ticket = cur_public_ticket_list[i]
        if each_ticket['title'] == title:
            del cur_public_ticket_list[i]
            public_ticket = TicketDB.find_one({"username": user})[
                'public_ticket']
            if len(cur_public_ticket_list) == 0:
                public_ticket.pop(create_date)
            else:
                public_ticket[create_date] = cur_public_ticket_list
            TicketDB.update_one({"username": user},
                                {"$set": {"public_ticket": public_ticket}})
            return


def edit_shared_ticket(data, user):
    xx, title, friends, content, deadline_date, deadline_time, create_date, create_time = parsing_shared_task(
        data)
    old_title = data["oldTitle"]
    public_ticket = TicketDB.find_one({"username": user})['public_ticket']
    complete_public_ticket = TicketDB.find_one({"username": user})[
        'complete_public_ticket']

    ''' public '''
    if create_date in public_ticket.keys():
        public_ticket_list = TicketDB.find_one({"username": user})[
            'public_ticket'][create_date]
        for i in range(0, len(public_ticket_list)):
            if public_ticket_list[i]['title'] == old_title:
                public_ticket_list[i]['title'] = title
                if len(content) != 0:
                    public_ticket_list[i]['content'] = content
                if len(deadline_time) != 0:
                    public_ticket_list[i]['time'] = deadline_time
                if len(deadline_date) != 0:
                    public_ticket_list[i]['date'] = deadline_date
                public_ticket[create_date] = public_ticket_list
                TicketDB.update_one({"username": user},
                                    {"$set": {"public_ticket": public_ticket}})
                return
    ''' complete '''
    if create_date in complete_public_ticket.keys():
        complete_public_ticket_list = TicketDB.find_one(
            {"username": user})['complete_public_ticket'][create_date]
        for i in range(0, len(complete_public_ticket_list)):
            if complete_public_ticket_list[i]['title'] == old_title:
                complete_public_ticket_list[i]['title'] = title
                if len(content) != 0:
                    complete_public_ticket_list[i]['content'] = content
                if len(deadline_time) != 0:
                    complete_public_ticket_list[i]['time'] = deadline_time
                if len(deadline_date) != 0:
                    complete_public_ticket_list[i]['date'] = deadline_date
                complete_public_ticket[create_date] = public_ticket_list
                TicketDB.update_one({"username": user},
                                    {"$set": {"public_ticket": complete_public_ticket}})
                return


def update_del_ticket(user, create_date, title, ticket):
    public_ticket = TicketDB.find_one({"username": user})["public_ticket"]
    public_ticket_date = TicketDB.find_one({"username": user})[
        "public_ticket"][create_date]
    for i in range(0, len(public_ticket_date)):
        if public_ticket_date[i]["title"] == title:
            del public_ticket_date[i]
            public_ticket_date.append(ticket)
            public_ticket[create_date] = public_ticket_date
            TicketDB.update_one({"username": user},
                                {"$set": {"public_ticket": public_ticket}})


@socketio.on('Addedfriend', namespace='/friends')
def add_friends(data, tt):
    print(data)
    print("this is from ticket")
    return
