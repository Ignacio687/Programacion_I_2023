from .. import db, sa, sao
from . import UsuariosModel, alumnos_clasesTable
from flask import jsonify

class Alumno(db.Model):
    dni = sa.Column(sa.Integer, sa.ForeignKey(UsuariosModel.dni), primary_key=True)
    edad = sa.Column(sa.Integer, nullable=False)
    sexo = sa.Column(sa.Boolean, nullable=False)
    usuario = db.relationship("Usuarios", uselist = False, back_populates = "alumno", 
                              cascade = "all, delete-orphan", single_parent = True)
    clases = db.relationship('Clase', secondary = alumnos_clasesTable, backref = "alumnos")

    def __repr__(self):
        return f'<DNI: {self.dni}, Edad: {self.edad}, Sexo: {self.sexo}>'
    
    def to_json(self):
        alumno_json = {
            "DNI": self.dni,
            "Edad": self.edad,
            "Sexo": self.sexo,
            "Clases": [clase.to_json() for clase in self.clases]
        }
        print(self.usuario.to_json())
        return alumno_json

    @staticmethod
    def from_json(alumno_json):
        dni = alumno_json.get('DNI')
        edad = alumno_json.get('Edad')
        sexo = alumno_json.get('Sexo')
        return Alumno(dni=dni,
                    edad=edad,
                    sexo=sexo
                    )