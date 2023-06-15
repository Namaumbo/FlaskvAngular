import random
import string
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import jwt

# from utils.encode_auth_token import encode_auth_token

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'zxcvbnm8870dfgytrer.rt_wer_45er***'



# login
@app.route('/api/v1/login', methods=['POST'])
def login():
    user_found = {}
    code = None
    message = ''
    header = {'content-type': 'application/json'}
    status = ''
    username = ''
    password = ''
    responce = None

    try:
        request_data = request.get_json()

        if ("password" in request_data) and ("username" in request_data):

            with open('data/user.json', 'r') as file_data:

                username = request_data['username']
                password = request_data['password']
                user_data = file_data.read()
                user_list = json.loads(user_data)

                for user in user_list:

                    if username == user['username'] and password == user['password']:
                        user_found = user
                        break
            # data.close()

        if user_found:
            code = 200
            message = "log in successful"
            status = 'success'
            payload = {"user_id": user_found['id']}
            token = jwt.encode(payload=payload, key=app.config['SECRET_KEY'], algorithm="HS256")

            # return jsonify({'code': code, 'message': message, 'header': header, 'status': status, 'user': user_found, 'token': token}), code
            responce = {'code': code, 'message': message, 'header': header, 'status': status, 'user': user_found, 'token': token}

        else:
            code = 404
            message = "wrong username or password"
            status = 'fail'
            responce = {'code': code, 'message': message, 'header': header, 'status': status, 'user': user_found, 'token': token}
    
    except Exception as e:
        responce = {"message": f"{e}", "status":"ERROR"}
        code = 500

    
    return jsonify(responce), code
    

# getting to do for a specific user

@app.route('/api/v1/get_user_list', methods=['GET'])
def get_user_todo_list():

    user_todo = []
    code = None
    message = ''
    header = {}
    status = ''

    try:
        
        headers = request.headers

        if ('Authorization' in headers) :
            token = headers['Authorization'].split(" ")[1]
        else:
            return jsonify({'message':'Not Authorized','status':'fail'}),401

        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])

        with open('./data/todos.json') as data:

            users_todo = data.read()
            users_todo_json = json.loads(users_todo)

            for user_list in users_todo_json:
                if (user_list['userId'] == payload['user_id']):
                    user_todo.append(user_list)
            data.close()

            if len(user_todo) >= 1:
                code = 200
                message = f"${payload} to do list"
                status = 'success'

                return jsonify({'status': status, 'header': header, 'message': message, 'todos': user_todo}), code
            else:
                status = 'fail',
                message = f"no items at the moment please add"
                code = 200
                items = []

                return jsonify({'status': status, 'header': header, 'message': message,'todos':items}), code

    except KeyError as e :
        return jsonify({'message':'Not Authorized','status':'fail'}), 401
    
    except jwt.DecodeError as e:
        return jsonify({'status':'fail'}), 401
    

#  add  to do for a user


@app.route('/api/v1/add-todo', methods=['POST'])
def add_to_do():

    headers = request.headers
    
    if ('Authorization' in headers) :
        token = headers['Authorization'].split(" ")[1]
    else:
        return jsonify({'message':'Not Authorized','status':'fail'}),401
  
    payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    random_string = ''.join(random.choice(string.ascii_letters)
                            for _ in range(10))

    item_body = {
        "completed": False,
        "userId": None,
        "title": "",
        "description" :"",
        "id": random_string
    }

    title = request.json.get('title')
    description  = request.json.get('description')

    if (payload and title):
        item_body['title'] = title
        item_body['description'] = description
        item_body['userId'] = payload['user_id']
    else:
        jsonify({'message': 'no user or title'})

    try:
        # opening a file and loads to json so python can understand
        with open('./data/todos.json', 'r') as data:

            users_todo = data.read()
            users_todo_json = json.loads(users_todo)
            users_todo_json.append(item_body)


        data.close()
        # writting to the file
        pr_status = False
        with open('./data/todos.json', 'w') as file:

            

            json.dump(users_todo_json, file)
            pr_status = True
        data.close()

        if pr_status:
            message = f"item added successfully"
            code = 200
            status = 'success'

    except OSError as e:
        return str(e)

    return jsonify({'message': message,  'status': status, 'item': users_todo_json}), code

# deleting an item for a specific user


@app.route('/api/v1/delete-todo/<item_id>', methods=['DELETE'])
def delete_todo(item_id):

    token = request.headers['Authorization'].split(" ")[1]
    payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    count = 0

    with open('data/todos.json', 'r') as file:

        users_todo_json = json.load(file)

        new_data = [todo for todo in users_todo_json
                    if ('id' in todo) and todo['id'] != item_id 
                    ]
        if len(new_data)>0 :
            count = 1
    
    with open('./data/todos.json', 'w') as file:
        json.dump(new_data, file, indent=4)
    file.close()

    if count == 1:
            message = 'item deleted successfully'
            code = 200
            status = 'success'
            return jsonify({'message': message, 'code': code, 'status': status,'item':new_data}), code

    else:
            message = 'no item with such id'
            code = 404
            status = 'success'
            jsonify({'message': message, 'code': code,'status': status}), code

    return jsonify({"message":'no item','code':200,'status':'success',"item":new_data})



@app.route('/api/v1/complete-todo/<item_id>', methods=['PUT'])
def complete_todo(item_id):
    
    token = request.headers['Authorization'].split(" ")[1]
    payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])

    with open('data/todos.json', 'r') as file:


        users_todo_json = json.load(file)

        for todo in users_todo_json :

            if todo['id'] == item_id :
                found_todo = todo
                break
        if found_todo :
            found_todo['completed'] = True   
             
        else:
            return jsonify ({'message':'no item'})
        with open('./data/todos.json', 'w') as file:
            json.dump(users_todo_json ,file, indent=4)
        

    file.close()

    return jsonify({'message':'success','item':users_todo_json})


@app.route('/api/v1/undo-todo/<item_id>', methods=['PUT'])
def undo_todo(item_id):
    
    token = request.headers['Authorization'].split(" ")[1]
    payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    found_todo = {}
    with open('data/todos.json', 'r') as file:
        user_todo_json = json.load(file)

        for todo in user_todo_json:
            if todo['id'] == item_id :
                if todo['completed'] == True :
                    found_todo = todo 
                    break
        if found_todo :
            found_todo['completed'] = False
        else:
            message = 'no item',
            code = 200,
            status = 'success'
            return jsonify({'message':message , 'status':status}),code 
        
        with open('./data/todos.json', 'w') as file:
            json.dump(user_todo_json ,file, indent=4)
    file.close()

    return jsonify({'message':'success','item':user_todo_json})


@app.route('/api/v1/show-item/<item_id>',methods=['GET'])
def show_item(item_id):

    token = request.headers['Authorization'].split(" ")[1]
    payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    foundItem = {}

    with open('data/todos.json', 'r') as file: 
        user_todo_json = json.load(file)   
        
        for todo in user_todo_json:
            if todo['id'] == item_id :
                foundItem = todo
        if foundItem :
            return jsonify({'message':'found item','item':foundItem}),200
        else:
            return jsonify({'message':'no item'})
        
        
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)


    