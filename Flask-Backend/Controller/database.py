from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.Todo_list
TicketDB = db.ticket
UserDB = db.user
GoogleDB = db.google
ImageDB = db.image
FriendsDB = db.friend
