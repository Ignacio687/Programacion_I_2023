from .. import db
from datetime import datetime


class Planificacion(db.Model):
    planificacion_id = db.Column(db.Integer, primary_key=True)
    profesor_DNI = db.Column(db.Integer, nullable=False)
    alumno_DNI = db.Column(db.Integer, nullable=False)
    estado = db.Column(db.Boolean, default=False)
    creation_date = db.Column(db.String(10), nullable=False)

    def __repr__(self):
        return f"<Planificacion {self.planificacion_id}>"

    # Convertir objeto en JSON

    def to_json(self):
        plan_json = {
            "planificacion_id": self.planificacion_id,
            "profesor_DNI": self.profesor_DNI,
            "alumno_DNI": self.alumno_DNI,
            "estado": self.estado,
            "creation_date": self.creation_date,
        }
        return plan_json

    @staticmethod
    # Convertir JSON a objeto
    def from_json(plan_json):
        return Planificacion(
            ##!! Agregar plan id?
            profesor_DNI=plan_json.get("profesor_DNI"),
            alumno_DNI=plan_json.get("alumno_DNI"),
            estado=plan_json.get("estado"),
            creation_date=plan_json.get("creation_date"),
        )
"""creation_date=datetime.strptime(
                plan_json.get("creation_date"), "%Y-%m-%d"
            ).date(),"""