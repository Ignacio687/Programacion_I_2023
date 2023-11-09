from flask_restful import Resource
from flask import request, jsonify
from main.models import PlanificacionModel, DetalleModel
from .. import db
import regex
from datetime import datetime
from sqlalchemy import func, desc, asc
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..auth.decorators import role_required

class Planificacion(Resource):
    @jwt_required()
    def get(self, id):
        plan = db.session.query(PlanificacionModel).get_or_404(id)
        return plan.to_json_complete()

    @role_required(roles = ["admin", "profesor"])
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

    @role_required(roles = ["admin", "profesor"])
    def delete(self, id):
        plan = db.session.query(PlanificacionModel).get_or_404(id)
        db.session.delete(plan)
        db.session.commit()
        return '', 204
    
class Planificaciones(Resource):
    @role_required(roles = ["admin", "profesor"])
    def get(self):
        page, per_page = 1, 10
        if request.args.get("page"):
            page = int(request.args.get("page"))
        if request.args.get("per_page"):
            per_page = int(request.args.get("per_page"))
        plan = db.session.query(PlanificacionModel)

        if request.args.get("alumno_dni"):
            plan = plan.filter(PlanificacionModel.alumno_dni.like(request.args.get("alumno_dni")))

        if request.args.get("profesor_dni"):
            plan = plan.filter(PlanificacionModel.profesor_dni.like(request.args.get("profesor_dni")))

        if request.args.get("estado"):
            plan = plan.filter(PlanificacionModel.estado == request.args.get("estado"))

        if request.args.get('order_by_date') == 'asc':
            plan=plan.order_by(asc(PlanificacionModel.creation_date))
            
        if request.args.get('order_by_date') == 'desc':
            plan=plan.order_by(desc(PlanificacionModel.creation_date))

        plan = plan.paginate(page=page, per_page=per_page, error_out=True, max_per_page=20)
        return jsonify(
            {"Planificaciones": [plan.to_json() for plan in plan],
            "total": plan.total,
            "pages": plan.pages,
            "page": page})

    @role_required(roles = ["admin", "profesor"])
    def post(self):
        try:
            plan = PlanificacionModel.from_json(request.get_json())
        except:
            return 'Formato incorrecto', 400
        db.session.add(plan)
        db.session.commit()
        return plan.to_json(), 201

class PlanificacionAlumno(Resource):
    @jwt_required()
    def get(self, dni):
        page, per_page = 1, 10
        if request.args.get("page"):
            page = int(request.args.get("page"))
        if request.args.get("per_page"):
            per_page = int(request.args.get("per_page"))
        planificacion = db.session.query(PlanificacionModel).filter(PlanificacionModel.alumno_dni == dni).paginate(page=page, per_page=per_page, error_out=True, max_per_page=20)
        response = {
            "planificaciones": [plan.to_json_complete() for plan in planificacion],
            "total": planificacion.total,
            "pages": planificacion.pages,
            "page": page
        }
        return jsonify(response)

class PlanificacionProfesor(Resource):
    @role_required(roles = ["admin", "profesor"])
    def get(self, dni):
        page, per_page = 1, 10
        if request.args.get("page"):
            page = int(request.args.get("page"))
        if request.args.get("per_page"):
            per_page = int(request.args.get("per_page"))
        planificacion = db.session.query(PlanificacionModel).filter(PlanificacionModel.profesor_dni == dni).paginate(page=page, per_page=per_page, error_out=True, max_per_page=20)
        response = {
            "planificaciones": [plan.to_json_complete() for plan in planificacion],
            "total": planificacion.total,
            "pages": planificacion.pages,
            "page": page
        }
        return jsonify(response)

class PlanificacionDetalle(Resource):
    @jwt_required()
    def get(self, id, dia):
        plan = db.session.query(DetalleModel).filter(
                DetalleModel.planificacion_id == int(id), 
                DetalleModel.dia == str(dia),
                ).first()
        if plan != None:
            return plan.to_json()
        else: return '', 404

    @role_required(roles = ["admin", "profesor"])
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
    @role_required(roles = ["admin", "profesor"])
    def post(self):
        try:
            plan = DetalleModel.from_json(request.get_json())
        except:
             return 'Formato incorrecto', 400
        exist = db.session.query(PlanificacionModel).get_or_404(plan.planificacion_id)
        db.session.add(plan)
        db.session.commit()
        return plan.to_json(), 201