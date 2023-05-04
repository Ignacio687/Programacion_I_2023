from .. import db, sa
from . import UsuariosModel

class Alumno(db.Model):
    dni = sa.Column(sa.Integer, sa.ForeignKey(UsuariosModel.dni), primary_key=True)
    edad = sa.Column(sa.Integer, nullable=False)
    sexo = sa.Column(sa.Boolean, nullable=False)
    planificaciones = db.relationship("Planificacion", back_populates="alumno", cascade="all, delete-orphan")
    usuario = db.relationship("Usuarios", uselist = False, back_populates = "alumno", 
                              cascade = "all, delete-orphan", single_parent = True)

    def __repr__(self):
        return f'<DNI: {self.dni}, Edad: {self.edad}, Sexo: {self.sexo}>'
    
    def to_json(self):
        alumno_json = {
            "DNI": self.dni,
            "Edad": self.edad,
            "Sexo": self.sexo,
        }
        return alumno_json
    
    def to_json_complete(self):
        alumno_json = {
            "Edad": self.edad,
            "Sexo": self.sexo,
            "Usuario": self.usuario.to_json() if self.usuario != None else "",
            "Clases": [clase.to_json() for clase in self.clases],
            "Planificaciones" : [planificacion.to_json() for planificacion in self.planificaciones]
        }
        return alumno_json

    @staticmethod
    def from_json(alumno_json):
        return Alumno(dni = alumno_json.get('DNI'),
                    edad = alumno_json.get('Edad'),
                    sexo= alumno_json.get('Sexo')
                    )