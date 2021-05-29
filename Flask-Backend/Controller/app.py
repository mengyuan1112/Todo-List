from flask import Flask
from flask_cors import CORS
from .logReg import logReg
from .profile import profile

app = Flask("__main__")

app.register_blueprint(logReg)
app.register_blueprint(profile)

CORS(app)
