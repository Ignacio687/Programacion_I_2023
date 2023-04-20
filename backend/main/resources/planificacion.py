from flask_restful import Resource
from flask import request
from .. import db

#Datos de prueba en JSON
PLANIFICACIONES = {
    1: {'Nombre': 'planificacion1', 'ProfDNI': 77854625, 
        'AlumnoDNI': 49137856, 'Estado':'activa'},
    2: {'Nombre': 'planificacion2', 'ProfDNI': 84981773, 
        'AlumnoDNI': 12548952, 'Estado':'inactiva'},
    3: {'Nombre': 'planificacion3', 'ProfDNI': 84981773, 
        'AlumnoDNI': 12548952, 'Estado':'activa'},
}

class PlanificacionAlumno(Resource):
    def get(self, dni):
        planificaciones = {}
        for planificacion in Planificacion.query.filter_by(alumno_DNI=dni).all():
            planificaciones[planificacion.id] = {
                'Nombre': planificacion.nombre,
                'ProfDNI': planificacion.profesor_DNI,
                'AlumnoDNI': planificacion.alumno_DNI,
                'Estado': planificacion.estado
            }
        if len(planificaciones) != 0:
            return planificaciones
        return '', 404

class PlanificacionesProfesores(Resource):
    def get(self, dni=None):
        if dni != None:
            planificaciones = {}
            for id in range(1, len(PLANIFICACIONES)+1):
                if int(dni) == PLANIFICACIONES[id]['ProfDNI']:
                    planificaciones[id] = PLANIFICACIONES[id]
            if len(planificaciones) != 0:
                return planificaciones
            return '', 404
        else :
            return PLANIFICACIONES
    
    def post(self):
        planificacion = request.get_json()
        id = int(max(PLANIFICACIONES.keys()))+1
        PLANIFICACIONES[id] = planificacion
        return PLANIFICACIONES[id], 201
    
class PlanificacionProfesor(Resource):
    def get(self, id):
        if int(id) in PLANIFICACIONES:
            return PLANIFICACIONES[int(id)]
        return '', 404
    
    def put(self, id):
        if int(id) in PLANIFICACIONES:
            planificacion = PLANIFICACIONES[int(id)]
            data = request.get_json()
            planificacion.update(data)
            return '', 201
        return '', 404
    
    def delete(self, id):
        if int(id) in PLANIFICACIONES:
            del PLANIFICACIONES[int(id)]
            return '', 204
        return '', 404