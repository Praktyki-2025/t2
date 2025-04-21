from flask import Blueprint, jsonify, request
from blueprints.user import User, USERS
from datetime import datetime
import uuid as uuid_lib

payment_bp = Blueprint('payment', __name__)

class Payment:
    def __init__(self, user: User, amount: float, timestamp: datetime, uuid: uuid_lib.UUID = None):
        self.uuid = uuid or uuid_lib.uuid4()
        self.user = user
        self.amount = amount
        self.timestamp = timestamp
    
    def serialize(self) -> dict:
        return {
            "uuid": str(self.uuid),
            "user": self.user.email,
            "amount": self.amount,
            "timestamp": self.timestamp.isoformat()
        }

    def deserialize(data: dict) -> 'Payment' | None:
        try:
            uuid_str = data['uuid']
            uuid = uuid_lib.UUID(uuid_str)
            user = User.get_user_from_token(USERS, data['user'])
            if user is None:
                return None
            amount = float(data['amount'])
            timestamp = datetime.fromisoformat(data['timestamp'])
            return Payment(user, amount, timestamp, uuid)
        except (KeyError, ValueError):
            return None

PAYMENTS: list[Payment] = []

@payment_bp.route('/all', methods=['POST'])
def get_all_payments():
    """
    Get all payments made by the user.
    This endpoint requires a token to identify the user.
    """
    data = request.get_json()
    
    if not data or 'token' not in data:
        return jsonify({"message": "Bad request", "code": 400}), 400
    
    token = data['token']
    user: User = User.get_user_from_token(USERS, token)
    
    if user is None:
        return jsonify({"message": "User not found", "code": 404}), 404
    
    payments = [payment.serialize() for payment in PAYMENTS if payment.user.email == user.email]
    
    return jsonify({"payments": payments, "code": 200}), 200

@payment_bp.route('/', methods=['POST'])
def create_payment():
    """
    Create a new payment.
    This endpoint requires a token to identify the user and an amount for the payment.
    """
    data = request.get_json()
    
    if not data or 'token' not in data or 'amount' not in data:
        return jsonify({"message": "Bad request", "code": 400}), 400
    
    token = data['token']
    amount = data['amount']
    
    user: User = User.get_user_from_token(USERS, token)
    
    if user is None:
        return jsonify({"message": "User not found", "code": 404}), 404
    
    payment = Payment(user, amount, datetime.now())
    PAYMENTS.append(payment)
    
    return jsonify({"message": "Payment created", "payment": payment.serialize(), "code": 201}), 201

@payment_bp.route('/', methods=['DELETE'])
def delete_payment():
    """
    Delete a payment.
    This endpoint requires a token to identify the user and a UUID for the payment.
    """
    data = request.get_json()
    
    if not data or 'token' not in data or 'uuid' not in data:
        return jsonify({"message": "Bad request", "code": 400}), 400
    
    token = data['token']
    uuid_str = data['uuid']
    
    user: User = User.get_user_from_token(USERS, token)
    
    if user is None:
        return jsonify({"message": "User not found", "code": 404}), 404
    
    payment: Payment | None = next((p for p in PAYMENTS if str(p.uuid) == uuid_str and p.user.email == user.email), None)
    
    if payment is None:
        return jsonify({"message": "Payment not found", "code": 404}), 404
    
    PAYMENTS.remove(payment)
    
    return jsonify({"message": "Payment deleted", "code": 200}), 200

@payment_bp.route('/', methods=['PUT'])
def update_payment():
    """
    Update a payment.
    This endpoint requires a token to identify the user and a UUID for the payment.
    """
    data = request.get_json()
    
    if not data or 'token' not in data or 'uuid' not in data or 'amount' not in data or 'timestamp' not in data:
        return jsonify({"message": "Bad request", "code": 400}), 400
    
    token = data['token']
    uuid_str = data['uuid']
    amount = data['amount']
    timestamp = data['timestamp']
    
    user: User = User.get_user_from_token(USERS, token)
    
    if user is None:
        return jsonify({"message": "User not found", "code": 404}), 404
    
    payment: Payment | None = next((p for p in PAYMENTS if str(p.uuid) == uuid_str and p.user.email == user.email), None)
    
    if payment is None:
        return jsonify({"message": "Payment not found", "code": 404}), 404
    
    payment.amount = amount
    payment.timestamp = datetime.fromisoformat(timestamp)
    
    return jsonify({"message": "Payment updated", "payment": payment.serialize(), "code": 200}), 200