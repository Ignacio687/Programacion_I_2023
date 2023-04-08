from flask_restful import Resource
from flask import request

#Datos de prueba en JSON
PLANIFICACIONES = {
    1: {'Nombre': 'planificacion1', 'Profesor': 'Profesor1', 
        'Alumno': 'Alumno1', 'Estado':'activa'},
    2: {'Nombre': 'planificacion2', 'Profesor': 'Profesor2', 
        'Alumno': 'Alumno2', 'Estado':'inactiva'}
}

class PlanificacionAlumno(Resource):
    def get(self, id):
        if int(id) in PLANIFICACIONES:
            return PLANIFICACIONES[int(id)]
        return '', 404

""" REVISAR PlanificacionesProfesores """
class PlanificacionesProfesores(Resource):
    def get(self, id):
        if int(id) in PLANIFICACIONES:
            return PLANIFICACIONES[int(id)]
        return '', 404