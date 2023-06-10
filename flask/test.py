# import random
# import string

# # Generate a random alphabet character
# random_char = random.choice(string.ascii_lowercase)

# print(random_char)

l = [
   {
    "userId": 7,
    "id": 122,
    "title": "provident aut nobis culpa",
    "completed": 'as'
  },
  {
    "userId": 7,
    "id": 123,
    "title": "esse et quis iste est earum aut impedit",
    "completed": 'df'
  },
  { "userId": 7, "id": 124, "title": "qui consectetur id", "completed": 'asds' },
  {
    "userId": 7,
    "id": 125,
    "title": "aut quasi autem iste tempore illum possimus",
    "completed": 'sdf'
  },
    ]

print(len(l))
new_data = [todo for todo in l
                    if ('id' in todo) and todo['id'] != 124
                    ]

print(len(new_data))