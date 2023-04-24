from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UsuariosModel, ProfesorModel

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
        return usuario.to_json() , 201        

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
    def get(self, id):
        if int(id) in USUARIOS and USUARIOS[int(id)]['Rol'] == 'alumno':
            return USUARIOS[int(id)]
        return '', 404

    def put(self, id):
        if int(id) in USUARIOS and USUARIOS[int(id)]['Rol'] == 'alumno':
            user = USUARIOS[int(id)]
            data = request.get_json()
            user.update(data)
            return '', 201
        return '', 404
    
    def delete(self, id):
        if int(id) in USUARIOS and USUARIOS[int(id)]['Rol'] == 'alumno':
            del USUARIOS[int(id)]
            return '', 204
        return '', 404
    
class UsuariosAlumnos(Resource):
    def get(self):
        alumnos = {}
        for id in USUARIOS.keys():
            if USUARIOS[id]['Rol'] == 'alumno':
                alumnos[id] = USUARIOS.get(id)
        return alumnos

    def post(self):
        user = request.get_json()
        id = int(max(USUARIOS.keys()))+1
        USUARIOS[id] = user
        return USUARIOS[id], 201

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