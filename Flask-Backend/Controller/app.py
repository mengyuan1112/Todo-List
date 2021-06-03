from flask import Flask
from flask_cors import CORS
from .logReg import logReg
from .profile import profile
from .ticket import ticket
from flask_socketio import SocketIO


app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
app.register_blueprint(logReg)
app.register_blueprint(profile)
app.register_blueprint(ticket)


CORS(app)

if __name__ == '__main__':
    socketio.run(app)
