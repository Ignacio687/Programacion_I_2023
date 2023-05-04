from flask_restful import Resource
from flask import request, jsonify
from main.models import PlanificacionModel, DetalleModel
from .. import db
import regex
from datetime import datetime

class Planificacion(Resource):
    def get(self, id):
        plan = db.session.query(PlanificacionModel).get_or_404(id)
        return plan.to_json_complete()

    def put(self, id):
        plan = db.session.query(PlanificacionModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            if regex.match(r"(0?[1-9]|[12][0-9]|3[01])(/)(0?[1-9]|1[012])\2(\d{4})", str(value)) != None:
                setattr(plan, key.lower(), datetime.strptime(value, "%d/%m/%Y"))
            else: setattr(plan, key.lower(), value)
        db.session.add(plan)
        db.session.commit()
        return plan.to_json(), 201        

    def delete(self, id):
        plan = db.session.query(PlanificacionModel).get_or_404(id)
        db.session.delete(plan)
        db.session.commit()
        return '', 204
    
class Planificaciones(Resource):
    def get(self):
        plan = db.session.query(PlanificacionModel).all()
        return jsonify([clase.to_json() for clase in plan])

    def post(self):
        try:
            plan = PlanificacionModel.from_json(request.get_json())
        except:
            return 'Formato no correcto', 400
        db.session.add(plan)
        db.session.commit()
        return plan.to_json(), 201

class PlanificacionAlumno(Resource):
    def get(self, dni):
        planificacion = (
            db.session.query(PlanificacionModel).filter(PlanificacionModel.alumno_dni == dni)).all()
        return jsonify([plan.to_json() for plan in planificacion])

class PlanificacionProfesor(Resource):
    def get(self, dni):
        planificacion = (
            db.session.query(PlanificacionModel).filter(PlanificacionModel.profesor_dni == dni)).all()
        return jsonify([plan.to_json() for plan in planificacion])

class PlanificacionDetalle(Resource):
    def get(self, id, dia):
        plan = db.session.query(DetalleModel).filter(
                DetalleModel.planificacion_id == int(id), 
                DetalleModel.dia == str(dia),
                ).first()
        if plan != None:
            return plan.to_json()
        else: return '', 404

    def put(self, id, dia):
        plan = db.session.query(DetalleModel).filter(
            DetalleModel.planificacion_id == int(id), 
            DetalleModel.dia == str(dia)
            ).first()
        if plan != None:
            data = request.get_json().items()
            for key, value in data:
                setattr(plan, key, value)
            db.session.add(plan)
            db.session.commit()
            return plan.to_json() , 201
        else: return '', 404

        
class PlanificacionDetalles(Resource):
    def post(self):
        try:
            plan = DetalleModel.from_json(request.get_json())
        except:
             return 'Formato no correcto', 400
        exist = db.session.query(PlanificacionModel).get_or_404(plan.planificacion_id)
        db.session.add(plan)
        db.session.commit()
        return plan.to_json(), 201

