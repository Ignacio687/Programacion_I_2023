from flask_restful import Resource
from flask import request

#Datos de prueba en JSON
CLASES_POR_PROFESOR = {
    1: {'profesor':'Profesor1', 'clase':'clase1'},
    2: {'profesor':'Profesor2', 'clase': 'clase2'}
}

class Pago(Resource):
    def get(self,id):
        if int(id) in PAGOS:
            return PAGOS[int(id)]
        return '', 404
    
    def put(self, id):
        if int(id) in PAGOS:
            payment = PAGOS[int(id)]
            data = request.get_json()
            payment.update(data)
            return '', 204
        return '', 404