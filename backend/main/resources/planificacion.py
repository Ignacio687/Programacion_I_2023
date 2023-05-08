from flask_restful import Resource
from flask import request, jsonify
from main.models import PlanificacionModel, DetalleModel
from .. import db
import regex
from datetime import datetime
from sqlalchemy import func, desc

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
            # En el json, el true y false estan en minusculas, no los toma como boolean
            estado = request.args.get("estado")
            estado_bool = estado.lower() == "true"
            plan = plan.filter(PlanificacionModel.estado == estado_bool)
        #if request.args.get('order_by') == 'date':
        # Ordenar por fecha siempre
        plan=plan.order_by(desc(PlanificacionModel.creation_date))

        plan = plan.paginate(page=page, per_page=per_page, error_out=True, max_per_page=20)
        return jsonify(
            {"Planificaciones": [plan.to_json() for plan in plan],
            "total": plan.total,
            "pages": plan.pages,
            "page": page})

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

