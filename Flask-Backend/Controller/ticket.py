from flask import Flask
from flask_socketio import SocketIO
from .database import db

app = Flask(__name__)
# app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")
UserDB = db

@socketio.on("AddedTask", namespace='/main')
def handle_message(data):
    print('received message: ' + str(data))



@socketio.on('json')
def handle_message(data):
    print('received messageabc: ' + str(data))


if __name__ == '__main__':
    print("websocket is running")
    socketio.run(app, host="127.0.0.1", port=2000)
