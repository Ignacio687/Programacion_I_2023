from .. import db, sa
from datetime import datetime
from . import UsuariosModel

class Profesor(db.Model):
    dni = sa.Column(sa.Integer, sa.ForeignKey(UsuariosModel.dni), primary_key=True)
    especialidad = sa.Column(sa.String(100), nullable=False)
    inicio_actividad = sa.Column(sa.DateTime, nullable=False)
    planificaciones = db.relationship("Planificacion", back_populates="profesor", cascade="all, delete-orphan")
    usuario = db.relationship("Usuarios", uselist=False, back_populates= "profesor",
                               cascade= "all, delete-orphan", single_parent=True)

    def __repr__(self):
        return (
            f"<DNI: {self.dni}, Especialidad: {self.especialidad}, Inicio_actividad: {self.inicio_actividad}"
            )

    def to_json(self):
        profesor_json = {
            "DNI": int(self.dni),
            "Especialidad": str(self.especialidad),
            "Inicio_actividad": str(self.inicio_actividad.strftime("%d/%M/%Y")),
        }
        return profesor_json
    
    def to_json_complete(self):
        profesor_json = {
            "Especialidad": str(self.especialidad),
            "Inicio_actividad": str(self.inicio_actividad.strftime("%d/%M/%Y")),
            "Usuario": self.usuario.to_json() if self.usuario != None else "",
            "Clases": [clase.to_json() for clase in self.clases],
            "Planificaciones": [planificacion.to_json() for planificacion in self.planificaciones]
        }
        return profesor_json

    @staticmethod
    def from_json(usuario_json):
        return Profesor(
            dni = usuario_json.get("DNI"),
            especialidad = usuario_json.get("Especialidad"),
            inicio_actividad = datetime.strptime(usuario_json.get("Inicio_actividad"), "%d/%M/%Y"),
        )