from flask_restful import Resource
from flask import request

# Datos de prueba en JSON
USUARIOS = {
    1: {'DNI': 77854625, 'Nombre': 'Alumno1', 'Rol': 'alumno'},
    2: {'DNI': 84981773, 'Nombre': 'Alumno2', 'Rol': 'alumno'},
    3: {'DNI': 12548952, 'Nombre': 'Profe1', 'Rol': 'profesor'},
    4: {'DNI': 49137856, 'Nombre': 'Profe2', 'Rol': 'profesor'}
}


class Usuario(Resource):
    def get(self, id):
        if int(id) in USUARIOS:
            return USUARIOS[int(id)]
        return '', 404

    def put(self, id):
        if int(id) in USUARIOS:
            user = USUARIOS[int(id)]
            data = request.get_json()
            user.update(data)
            return '', 201
        return '', 404
    
    def delete(self, id):
        if int(id) in USUARIOS:
            del USUARIOS[int(id)]
            return '', 204
        return '', 404

class Usuarios(Resource):
    def get(self):
        return USUARIOS

    def post(self):
        user = request.get_json()
        id = int(max(USUARIOS.keys()))+1
        USUARIOS[id] = user
        return USUARIOS[id], 201
    
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
    def get(self, id):
        if int(id) in USUARIOS and USUARIOS[int(id)]['Rol'] == 'profesor':
            return USUARIOS[int(id)]
        return '', 404

    def put(self, id):
        if int(id) in USUARIOS and USUARIOS[int(id)]['Rol'] == 'profesor':
            profesor = USUARIOS[int(id)]
            data = request.get_json()
            profesor.update(data)
            return '', 201
        return '', 404