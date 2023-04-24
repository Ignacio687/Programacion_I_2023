from .. import db

class Profesor(db.Model):
    dni = db.Column(db.Integer, primary_key=True)
    especialidad = db.Column(db.String(100), nullable=False)
    inicio_actividad = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return (
            f"<DNI: {self.dni}, Especialidad: {self.especialidad}, Inicio_actividad: {self.inicio_actividad}"
        )

    def to_json(self):
        profesor_json = {
            "DNI": int(self.dni),
            "Especialidad": str(self.especialidad),
            "Inicio_actividad": str(self.inicio_actividad)
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