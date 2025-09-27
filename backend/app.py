
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import mysql.connector

app = Flask(__name__)
CORS(app)

DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': int(os.getenv('DB_PORT', 3306)),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_NAME', 'ecommerce_db'),
}


def get_db_connection():
    return mysql.connector.connect(
        host=DB_CONFIG['host'],
        port=DB_CONFIG['port'],
        user=DB_CONFIG['user'],
        password=DB_CONFIG['password'],
        database=DB_CONFIG['database']
    )

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'service': 'flask-backend'}), 200

@app.route('/api/products', methods=['GET'])
def get_products():
    sample_products = [
        {'id': 1, 'name': 'Sample Product A', 'price': 19.99, 'description': 'A placeholder product'},
        {'id': 2, 'name': 'Sample Product B', 'price': 29.99, 'description': 'Another placeholder product'}
    ]
    return jsonify(sample_products), 200

@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.get_json() or {}
    required = ['name', 'email']
    if not all(k in data for k in required):
        return jsonify({'error': 'Missing required fields'}), 400

    # try:
    #     conn = get_db_connection()
    #     cursor = conn.cursor()
    #     cursor.execute(
    #         "INSERT INTO users (name, email) VALUES (%s, %s)",
    #         (data['name'], data['email'])
    #     )
    #     conn.commit()
    #     user_id = cursor.lastrowid
    # finally:
    #     cursor.close()
    #     conn.close()

    return jsonify({'message': 'User registered (mock)', 'user': data}), 201

@app.errorhandler(404)
def not_found(_):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({'error': 'Server error', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000)), debug=True)
