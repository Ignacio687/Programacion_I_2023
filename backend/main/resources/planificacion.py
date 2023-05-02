from flask_restful import Resource
from flask import request, jsonify
from main.models import PlanificacionModel
from .. import db


class PlanificacionAlumno(Resource):
    def get(self, dni):
        # Obtener la planificación por defecto
        planificacion = (
            db.session.query(PlanificacionModel).filter(
                PlanificacionModel.alumno_DNI == dni
            )
        ).all()
        return jsonify([plan.to_json() for plan in planificacion])

class PlanificacionesProfesores(Resource):
    def get(self):
        planificacion = db.session.query(PlanificacionModel).all()
        response = jsonify([plan.to_json() for plan in planificacion])
        return response

    def post(self):
        plan = PlanificacionModel.from_json(request.get_json())
        db.session.add(plan)
        db.session.commit()
        return plan.to_json(), 201

class PlanificacionProfesor(Resource):
    def get(self, dni):
        planificacion = (
            db.session.query(PlanificacionModel).filter(
                PlanificacionModel.profesor_DNI == dni
            )
        ).all()
        return jsonify([plan.to_json() for plan in planificacion])

    def put(self, dni):
        plan = db.session.query(PlanificacionModel).filter(PlanificacionModel.profesor_DNI == dni).first()
        data = request.get_json().items()
        for key, value in data:
            setattr(plan, key, value)
        db.session.add(plan)
        db.session.commit()
        return plan.to_json() , 201 

    def delete(self, dni):
        plan = db.session.query(PlanificacionModel).get_or_404(dni)
        db.session.delete(plan)
        db.session.commit()
        return '', 204