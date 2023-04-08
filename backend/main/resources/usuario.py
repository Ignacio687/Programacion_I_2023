from flask_restful import Resource
from flask import request

# Datos de prueba en JSON
USERS = {
    1: {'nombre': 'Alumno 1'},
    2: {'nombre': 'Alumno 2'}
}


class User(Resource):
    def get(self, id):
        if int(id) in USERS:
            return USERS[int(id)]
        return '', 404

    def delete(self, id):
        if int(id) in USERS:
            del USERS[int(id)]
            return '', 204
        return '', 404

    def put(self, id):
        if int(id) in USERS:
            user = USERS[int(id)]
            data = request.get_json()
            user.update(data)
            return '', 201
        return '', 404


class Users(Resource):
    def get(self):
        return USERS

    def post(self):
        user = request.get_json()
        id = int(max(USERS.keys()))+1
        USERS[id] = user
        return USERS[id], 201
