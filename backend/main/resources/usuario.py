from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UsuariosModel, ProfesorModel, AlumnoModel
import regex
from datetime import datetime
from sqlalchemy import func, desc, asc

class Usuario(Resource):
    def get(self, dni):
        usuario = db.session.query(UsuariosModel).get_or_404(dni)
        return usuario.to_json_complete()

    def put(self, dni):
        usuario = db.session.query(UsuariosModel).get_or_404(dni)
        data = request.get_json().items()
        for key, value in data:
            setattr(usuario, key.lower(), value)
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201        

    def delete(self, dni):
        usuario = db.session.query(UsuariosModel).get_or_404(dni)
        db.session.delete(usuario)
        db.session.commit()
        return '', 204

class Usuarios(Resource):
    def get(self):
        page=1
        per_page=10
        usuarios = db.session.query(UsuariosModel)

        if request.args.get('page'):
            page=int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page=int(request.args.get('per_page'))
        
        if request.args.get('status'):
            usuarios = usuarios.filter(UsuariosModel.estado == request.args.get('status').lower())
        if request.args.get('by_lastname') == "":
            usuarios = usuarios.order_by(asc(UsuariosModel.apellidos))
        if request.args.get('by_dni') == "":
            usuarios = usuarios.order_by(desc(UsuariosModel.dni))


        usuarios = usuarios.paginate(page=page, per_page=per_page, error_out=True, max_per_page=20)
        return jsonify({
            "usuarios":[usuario.to_json_complete() for usuario in usuarios],
            "total": usuarios.total,
            "pages": usuarios.pages,
            "page": usuarios.page
            })

    def post(self):
        usuario = UsuariosModel.from_json(request.get_json())
        try:
            db.session.add(usuario)
            db.session.commit()
        except:
            return 'Formato no correcto', 400
        return usuario.to_json(), 201
    
class UsuarioAlumno(Resource):
    def get(self, dni):
        alumno = db.session.query(AlumnoModel).get_or_404(dni)
        return alumno.to_json_complete()

    def put(self, dni):
        alumno = db.session.query(AlumnoModel).get_or_404(dni)
        data = request.get_json().items()
        for key, value in data:
            setattr(alumno, key.lower(), value)
        db.session.add(alumno)
        db.session.commit()
        return alumno.to_json(), 201
    
class UsuariosAlumnos(Resource):
    def get(self):
        page=1
        per_page=10
        alumnos = db.session.query(AlumnoModel)

        if request.args.get('page'):
            page=int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page=int(request.args.get('per_page'))
        
        if request.args.get('status'):
            alumnos = alumnos.filter(AlumnoModel.estado == request.args.get('status').lower())
        if request.args.get('by_lastname') == "":
            alumnos = alumnos.order_by(asc(AlumnoModel.edad))
        if request.args.get('by_lastname') == "":
            alumnos = alumnos.order_by(desc(AlumnoModel.dni))     
        
        alumnos = alumnos.paginate(page=page, per_page=per_page, error_out=True, max_per_page=20)
        return jsonify({
            "alumnos":[alumnos.to_json_complete() for alumnos in alumnos],
            "total": alumnos.total,
            "pages": alumnos.pages,
            "page": alumnos.page
            })

    def post(self):
        alumno = AlumnoModel.from_json(request.get_json())
        exist = db.session.query(UsuariosModel).get_or_404(alumno.dni)
        try:
            db.session.add(alumno)
            db.session.commit()
        except:
            return 'Formato no correcto', 400
        return alumno.to_json(), 201

class UsuarioProfesor(Resource):
    def get(self, dni):
        profesor = db.session.query(ProfesorModel).get_or_404(dni)
        return profesor.to_json_complete()

    def put(self, dni):
        profesor = db.session.query(ProfesorModel).get_or_404(dni)
        data = request.get_json().items()
        for key, value in data:
            if regex.match(r"\d{2}/\d{2}/\d{4}", str(value)) != None:
                setattr(profesor, key.lower(), datetime.strptime(value, "%d/%M/%Y"))
            else: setattr(profesor, key.lower(), value)
        db.session.add(profesor)
        db.session.commit()
        return profesor.to_json() , 201

class UsuarioProfesores(Resource):
    def get(self):
        page=1
        per_page=10
        profesor = db.session.query(ProfesorModel)

        if request.args.get('page'):
            page=int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page=int(request.args.get('per_page'))
        
        if request.args.get('status'):
            profesor = profesor.filter(ProfesorModel.estado == request.args.get('status').lower())
        if request.args.get('by_lastname') == "":
            profesor = profesor.order_by(asc(ProfesorModel.especialidad))
        if request.args.get('by_lastname') == "":
            profesor = profesor.order_by(desc(ProfesorModel.dni))

        profesor = profesor.paginate(page=page, per_page=per_page, error_out=True, max_per_page=20)
        return jsonify({
            "profesores":[profesor.to_json_complete() for profesor in profesor],
            "total": profesor.total,
            "pages": profesor.pages,
            "page": profesor.page
            })
    
    def post(self):
        try:
            profesor = ProfesorModel.from_json(request.get_json())
        except:
            return 'Formato no correcto', 400
        exist = db.session.query(UsuariosModel).get_or_404(profesor.dni)
        db.session.add(profesor)
        db.session.commit()
        return profesor.to_json(), 201