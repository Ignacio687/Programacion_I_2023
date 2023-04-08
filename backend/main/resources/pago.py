from flask_restful import Resource
from flask import request
from datetime import date

#Datos de prueba en JSON
PAGOS = {
    1: {'DNI': 49137856, 'nombre': 'Pedro', 'mes-año': '04-2023', 'condicion': 'pago'},
    2: {'DNI': 12548952, 'nombre': 'Juan', 'mes-año': '03-2023', 'condicion': 'pago'},
    3: {'DNI': 12548952, 'nombre': 'Juan', 'mes-año': '04-2023', 'condicion': 'impago'},
    4: {'DNI': 49137856, 'nombre': 'Pedro', 'mes-año': '03-2023', 'condicion': 'impago'}
}

class Pago(Resource):
    def get(self, dni, dueDate = date.today().strftime("%m-%Y")):
        for id in range(1, len(PAGOS)+1):
            if int(dni) == PAGOS[id]['DNI'] and str(dueDate) == PAGOS[id]['mes-año']:
                return PAGOS[id]
        return '', 404
    
    def put(self, dni, dueDate = date.today().strftime("%m-%Y")):
        for id in range(1, len(PAGOS)+1):
            if int(dni) == PAGOS[id]['DNI'] and str(dueDate) == PAGOS[id]['mes-año']:
                payment = PAGOS[id]
                data = request.get_json()
                payment.update(data)
                return '', 201
        return '', 404

if __name__=='__main__':
    pago = Pago()
    print(pago.get(12548952))

{
    "DNI": 38774369, 
    "contraseña": "#$sdadwj4541"
}