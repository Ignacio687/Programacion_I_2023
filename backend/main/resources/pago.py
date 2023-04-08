from flask_restful import Resource
from flask import request

#Datos de prueba en JSON
PAGOS = {
    1: {'usuario':'Alumno1', 'fecha_de_vencimiento': '20/06/23', 'condicion': 'pagado'},
    2: {'usuario':'Alumno2', 'fecha_de_vencimiento': '20/07/23', 'condicion': 'impago'}
}

class Pago(Resource):
    def get(self, id):
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