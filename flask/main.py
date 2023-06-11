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


# login -- done
# getTodo for a specific user --done
# add todo for specific user-- done
# delete todo for a specific user--done

# update to do for a specific user


# login
@app.route('/api/v1/login', methods=['POST'])
def login():
    #
    # open the user.json/ --done
    # loop over the data and see if user request n json data r equal --done
    # check if the request body contains the password and  username-- done
    # generate token with payload containing the user id--- done
    # if not found then message pop up saying user not found --- done

    user_found = {}
    code = None
    message = ''
    header = {'content-type': 'application/json'}
    status = ''
    username = ''
    password = ''
    print(request.get_json())

    if ("password" in request.get_json()) and ("username" in request.get_json()):

        with open('data/user.json', 'r') as data:

            username = request.json.get('username')
            password = request.json.get('password')
            user_data = data.read()
            user_list = json.loads(user_data)

            for user in user_list:

                if username == user['username'] and password == user['password']:
                    user_found = user
                    break
        data.close()

    if user_found:
        code = 200
        message = "log in successful"
        status = 'success'
        payload = {"user_id": user_found['id']}
        token = jwt.encode(
            payload=payload, key=app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({'code': code, 'message': message, 'header': header, 'status': status, 'user': user_found, 'token': token}), code

    else:
        code = 404
        message = "wrong username or password"
        status = 'fail'
        return jsonify({'code': code, 'message': message, 'header': header, 'status': status}), code


# getting to do for a specific user

@app.route('/api/v1/get_user_list', methods=['GET'])
def get_user_todo_list():

    # check incoming request headers -- done
    # extract the authorization token -- done
    # decode the token --done
    # find todo list using the token's user id -- done
    # return the list  -- done
    user_todo = []
    code = None
    message = ''
    header = {}
    status = ''

    try:
        headers = request.headers
        # if (headers['Authorization'] in headers) :
        token = headers['Authorization'].split(" ")[1]
        # else:
        # return 'Unauthorized'

        payload = jwt.decode(
            token, app.config['SECRET_KEY'], algorithms=["HS256"])

        with open('./data/todos.json') as data:

            users_todo = data.read()
            users_todo_json = json.loads(users_todo)

            for user_list in users_todo_json:
                if (user_list['userId'] == payload['user_id']):
                    user_todo.append(user_list)
        data.close()

        if len(user_todo) > 1:
            code = 200
            message = f"${payload} to do list"
            status = 'success'

            return jsonify({'status': status, 'header': header, 'message': message, 'todos': user_todo}), code
        else:
            status = 'fail',
            message = f"no items for ${payload}"
            code = 404

            return jsonify({'status': status, 'header': header, 'message': message}), code

    except jwt.DecodeError as e:
        return str(e)

#  add  to do for a user


@app.route('/api/v1/add-todo', methods=['POST'])
def add_to_do():

    #  listen to incoming request to get headers--done
    # decode the authorization--done
    # extract the payload user id--done
    # get the title from the request body--done
    # add to do item according to the user id--done
    # the id shoould be a random string of length 10--done

    headers = request.headers
    token = headers['Authorization'].split(" ")[1]
    payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    random_string = ''.join(random.choice(string.ascii_letters)
                            for _ in range(10))

    item_body = {
        "completed": False,
        "userId": None,
        'title': '',
        'id': random_string
    }

    title = request.json.get('title')

    if (payload and title):
        item_body['title'] = title
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
    # listen to the incoming request
    # check out the headers
    # extract the token
    # check in the todo list payload and user id
    # open the todo.json
    # delete the item with the id from the endpoint parameter
    # delete every item with that payload user id

    token = request.headers['Authorization'].split(" ")[1]
    payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    count = 0

    with open('data/todos.json', 'r') as file:

        users_todo_json = json.load(file)

        new_data = [todo for todo in users_todo_json
                    if ('id' in todo) and todo['id'] != int(item_id)
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

            return jsonify({'message': message, 'code': code, 'status': status}), code

    
    else:
            message = 'no item with such id'
            code = 404
            status = 'success'
            jsonify({'message': message, 'code': code,
                    'status': status}), code

   

 

    return 'worked'


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
