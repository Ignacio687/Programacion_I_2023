from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UsuariosModel, ProfesorModel, AlumnoModel
import regex
from datetime import datetime

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
        usuarios = db.session.query(UsuariosModel).all()
        return jsonify([usuario.to_json_complete() for usuario in usuarios])

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
        alumnos = db.session.query(AlumnoModel).all()
        return jsonify([alumno.to_json() for alumno in alumnos])

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
        profesores = db.session.query(ProfesorModel).all()
        return jsonify([profesor.to_json() for profesor in profesores])

    def post(self):
        try:
            profesor = ProfesorModel.from_json(request.get_json())
        except:
            return 'Formato no correcto', 400
        exist = db.session.query(UsuariosModel).get_or_404(profesor.dni)
        db.session.add(profesor)
        db.session.commit()
        return profesor.to_json(), 201