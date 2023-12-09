from flask_restful import Resource
from flask import request, jsonify
from .. import db, sa
from main.models import ClaseModel, AlumnoModel, ProfesorModel, UsuariosModel
from datetime import datetime
import regex
from sqlalchemy import desc, func, or_
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from ..auth.decorators import role_required

class Clase(Resource):
    @jwt_required(optional=True)
    def get(self, id):
        clase = db.session.query(ClaseModel).get_or_404(id)
        identity = get_jwt()
        if not identity or identity.get('rol') == 'alumno':
            return clase.to_json() 
        return clase.to_json_complete() 

    @role_required(roles = ["admin"])
    def put(self, id):
        clase = db.session.query(ClaseModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            if regex.match(r"\d{2}:\d{2}", str(value)) != None:
                setattr(clase, key.lower(), datetime.strptime(value, "%H:%M"))
            else: setattr(clase, key.lower(), value)
        db.session.add(clase)
        db.session.commit()
        return clase.to_json(), 201        

    @role_required(roles = ["admin"])
    def delete(self, id):
        clase = db.session.query(ClaseModel).get_or_404(id)
        db.session.delete(clase)
        db.session.commit()
        return '', 204
    
class Clases(Resource):
    @jwt_required(optional=True)
    def get(self):
        page, per_page = 1, 10
        if request.args.get("page"):
            page = int(request.args.get("page"))
        if request.args.get("per_page"):
            per_page = int(request.args.get("per_page"))
        clases = db.session.query(ClaseModel)
        if request.args.get("tipo"):
            clases = clases.filter(ClaseModel.tipo.like(request.args.get("tipo")))
        if request.args.get("dia"):
            clases = clases.filter(ClaseModel.dia.like(request.args.get("dia")))
        if request.args.get("hora"):
            clases = clases.filter(ClaseModel.horario.like(datetime.strptime(request.args.get("hora"), "%H:%M")))
        if request.args.get("nombre"):
            clases = clases.filter(
                or_(
                    ClaseModel.nombre.startswith(request.args.get("nombre").strip()),
                    ClaseModel.nombre.contains(request.args.get("nombre").strip())
                )
            )
        if "orby_hora" in request.args.keys():
            clases = clases.order_by(ClaseModel.horario.asc())
        if request.args.get("nr_alumnos"):
            clases = clases.outerjoin(ClaseModel.alumnos).group_by(ClaseModel.clase_id).having(
                func.count(AlumnoModel.dni)==int(request.args.get("nr_alumnos")))
        clases = clases.paginate(page=page, per_page=per_page, error_out=True, max_per_page=20)
        return jsonify(
            {"Clases": [clase.to_json() for clase in clases],
            "total": clases.total,
            "pages": clases.pages,
            "page": page})
    
class ClasesDisponibles(Resource):
    @jwt_required()
    def get(self, dni):
        page, per_page = 1, 10
        if request.args.get("page"):
            page = int(request.args.get("page"))
        if request.args.get("per_page"):
            per_page = int(request.args.get("per_page"))
        dbModel = AlumnoModel if get_jwt()['rol'] == "alumno" else ProfesorModel
        usuario = db.session.query(dbModel).get_or_404(dni)
        clases = db.session.query(ClaseModel).filter(~ClaseModel.alumnos.any(AlumnoModel.usuario.has(dni=usuario.dni)))
        if request.args.get("tipo"):
            clases = clases.filter(ClaseModel.tipo.like(request.args.get("tipo")))
        if request.args.get("dia"):
            clases = clases.filter(ClaseModel.dia.like(request.args.get("dia")))
        if request.args.get("hora"):
            clases = clases.filter(ClaseModel.horario.like(datetime.strptime(request.args.get("hora"), "%H:%M")))
        if "orby_hora" in request.args.keys():
            clases = clases.order_by(ClaseModel.horario.asc())
        if request.args.get("nr_alumnos"):
            clases = clases.outerjoin(ClaseModel.alumnos).group_by(ClaseModel.clase_id).having(
                func.count(AlumnoModel.dni)==int(request.args.get("nr_alumnos")))
        clases = clases.paginate(page=page, per_page=per_page, error_out=True, max_per_page=20)
        return jsonify(
            {"Clases": [clase.to_json() for clase in clases],
            "total": clases.total,
            "pages": clases.pages,
            "page": page})

#ARreglar y combinar con la claes de arriba
class ClasesInscripto(Resource):
    @jwt_required()
    def get(self, dni):
        page, per_page = 1, 10
        if request.args.get("page"):
            page = int(request.args.get("page"))
        if request.args.get("per_page"):
            per_page = int(request.args.get("per_page"))
        dbModel = AlumnoModel if get_jwt()['rol'] == "alumno" else ProfesorModel
        usuario = db.session.query(dbModel).get_or_404(dni)
        clases = usuario.clases
        if request.args.get("tipo"):
            clases = clases.filter(ClaseModel.tipo.like(request.args.get("tipo")))
        if request.args.get("dia"):
            clases = clases.filter(ClaseModel.dia.like(request.args.get("dia")))
        if request.args.get("hora"):
            clases = clases.filter(ClaseModel.horario.like(datetime.strptime(request.args.get("hora"), "%H:%M")))
        if "orby_hora" in request.args.keys():
            clases = clases.order_by(ClaseModel.horario.asc())
        if request.args.get("nr_alumnos"):
            clases = clases.outerjoin(ClaseModel.alumnos).group_by(ClaseModel.clase_id).having(
                func.count(AlumnoModel.dni)==int(request.args.get("nr_alumnos")))
        clases = clases.paginate(page=page, per_page=per_page, error_out=True, max_per_page=20)
        return jsonify(
            {"Clases": [clase.to_json() for clase in clases],
            "total": clases.total,
            "pages": clases.pages,
            "page": page})

    @role_required(roles = ["admin"])
    def post(self):
        try:
            clase = ClaseModel.from_json(request.get_json())
        except:
            return 'Formato incorrecto', 400
        db.session.add(clase)
        db.session.commit()
        return clase.to_json(), 201
    
class ClasesAlumnos(Resource):
    @jwt_required()
    def post(self, id, dni):
        alumno = db.session.query(AlumnoModel).get_or_404(dni)
        clase = db.session.query(ClaseModel).get_or_404(id)
        alumno.clases.append(clase)
        db.session.commit()
        return alumno.to_json_complete(), 201
    
    @jwt_required()
    def delete(self, id, dni):
        alumno = db.session.query(AlumnoModel).get_or_404(dni)
        clase = db.session.query(ClaseModel).get_or_404(id)
        alumno.clases.remove(clase)
        db.session.commit()
        return '', 204

class ClasesProfesores(Resource):
    @role_required(roles = ["admin"])
    def post(self, id, dni):
        profesor = db.session.query(ProfesorModel).get_or_404(dni)
        clase = db.session.query(ClaseModel).get_or_404(id)
        profesor.clases.append(clase)
        db.session.commit()
        return profesor.to_json_complete(), 201

    @role_required(roles = ["admin"])
    def delete(self, id, dni):
        profesor = db.session.query(ProfesorModel).get_or_404(dni)
        clase = db.session.query(ClaseModel).get_or_404(id)
        profesor.clases.remove(clase)
        db.session.commit()
        return '', 204