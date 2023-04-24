from .. import db

class Profesor(db.Model):
    especialidad = db.Column(db.String(100), primary_key=True)
    inicio_actividad = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return (
            f"<Especialidad: {self.especialidad}, Inicio_actividad: {self.inicio_actividad}"
        )

    def to_json(self):
        profesor_json = {
            "Especialidad": str(self.especialidad),
            "Inicio_actividad": str(self.inicio_actividad)
        }
        return profesor_json

    @staticmethod
    def from_json(usuario_json):
        especialidad = usuario_json.get("Especialidad")
        inicio_actividad = usuario_json.get("Inicio_actividad")
        return Profesor(
            especialidad = especialidad,
            inicio_actividad = inicio_actividad,
        )