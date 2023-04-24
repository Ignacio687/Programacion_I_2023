from flask_restful import Resource
from flask import request, jsonify
from main.models import PlanificacionModel

# Datos de prueba en JSON
# PLANIFICACIONES = {
#     1: {'Nombre': 'planificacion1', 'ProfDNI': 77854625,
#         'AlumnoDNI': 49137856, 'Estado': 'activa'},
#     2: {'Nombre': 'planificacion2', 'ProfDNI': 84981773,
#         'AlumnoDNI': 12548952, 'Estado': 'inactiva'},
#     3: {'Nombre': 'planificacion3', 'ProfDNI': 84981773,
#         'AlumnoDNI': 12548952, 'Estado': 'activa'},
# }


class PlanificacionAlumno(Resource):
    def get(self, id):
        # Obtener la planificación por defecto
        planificacion = db.session.query(PlanificacionModel).filter_by(alumno_DNI=id).all().get_or_404(id)
        return planificacion.to_json()

class PlanificacionesProfesores(Resource):
    def get(self, dni):
        planificacion = db.session.query(PlanificacionModel).filter(profesor_DNI=id).all().get_or_404(id)
        return planificacion.to_json()
        
        
    def post(self):
        planificacion = request.get_json()
        id = int(max(PLANIFICACIONES.keys()))+1
        PLANIFICACIONES[id] = planificacion
        return PLANIFICACIONES[id], 201


class PlanificacionProfesor(Resource):
    def get(self, id):
        planificacion = db.session.query(PlanificacionModel).filter_by(profesor_DNI=id).all().get_or_404(id)
        return planificacion.to_json()

    # def put(self, id):
    #     if int(id) in PLANIFICACIONES:
    #         planificacion = PLANIFICACIONES[int(id)]
    #         data = request.get_json()
    #         planificacion.update(data)
    #         return '', 201
    #     return '', 404

    # def delete(self, id):
    #     if int(id) in PLANIFICACIONES:
    #         del PLANIFICACIONES[int(id)]
    #         return '', 204
    #     return '', 404
