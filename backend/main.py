from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the Flask API!", "code": 200}), 200

@app.route('/api/tea', methods=['GET'])
def get_data():
    return jsonify({"message": "I'm a teapot", "code": 418}), 418

@app.errorhandler(404)
def not_found(e):
    return jsonify({"message": "Not found", "code": 404}), 404

if __name__ == '__main__':

    from blueprints.user import user_bp
    from blueprints.payment import payment_bp

    app.register_blueprint(user_bp, url_prefix='/api/user')
    app.register_blueprint(payment_bp, url_prefix='/api/payment')

    app.run(host="localhost", port=81, debug=True)