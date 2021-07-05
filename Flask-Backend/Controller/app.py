from logging import debug
from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from .logReg import logReg
from .profile import profile
from .ticket import ticket
from .personal import personal
import logging
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)


app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
app.register_blueprint(logReg)
app.register_blueprint(profile)
app.register_blueprint(ticket)
app.register_blueprint(personal)
print("socket started ... ...")


CORS(app)

if __name__ == '__main__':
    socketio.run(app)

