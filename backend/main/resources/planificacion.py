from flask_restful import Resource
from flask import request

#Datos de prueba en JSON
PLANIFICACIONES = {
    1: {'user':'Alumno1', 'payment_due_date': '20/06/23', 'condition':'paid'},
    2: {'user':'Alumno2', 'payment_due_date': '20/07/23', 'condition': 'unpaid'}
}

class Payment(Resource):
    def get(self,id):
        if int(id) in PAYMENTS:
            return PAYMENTS[int(id)]
        return '', 404
    
    def put(self, id):
        if int(id) in PAYMENTS:
            payment = PAYMENTS[int(id)]
            data = request.get_json()
            payment.update(data)
            return '', 204
        return '', 404