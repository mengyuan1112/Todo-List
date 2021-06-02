from flask import Flask
from flask_cors import CORS
from .logReg import logReg
from .profile import profile
#from .ticket import ticket


app = Flask("__name__")

app.register_blueprint(logReg)
app.register_blueprint(profile)
# app.register_blueprint(ticket)


CORS(app)
