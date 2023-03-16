from logging import debug
from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
import logReg
import profile
import ticket
import personal
import logging
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)


app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
app.register_blueprint(logReg.logReg)
app.register_blueprint(profile.profile)
app.register_blueprint(ticket.ticket )
app.register_blueprint(personal.personal)
print("socket started ... ...")


CORS(app)

if __name__ == '__main__':
    socketio.run(app)

