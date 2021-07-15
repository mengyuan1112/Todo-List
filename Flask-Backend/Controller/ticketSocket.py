# if websocket is not connect try to uninstall socket then install again

from flask import request
from flask_socketio import send, emit, join_room
from app import socketio
from .database import TicketDB, FriendsDB, ImageDB
from .database import clients, friends_clients
# clients = {}

# Done


@socketio.on("onlineUser", namespace='/main')
def online_user(data):
    clients[data["username"]] = request.sid
    join_room(request.sid)
    print("The username", data["username"],
          " has join.Their SID is : ", request.sid)
    friend_list = FriendsDB.find_one({"username": data["username"]})["friends"]
    for friend in friend_list:
        if friend in friends_clients:

            emit("userStatus", {
                "friendName": data["username"], "friendPhoto": ImageDB.find_one({"username": data['username']})['icon'], "friendStatus": True}, namespace='/friends',to=friends_clients[friend])

        if friend in clients:
            emit("userStatus", {
                "friendName": data["username"], "friendPhoto": ImageDB.find_one({"username": data['username']})['icon'], "friendStatus": True}, namespace='/friends',to=clients[friend])
    return


@socketio.on("AddedTask", namespace='/main')
def add_task(data):
    print(data)
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
              "date": deadline_date, "time": deadline_time, "range": data['range']}
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
    # emit('AddedTask', data, broadcast=True)

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
              "date": deadline_date, "time": deadline_time, "sharedWith": friends, "completed": [], "status": False}
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
                  "date": deadline_date, "time": deadline_time, "friends": friends}
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
    user, title, friends, content, deadline_date, deadline_time, create_date, create_time = parsing_shared_task(
        data)
    date_list = TicketDB.find_one({"username": user})[
        "complete_public_ticket"][create_date]
    complete_list = []
    for entry in date_list:
        if entry["title"] == title:
            complete_list = entry["completed"]
            break
    move_complete_2_public_ticket(user, create_date, title, complete_list,
                                  friends, data["creator"], "moveFromFinishToSharedList")
    for friend in friends:
        update_to_finished(friend, title, create_date, False)
    update_to_finished(data['creator'], title, create_date, False)
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
    ticket = {'username': creator, 'title': data['title'], 'content': data['content'],
              'date': data['date']}
    emit("receviedEditTask", {
         "oldTitle": data["oldTitle"], "updateTicket": ticket}, to=clients[creator])
    for friend in friends:
        ticket = {'username': friend,  'title': data['title'], 'content': data['content'],
                  'date': data['date']}
        if friend in clients:
            print("send to client: " + str(clients[friend]))
            emit("receviedEditTask", {
                 "oldTitle": data["oldTitle"], "updateTicket": ticket}, to=clients[friend])
        edit_shared_ticket(data, friend)
    return

# this is from del: {'useraname': '1', 'currentDate': '2021-07-04T22:51:31.662Z', 'content': '', 'create_time': '04:00:00.000Z', 'creator': '1', 'date': '', 'sharedWith': ['friend1'], 'time': '', 'title': 'asd'}


@socketio.on("finishedShareTask", namespace="/main")
def finished_share_task(data):
    print(data)
    user, title, friends, content, deadline_date, deadline_time, create_date, create_time = parsing_shared_task(
        data)
    date_list = TicketDB.find_one({"username": user})[
        "public_ticket"][create_date]
    complete_list = []
    for entry in date_list:
        if entry["title"] == title:
            complete_list = entry["completed"]
            break
    move_public_ticket_2_complete(
        user, create_date, title, complete_list, friends, data["creator"])
    return


# this is from undo: {'username': '1', 'currentDate': '2021-07-04T22:51:31.662Z', 'content': '', 'create_time': '04:00:00.000Z', 'creator': '1', 'date': '', 'sharedWith': ['friend1'], 'time': '', 'title': 'asd'}
@socketio.on("undoFinishedShareTask", namespace="/main")
def undo_finished_share_task(data):
    user, title, friends, content, deadline_date, deadline_time, create_date, create_time = parsing_shared_task(
        data)
    date_list = TicketDB.find_one({"username": user})[
        "complete_public_ticket"][create_date]
    complete_list = []
    for entry in date_list:
        if entry["title"] == title:
            complete_list = entry["completed"]
            break
    move_complete_2_public_ticket(
        user, create_date, title, complete_list, friends, data["creator"], "undoFinishedShareTask")
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


''' Shitty code don't change !! '''


def move_public_ticket_2_complete(user, date, title, complete_list, friend_list, creator):
    user_public_ticket = TicketDB.find_one({"username": user})['public_ticket']
    user_public_ticket_list = TicketDB.find_one(
        {"username": user})["public_ticket"][date]
    user_complete_ticket = TicketDB.find_one({"username": user})[
        'complete_public_ticket']
    if user != creator:
        if creator in complete_list:
            friend_complete_ticket = TicketDB.find_one({"username": creator})[
                'complete_public_ticket']
            friend_complete_ticket_list = TicketDB.find_one({"username": creator})[
                "complete_public_ticket"][date]
            for i in range(0, len(friend_complete_ticket_list)):
                if friend_complete_ticket_list[i]['title'] == title:
                    friend_complete_ticket_list[i]["completed"].append(user)
                    friend_complete_ticket[date] = friend_complete_ticket_list
                    TicketDB.update_one({"username": creator},
                                        {"$set": {"complete_public_ticket": friend_complete_ticket}})
                    emit("finishedShareTask",
                         friend_complete_ticket_list[i], to=clients[creator])
                    break
        else:
            friend_public_ticket = TicketDB.find_one(
                {"username": creator})["public_ticket"]
            friend_public_ticket_list = TicketDB.find_one({"username": creator})[
                "public_ticket"][date]
            for i in range(0, len(friend_public_ticket_list)):
                if friend_public_ticket_list[i]["title"] == title:
                    friend_public_ticket_list[i]["completed"].append(user)
                    friend_public_ticket[date] = friend_public_ticket_list
                    TicketDB.update_one({"username": creator},
                                        {"$set": {"public_ticket": friend_public_ticket}})
                    emit("finishedShareTask",
                         friend_public_ticket_list[i], to=clients[creator])
                    break

   # for user to update himself ticket
    for i in range(0, len(user_public_ticket_list)):
        if user_public_ticket_list[i]['title'] == title:
            complete_list = user_public_ticket_list[i]["completed"]
            complete_list.append(user)
            user_public_ticket_list[i]["completed"] = complete_list
            ticket = user_public_ticket_list[i]
            del user_public_ticket_list[i]
            if len(user_public_ticket_list) == 0:
                user_public_ticket.pop(date)
            else:
                user_public_ticket[date] = user_public_ticket_list
            if date in user_complete_ticket.keys():
                user_complete_ticket_list = user_complete_ticket[date]
                user_complete_ticket_list.append(ticket)
                user_complete_ticket[date] = user_complete_ticket_list
                TicketDB.update_one({"username": user},
                                    {"$set": {"complete_public_ticket": user_complete_ticket}})
            else:
                user_complete_ticket[date] = [ticket]
                TicketDB.update_one({"username": user},
                                    {"$set": {"complete_public_ticket": user_complete_ticket}})
            TicketDB.update_one({"username": user},
                                {"$set": {"public_ticket": user_public_ticket}})
            emit("finishedShareTask", ticket, to=clients[user])
            break

    # update friends ticket list
    for friend in friend_list:
        if friend in complete_list and user != friend:
            friend_complete_ticket = TicketDB.find_one({"username": friend})[
                'complete_public_ticket']
            friend_complete_ticket_list = TicketDB.find_one(
                {"username": friend})["complete_public_ticket"][date]
            for i in range(0, len(friend_complete_ticket_list)):
                if friend_complete_ticket_list[i]['title'] == title:
                    friend_complete_ticket_list[i]["completed"].append(user)
                    friend_complete_ticket[date] = friend_complete_ticket_list
                    TicketDB.update_one({"username": friend},
                                        {"$set": {"complete_public_ticket": friend_complete_ticket}})
                    emit("finishedShareTask",
                         friend_complete_ticket_list[i], to=clients[friend])
                    break

        elif friend in friend_list and user != friend:
            friend_public_ticket = TicketDB.find_one(
                {"username": friend})["public_ticket"]
            friend_public_ticket_list = TicketDB.find_one({"username": friend})[
                "public_ticket"][date]
            for i in range(0, len(friend_public_ticket_list)):
                if friend_public_ticket_list[i]["title"] == title:
                    friend_public_ticket_list[i]["completed"].append(user)
                    friend_public_ticket[date] = friend_public_ticket_list
                    TicketDB.update_one({"username": friend},
                                        {"$set": {"public_ticket": friend_public_ticket}})
                    emit("finishedShareTask",
                         friend_public_ticket_list[i], to=clients[friend])
                    break
    check_complete = TicketDB.find_one({"username": user})[
        'complete_public_ticket'][date]
    for t in check_complete:
        if t['title'] == title:
            friends = t['sharedWith']
            complete = t['completed']
            if len(complete) == len(friends)+1:
                update_to_finished(creator, title, date, True)
                if creator in clients:
                    emit("completeTaskByAll", {
                         "username": creator, "task": t}, to=clients[creator])
                for f in friends:
                    if f in clients:
                        emit("completeTaskByAll", {
                             "username": f, "task": t}, to=clients[f])
                    update_to_finished(f, title, date, True)
            break


''' Shitty code don't change !! '''


def move_complete_2_public_ticket(user, date, title, complete_list, friend_list, creator, event):
    user_public_ticket = TicketDB.find_one({"username": user})['public_ticket']
    # user_public_ticket_list = TicketDB.find_one({"username": user})["public_ticket"][date]
    user_complete_ticket = TicketDB.find_one({"username": user})[
        'complete_public_ticket']
    user_complete_ticket_list = TicketDB.find_one(
        {"username": user})['complete_public_ticket'][date]
    if user != creator:
        if creator in complete_list:
            friend_complete_ticket = TicketDB.find_one({"username": creator})[
                'complete_public_ticket']
            friend_complete_ticket_list = TicketDB.find_one({"username": creator})[
                "complete_public_ticket"][date]
            for i in range(0, len(friend_complete_ticket_list)):
                if friend_complete_ticket_list[i]['title'] == title:
                    creator_list = friend_complete_ticket_list[i]["completed"]
                    for j in range(0, len(creator_list)):
                        if creator_list[j] == user:
                            del creator_list[j]
                            break
                    friend_complete_ticket_list[i]["completed"] = creator_list
                    friend_complete_ticket[date] = friend_complete_ticket_list
                    TicketDB.update_one({"username": creator},
                                        {"$set": {"complete_public_ticket": friend_complete_ticket}})
                    emit(event, {
                         "ticket": friend_complete_ticket_list[i], "complete": True}, to=clients[creator])
                    break
        else:
            friend_public_ticket = TicketDB.find_one(
                {"username": creator})["public_ticket"]
            friend_public_ticket_list = TicketDB.find_one({"username": creator})[
                "public_ticket"][date]
            for i in range(0, len(friend_public_ticket_list)):
                if friend_public_ticket_list[i]["title"] == title:
                    creator_list_1 = friend_public_ticket_list[i]["completed"]
                    for j in range(0, len(creator_list_1)):
                        if creator_list_1[j] == user:
                            del creator_list_1[j]
                            break
                    friend_public_ticket_list[i]["completed"] = creator_list_1
                    friend_public_ticket[date] = friend_public_ticket_list
                    TicketDB.update_one({"username": creator},
                                        {"$set": {"public_ticket": friend_public_ticket}})
                    emit(event, {
                         "ticket": friend_public_ticket_list[i], "complete": False}, to=clients[creator])
                    break

    # for user to update himself ticket
    for i in range(0, len(user_complete_ticket_list)):
        if user_complete_ticket_list[i]['title'] == title:
            complete_list_1 = user_complete_ticket_list[i]["completed"]
            for j in range(0, len(complete_list_1)):
                if complete_list_1[j] == user:
                    del complete_list_1[j]
                    break
            user_complete_ticket_list[i]["completed"] = complete_list_1
            ticket = user_complete_ticket_list[i]
            del user_complete_ticket_list[i]
            # print("this is cur list: " + str(user_complete_ticket_list))
            if len(user_complete_ticket_list) == 0:
                user_complete_ticket.pop(date)
            else:
                user_complete_ticket[date] = user_complete_ticket_list
            if date in user_public_ticket.keys():
                user_public_ticket_list = user_public_ticket[date]
                user_public_ticket_list.append(ticket)
                user_public_ticket[date] = user_public_ticket_list
                TicketDB.update_one({"username": user},
                                    {"$set": {"public_ticket": user_public_ticket}})
            else:
                user_public_ticket[date] = [ticket]
                TicketDB.update_one({"username": user},
                                    {"$set": {"public_ticket": user_public_ticket}})
            TicketDB.update_one({"username": user},
                                {"$set": {"complete_public_ticket": user_complete_ticket}})
            emit(event, {"ticket": ticket, "complete": False},
                 to=clients[user])
            break

    # update friends ticket list
    for friend in friend_list:
        if friend in complete_list and user != friend:
            friend_complete_ticket = TicketDB.find_one({"username": friend})[
                'complete_public_ticket']
            friend_complete_ticket_list = TicketDB.find_one(
                {"username": friend})["complete_public_ticket"][date]
            for i in range(0, len(friend_complete_ticket_list)):
                if friend_complete_ticket_list[i]['title'] == title:
                    complete_list_2 = friend_complete_ticket_list[i]["completed"]
                    for j in range(0, len(complete_list_2)):
                        if complete_list_2[j] == user:
                            del complete_list_2[j]
                            break
                    friend_complete_ticket_list[i]["completed"] = complete_list_2
                    friend_complete_ticket[date] = friend_complete_ticket_list
                    TicketDB.update_one({"username": friend},
                                        {"$set": {"complete_public_ticket": friend_complete_ticket}})
                    emit(event, {
                         "ticket": friend_complete_ticket_list[i], "complete": True}, to=clients[friend])
                    break

        elif friend in friend_list and user != friend:
            friend_public_ticket = TicketDB.find_one(
                {"username": friend})["public_ticket"]
            friend_public_ticket_list = TicketDB.find_one({"username": friend})[
                "public_ticket"][date]
            for i in range(0, len(friend_public_ticket_list)):
                if friend_public_ticket_list[i]["title"] == title:
                    todo_list_1 = friend_public_ticket_list[i]["completed"]
                    for j in range(0, len(todo_list_1)):
                        if todo_list_1[j] == user:
                            del todo_list_1[j]
                            break
                    friend_public_ticket_list[i]["completed"] = todo_list_1
                    friend_public_ticket[date] = friend_public_ticket_list
                    TicketDB.update_one({"username": friend},
                                        {"$set": {"public_ticket": friend_public_ticket}})
                    emit(event, {
                         "ticket": friend_public_ticket_list[i], "complete": False}, to=clients[friend])
                    break

    return


def update_to_finished(user, title, date, status):
    complete_ticket = TicketDB.find_one({"username": user})[
        'complete_public_ticket']
    complete_ticket_list = TicketDB.find_one({"username": user})[
        "complete_public_ticket"][date]
    for i in range(0, len(complete_ticket_list)):
        if complete_ticket_list[i]['title'] == title:

            complete_ticket_list[i]["status"] = status
            complete_ticket[date] = complete_ticket_list
            TicketDB.update_one({"username": user},
                                {"$set": {"complete_public_ticket": complete_ticket}})
