from flask import Flask, request
import re

app = Flask(__name__)
regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'  # Regex for check email validation


@app.route('/register', methods=['POST'])
def register():
    """
    :return: String with content "pass" and other
    """
    data = request.get_json()
    if not valid_pwd(data['password']):
        return "The password is not satisfied categories"
    if not re.search(regex, data['email']):
        return "The email is not valid"
    return "pass"


def valid_pwd(pwd):
    """
        Check the password is valid in categories.
        @:param pwd: String
        @special Character: [',', '.', '!', '@', '#', '$', '%', '^', '&', '*']
    """
    n = len(pwd)
    spec_list = [',', '.', '!', '@', '#', '$', '%', '^', '&', '*']
    up_case, low_case, num, special_char = False, False, False, False
    if n < 8:
        return False
    for i in pwd:
        if i.isupper:
            up_case = True
        if i.islower:
            low_case = True
        if i.isdigit():
            num = True
        if i in spec_list:
            special_char = True
    return up_case and low_case and num and special_char

@app.route('/login', methods=['POST'])
def login():
    """
    :return: String with content "pass" and other
    """


if __name__ == "__main__":
    app.run()
