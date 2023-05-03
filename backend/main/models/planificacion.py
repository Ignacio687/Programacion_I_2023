from .. import db, sa
from . import ProfesorModel, AlumnoModel
from datetime import datetime
class Planificacion(db.Model):
    planificacion_id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    profesor_DNI = sa.Column(sa.Integer, sa.ForeignKey(ProfesorModel.dni), nullable=False)
    alumno_DNI = sa.Column(sa.Integer, sa.ForeignKey(AlumnoModel.dni), nullable=False)
    estado = sa.Column(sa.Boolean, default=True)
    creation_date = sa.Column(sa.DateTime, nullable=False)
    profesor = db.relationship("Profesor", back_populates="planificaciones", uselist = False, single_parent = True)
    alumno = db.relationship("Alumno", back_populates="planificaciones", uselist = False, single_parent = True)
    detalles_dia = db.relationship("Detalle_dia", back_populates="planificacion", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Planificacion {self.planificacion_id}>"

    def to_json(self):
        plan_json = {
            "planificacion_id": self.planificacion_id,
            "profesor_DNI": self.profesor_DNI,
            "alumno_DNI": self.alumno_DNI,
            "estado": self.estado,
            "creation_date": str(self.creation_date.strftime("%d/%m/%Y")),
        }
        return plan_json

    def to_json_complete(self):
        plan_json = {
            "planificacion_id": self.planificacion_id,
            "estado": self.estado,
            "creation_date": str(self.creation_date.strftime("%d/%m/%Y")),
            "Profesor": self.profesor,
            "Alumno": self.alumno,
            "detalles_dia": ([detalle.to_json() for detalle in self.detalles_dia])
        }
        return plan_json

    @staticmethod
    def from_json(plan_json):
        return Planificacion(
            profesor_DNI = plan_json.get("profesor_DNI"),
            alumno_DNI = plan_json.get("alumno_DNI"),
            estado = plan_json.get("estado"),
            creation_date = datetime.strptime(plan_json.get("creation_date"), "%d/%m/%Y")
        )