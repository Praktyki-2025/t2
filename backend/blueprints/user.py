from flask import Blueprint, jsonify, request
from base64 import b64encode, b64decode

user_bp = Blueprint('user', __name__)

class User:
    def __init__(self, email: str, password: str):
        self.email = email
        self.password = password
    
    def create_user(email: str, password: str) -> 'User':
        return User(email, User.get_password_hash(password))
    
    def check_password(self, password: str) -> bool:
        return self.password == User.get_password_hash(password)
    
    def get_password_hash(self, password: str) -> str:
        return b64encode(password.encode()).decode()

    def get_token(self) -> str:
        return b64encode(f"{self.email}".encode()).decode()
    
    def get_user_from_token(users: list['User'], token: str) -> 'User' | None:
        email = b64decode(token.encode()).decode()
        for user in users:
            if user.email == email:
                return user
        return None

USERS: list[User] = []

@user_bp.route('/', methods=['POST'])
def register():
    """
    Register a new user in the system.
    The user must provide an email and a password.
    """
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"message": "Bad request", "code": 400}), 400
    
    email = data['email']
    password = data['password']

    for _u in USERS:
        if _u.email == email:
            return jsonify({"message": "User already exists", "code": 409}), 409
        
    user = User.create_user(email, password)
    USERS.append(user)
    return jsonify({"message": "User created", "code": 201}), 201

@user_bp.route('/login', methods=['POST'])
def login():
    """
    Login a user and return a token.
    This endpoint requires the user's email and password to return token.
    """
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"message": "Bad request", "code": 400}), 400
    
    email = data['email']
    password = data['password']

    for _u in USERS:
        if _u.email == email and _u.check_password(password):
            token = _u.get_token()
            return jsonify({"message": "Login successful", "code": 200, "token": token}), 200
    return jsonify({"message": "Invalid credentials", "code": 401}), 401


@user_bp.route('/', methods=['PUT'])
def update():
    """
    Update a user's email or password.
    This endpoint requires a token to identify the user to be updated.
    """
    data = request.get_json()

    if not data or 'token' not in data or ('password' not in data and 'email' not in data):
        return jsonify({"message": "Bad request", "code": 400}), 400
    
    user: User = User.get_user_from_token(USERS, data['token'])
    
    if user is None:
        return jsonify({"message": "Invalid token", "code": 401}), 401
    
    new_email = data['email']
    new_password = data['password']

    if new_email:
        for _u in USERS:
            if _u.email == new_email:
                return jsonify({"message": "Email already exists", "code": 409}), 409
    USERS.remove(user)

    user = User.create_user(new_email if new_email else user.email, new_password if new_password else user.password)

    USERS.append(user)

    return jsonify({"message": "User updated", "code": 200}), 200

@user_bp.route('/', methods=['DELETE'])
def delete():
    """
    Delete a user from the system.
    This endpoint requires a token to identify the user to be deleted.
    """
    data = request.get_json()

    if not data or 'token' not in data:
        return jsonify({"message": "Bad request", "code": 400}), 400
    
    user: User = User.get_user_from_token(USERS, data['token'])

    if user is None:
        return jsonify({"message": "Invalid token", "code": 401}), 401
    
    USERS.remove(user)

    return jsonify({"message": "User deleted", "code": 200}), 200