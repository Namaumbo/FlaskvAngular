# from flask import Flask
# import jwt
# import datetime
# from ..main import app

# def encode_auth_token(id)-> str:
#     # // token to contain header , payload and key
#     try:
#         # defining the pay load
#         payload = {
#             'user_id': id
#         }

#         print( app.config['SECRET_KEY'])
#         auth_key = jwt.encode(payload=payload ,algorithm='HS256',
#                  key='wertyuiosdfghjkxcvbnm')
        
#         # print(app.config.get('SECRETE_KEY'))

#         return auth_key

#     except Exception as e:
#         return e
    
# print (encode_auth_token('vuhv'))