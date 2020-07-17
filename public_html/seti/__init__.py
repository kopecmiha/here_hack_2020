from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_mail import Mail
seti = Flask(__name__, static_folder="assets")
seti.config.from_object(Config)
db = SQLAlchemy(seti)
migrate = Migrate(seti, db)




from seti import routes, models