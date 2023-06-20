import random
import string
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import jwt
from flask_mysqldb import MySQL

# from utils.encode_auth_token import encode_auth_token

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'zxcvbnm8870dfgytrer.rt_wer_45er***'

query = 'SELECT * FROM USERS'

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'todo_db'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)


# db communication login
def db_login(sql, data):

    cursor = mysql.connection.cursor()
    cursor.execute(sql, (data['username'], data['password']))
    data = cursor.fetchone()
    cursor.connection.commit()
    cursor.close()

    return data

# db communication add todo


def db_add_todo(sql, data):
    cursor = mysql.connection.cursor()
    cursor.execute(sql, (data['completed'], data['title'],
                   data['description'], data['userId']),)
    cursor.connection.commit()
    cursor.close()
    return True

# done delete


def db_del_todo(sql, id):
    cursor = mysql.connection.cursor()
    data = cursor.execute(sql, (id,))
    if data == 1:
        status = True
        cursor.connection.commit()
        cursor.close()
    else:
        status = False
        cursor.connection.commit()
        cursor.close()
    return status


def db_get_user_todo(sql, data):
    cursor = mysql.connection.cursor()
    cursor.execute(sql, (data['userId'],))
    res = cursor.fetchall()
    cursor.connection.commit()
    cursor.close()
    return res


# login
@app.route('/api/v1/login', methods=['POST'])
def login():

    code = None
    message = ''
    header = {'content-type': 'application/json'}
    status = ''
    response = None
    token = ''

    # database
    # getting the connection
    # then execute an sql

    try:
        request_data = request.get_json()

        if ("password" in request_data) and ("username" in request_data):

            sql = 'select * from users where username = %s and password = %s'

            response = db_login(sql, request_data)
            if response:
                code = 200
                message = "log in successful"
                status = 'success'
                payload = {"userId": response['id']}
                token = jwt.encode(
                    payload=payload, key=app.config['SECRET_KEY'], algorithm="HS256")
                response = {'message': message, 'status': status,
                            'user': response, 'token': token}
            else:
                code = 404
                message = "wrong username or password"
                status = 'fail'
                response = {'message': message, 'header': header,
                            'status': status, }

        else:
            status = 'fail'
            message = 'Fields empty'
            code = 422
            token = ''
            response = {'status': status, 'message': message}
    except Exception as e:
        response = {"message": f"{e}", "status": "ERROR"}
        code = 500

    return jsonify(response), code


# getting to do for a specific user
@app.route('/api/v1/get-todo', methods=['GET'])
def get_user_todo_list():

    code = None
    message = ''
    header = {}
    status = ''

    try:

        headers = request.headers
        if ('Authorization' in headers):
            token = headers['Authorization'].split(" ")[1]
        payload = jwt.decode(
            token, app.config['SECRET_KEY'], algorithms=["HS256"])

        sql = 'select * from todos where userId = %s '
        res = db_get_user_todo(sql, payload)
        if res:
            code = 200
            message = f"${payload} to do list"
            status = 'success'

            response = {'status': status, 'header': header,
                        'message': message, 'items': res}
        else:
            status = 'fail',
            message = "no items at the moment please add"
            code = 200
            response = {'status': status, 'header': header,
                        'message': message, 'items': []}

    except Exception as e:
        code = 500
        message = e.args[0]
        status = 'fail'
        response = {'status': status, 'message': message}

    return jsonify(response), code

#  add  to do for a user


@app.route('/api/v1/add-todo', methods=['POST'])
def add_to_do():

    try:
        token = request.headers['Authorization'].split(" ")[1]
        payload = jwt.decode(
            token, app.config['SECRET_KEY'], algorithms=["HS256"])

        item_body = {
            "completed": False,
            "title": "",
            "description": "",
        }

        title = request.json.get('title')
        description = request.json.get('description')

        if (payload and title):
            item_body['title'] = title
            item_body['description'] = description
            item_body['userId'] = payload['userId']
        else:
            response = {'message': 'no user or title'}

        ins_sql = 'INSERT INTO `todos` (`completed`,`title` , `description`,`userId` ) VALUES (%s,%s,%s,%s)'
        res = db_add_todo(ins_sql, item_body)

        get_sql = 'select * from todos where userId = %s'
        todos = db_get_user_todo(get_sql, payload)

        if res:
            message = "item added successfully"
            code = 200
            status = 'success'
            response = {'message': message, 'status': status, 'items': todos}

    except Exception as e:
        code = 401
        message = e.args[0]
        status = 'fail'
        description = 'Token is missing please login'
        response = {'message': message, 'status': status,'description' : description}

    return jsonify(response), code

# deleting todo item


@app.route('/api/v1/delete-todo/<item_id>', methods=['DELETE'])
def delete_todo(item_id):

    try:
        token = request.headers['Authorization'].split(" ")[1]
        payload = jwt.decode(
            token, app.config['SECRET_KEY'], algorithms=["HS256"])

        sql = 'DELETE FROM todos where id = %s'
        res = db_del_todo(sql, item_id)

        todos_sql = f"SELECT * FROM  todos WHERE  userId = {payload['userId']}"
        cursor = mysql.connection.cursor()
        cursor.execute(todos_sql)
        todos = cursor.fetchall()

        if res:
            message = 'item deleted successfully'
            code = 200
            status = 'success'
            response = {'message': message, 'code': code,
                        'status': status, 'items': todos}
        else:
            message = 'no item with such id'
            code = 404
            status = 'fail'
            response = {'message': message, 'code': code,
                        'status': status, 'items': todos}

    except Exception as e:
        status = 'fail'
        description = ' Token missing please login'
        message = e.args[0]
        code = 401
        response = {'message': message, 'status': status , 'description' : description}

    return jsonify(response), code

# done
@app.route('/api/v1/complete-todo/<item_id>', methods=['PUT'])
def complete_todo(item_id):

    try:
        token = request.headers['Authorization'].split(" ")[1]
        payload = jwt.decode(
            token, app.config['SECRET_KEY'], algorithms=["HS256"])
        item_found = {}
        todos_sql = f"SELECT * FROM  todos WHERE  userId = {payload['userId']}"
        cursor = mysql.connection.cursor()
        cursor.execute(todos_sql)
        todos = cursor.fetchall()

        for item in todos:
            if item['id'] == int(item_id):
                item_found = item
                break

        if item_found:

            update_sql = f"UPDATE todos  SET completed = True WHERE  id = {item_found['id']}"
            res = cursor.execute(update_sql)

            updated_todos_sql = f"SELECT * FROM  todos WHERE  userId = {payload['userId']}"
            cursor.execute(updated_todos_sql)
            todos = cursor.fetchall()

            cursor.connection.commit()
            cursor.close()

            if res == 1:
                message = 'updated successfully'
                code = 200
                response = {'message': message, 'items': todos}
            else:
                message = 'already updated'
                code = 200
                response = {'message': message, 'items':  todos}

    except Exception as e:
        status = 'fail'
        description = ' Token missing please login'
        message = e.args[0]
        code = 401
        response = {'message': message, 'status': status , 'description' : description}

    return jsonify(response), code


@app.route('/api/v1/undo-todo/<item_id>', methods=['PUT'])
def undo_todo(item_id):
    try:
        token = request.headers['Authorization'].split(" ")[1]
        payload = jwt.decode(
            token, app.config['SECRET_KEY'], algorithms=["HS256"])
        item_found = {}
        todos_sql = f"SELECT * FROM  todos WHERE  userId = {payload['userId']}"
        cursor = mysql.connection.cursor()
        cursor.execute(todos_sql)
        todos = cursor.fetchall()

        for item in todos:
            if item['id'] == int(item_id):
                item_found = item
                break
        if item_found:
            undo_sql = f"UPDATE todos SET completed = False where id = {item_found['id']}"
            res = cursor.execute(undo_sql)

            todo_sql = f"SELECT * FROM todos WHERE userId ={payload['userId']}"
            cursor.execute(todo_sql)
            todos = cursor.fetchall()

            cursor.connection.commit()
            cursor.close()

            if res == 1:
                message = 'updated successfully'
                code = 200
                response = {'message': message, 'items': todos}
            else:
                message = 'already updated'
                code = 200
                response = {'message': message, 'items':  todos}

    except Exception as e:
        print(e)
        status = 'fail'
        description = ' Token missing please login'
        message = e.args[0]
        code = 401
        response = {'message': message, 'status': status , 'description' : description}

    return jsonify(response), code



if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
