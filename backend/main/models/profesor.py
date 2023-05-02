from .. import db, sa, sao
from . import UsuariosModel

class Profesor(db.Model):
    dni = sa.Column(sa.Integer, sa.ForeignKey(UsuariosModel.dni), primary_key=True)
    especialidad = sa.Column(sa.String(100), nullable=False)
    inicio_actividad = sa.Column(sa.Date, nullable=False)
    usuarios = db.relationship("Usuarios", uselist=False, back_populates= "profesor",
                               cascade= "all, delete-orphan", single_parent=True)

    def __repr__(self):
        return (
            f"<DNI: {self.dni}, Especialidad: {self.especialidad}, Inicio_actividad: {self.inicio_actividad}"
        )

    def to_json(self):
        self.usuarios = sao.session.query(UsuariosModel).get_or_404(self.dni)
        profesor_json = {
            "DNI": int(self.dni),
            "Especialidad": str(self.especialidad),
            "Inicio_actividad": str(self.inicio_actividad),
            "Usuario": self.usuarios.to_json()
        }
        return profesor_json

    @staticmethod
    def from_json(usuario_json):
        dni = usuario_json.get("DNI")
        especialidad = usuario_json.get("Especialidad")
        inicio_actividad = usuario_json.get("Inicio_actividad")
        return Profesor(
            dni = dni,
            especialidad = especialidad,
            inicio_actividad = inicio_actividad,
        )