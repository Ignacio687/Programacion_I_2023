from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UsuariosModel, ProfesorModel, AlumnoModel

# Datos de prueba en JSON
USUARIOS = {
    1: {'DNI': 77854625, 'Nombre': 'Alumno1', 'Rol': 'alumno'},
    2: {'DNI': 84981773, 'Nombre': 'Alumno2', 'Rol': 'alumno'},
    3: {'DNI': 12548952, 'Nombre': 'Profe1', 'Rol': 'profesor'},
    4: {'DNI': 49137856, 'Nombre': 'Profe2', 'Rol': 'profesor'}
}


class Usuario(Resource):
    def get(self, dni):
        usuario = db.session.query(UsuariosModel).get_or_404(dni)
        return usuario.to_json()

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
        return jsonify([usuario.to_json() for usuario in usuarios])

    def post(self):
        usuario = UsuariosModel.from_json(request.get_json())
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201
    
class UsuarioAlumno(Resource):
    def get(self, dni):
        alumno = db.session.query(AlumnoModel).get_or_404(dni)
        return alumno.to_json()

    def put(self, dni):
        alumno = db.session.query(AlumnoModel).get_or_404(dni)
        data = request.get_json().items()
        for key, value in data:
            setattr(alumno, key.lower(), value)
        db.session.add(alumno)
        db.session.commit()
        return alumno.to_json(), 201
    
    def delete(self, dni):
        alumno = db.session.query(AlumnoModel).get_or_404(dni)
        db.session.delete(alumno)
        db.session.commit()
        return '', 204
    
class UsuariosAlumnos(Resource):
    def get(self):
        alumnos = db.session.query(AlumnoModel).all()
        return jsonify([alumno.to_json() for alumno in alumnos])

    def post(self):
        alumno = AlumnoModel.from_json(request.get_json())
        db.session.add(alumno)
        db.session.commit()
        return alumno.to_json(), 201

class UsuarioProfesor(Resource):
    def get(self, dni):
        profesor = db.session.query(ProfesorModel).get_or_404(dni)
        return profesor.to_json()

    def put(self, dni):
        profesor = db.session.query(ProfesorModel).get_or_404(dni)
        data = request.get_json().items()
        for key, value in data:
            setattr(profesor, key.lower(), value)
        db.session.add(profesor)
        db.session.commit()
        return profesor.to_json() , 201