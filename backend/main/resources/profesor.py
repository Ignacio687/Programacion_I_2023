from flask_restful import Resource
from flask import request

# Datos de prueba en JSON
PROFESORES = {
    1: {'nombre': 'Profe 1'},
    2: {'nombre': 'Profe 2'}
}


class Profesor(Resource):
    def get(self, id):
        if int(id) in PROFESORES:
            return PROFESORES[int(id)]
        return '', 404

    def delete(self, id):
        if int(id) in PROFESORES:
            del PROFESORES[int(id)]
            return '', 204
        return '', 404

    def put(self, id):
        if int(id) in PROFESORES:
            profesor = PROFESORES[int(id)]
            data = request.get_json()
            profesor.update(data)
            return '', 201
        return '', 404


class Profesores(Resource):
    def get(self):
        return PROFESORES

    def post(self):
        profesor = request.get_json()
        id = int(max(PROFESORES.keys()))+1
        PROFESORES[id] = profesor
        return PROFESORES[id], 201
