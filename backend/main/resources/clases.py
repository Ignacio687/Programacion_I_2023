from flask_restful import Resource
from flask import request, jsonify
from .. import db, sa, sao
#from main.models import 

#Datos de prueba en JSON
CLASES_POR_PROFESOR = {
    1: {'DNI': 77854625, 'Nombre': 'Pepe', 'clase': 'clase1'},
    2: {'DNI': 84981773, 'Nombre': 'Juan', 'clase': 'clase2'},
    3: {'DNI': 15054188, 'Nombre': 'Tomas', 'clase': 'clase3'}
}

class ProfesorClases(Resource):
    def get(self):
        return CLASES_POR_PROFESOR