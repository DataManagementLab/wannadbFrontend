import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

DEVMODE = False

BASEPATH = ""

for arg in sys.argv:
    if arg == "-dev":
        DEVMODE = True

if DEVMODE:
    #os.chdir("dev")
    print("*** Running in dev mode ***")
    BASEPATH = "dev/"


users= [
    {
        "id": 1,
        "name": "Alena",
        "password": "123"
    },
    {
        "id": 2,
        "name": "Benjamin",
        "password": "123"
    },
    {
        "id": 3,
        "name": "Leon",
        "password": "123"
    },
    {
        "id": 4,
        "name": "Nils",
        "password": "123"
    },
    {
        "id": 5,
        "name": "Philipp",
        "password": "123"
    },
    {
        "id": 6,
        "name": "Ramzes",
        "password": "123"
    },
    
]

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()
    # Check if both username and password are provided in the request
    if 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Both username and password are required'}), 400

    # Check if the provided username and password match the hardcoded values
    username = data['username'].lower()
    password = data['password'].lower()
    for user in users:
        if user['name'].lower() == username and user['password'].lower() == password:
            return jsonify({'message': 'Login successful'}), 200
        
    return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/upload', methods=['POST'])
@cross_origin()
def upload():
    data = request.get_json()
    # Check if both username and password are provided in the request
    if 'data' not in data or 'name' not in data or 'user' not in data:
        return jsonify({'message': 'Error: Missing properties'}), 200

    # save a txt file with the data
    try:
        os.makedirs(f"{BASEPATH}uploads/{data['user']}", exist_ok=True)
        
        name = data['name'].replace(" ", "_")
        if not ".txt" in name:
            name = name + ".txt"
            
        f =  open(f"{BASEPATH}uploads/{data['user']}/{name}", "w")
        f.write(data['data'].replace("\r\n", "\n"))
        f.close()
        return jsonify({'message': 'Upload successful'}), 200
    except Exception as e:
        return jsonify({'message': 'Error: Upload failed' + str(e)}), 200

@app.route('/get/file/names/<user>', methods=['GET'])
@cross_origin()
def get_file_names(user):
    try:
        files = os.listdir(f"{BASEPATH}uploads/{user}")
        return jsonify(files), 200
    except Exception as e:
        return jsonify([]), 200

@app.route('/get/file/content/<user>/<filename>', methods=['GET'])
@cross_origin()
def get_file_content(user, filename):
    try:
        f = open(f"{BASEPATH}uploads/{user}/{filename}", "r")
        content = f.read()
        f.close()
        return jsonify(content), 200
    except Exception as e:
        return jsonify({"message": "Error: File not found"}), 404
    
if __name__ == '__main__':
    app.run(debug=DEVMODE, host='localhost', port=5000)
