class User:
    def __init__(self, name, password, email, hash_code):
        self.name = name
        self.password = password
        self.email = email
        self.hash = hash_code
        self.ticket_list = []

    def get_name(self):
        return self.name

    def get_password(self):
        return self.password

    def get_email(self):
        return self.email

    def update_password(self, new_password):
        self.password = new_password
        return

    def update_name(self, new_name):
        self.name = new_name
        return

    def add_ticket(self, ticket):
        self.ticket_list.append(ticket)
        return
