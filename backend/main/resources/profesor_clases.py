from flask_restful import Resource
from flask import request

#Datos de prueba en JSON
CLASES_POR_PROFESOR = {
    1: {'profesor': 'Profesor1', 'clase': 'clase1'},
    2: {'profesor': 'Profesor2', 'clase': 'clase2'}
}

class ProfesorClases(Resource):
    def get(self):
        return CLASES_POR_PROFESOR