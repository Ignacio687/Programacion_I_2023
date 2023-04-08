from flask_restful import Resource
from flask import request

#Datos de prueba en JSON
LOGINS = {
    1: {'usuario':'Alumno1', 'contraseña':'11598$3kkksd'},
    2: {'usuario':'Alumno2', 'contraseña':'#$sdadwj4541'}
}

class Login(Resource):
    def post(self):
        login = request.get_json()
        id = int(max(LOGINS.keys()))+1
        LOGINS[id] = login
        return LOGINS[id], 201