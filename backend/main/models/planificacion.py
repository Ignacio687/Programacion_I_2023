from .. import db, sa
from . import ProfesorModel, AlumnoModel
from datetime import datetime

class Planificacion(db.Model):
    planificacion_id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    profesor_dni = sa.Column(sa.Integer, sa.ForeignKey(ProfesorModel.dni), nullable=False)
    alumno_dni = sa.Column(sa.Integer, sa.ForeignKey(AlumnoModel.dni), nullable=False)
    estado = sa.Column(sa.Boolean, nullable=False,default=True)
    creation_date = sa.Column(sa.DateTime, nullable=False)
    profesor = db.relationship("Profesor", back_populates="planificaciones", uselist = False, single_parent = True)
    alumno = db.relationship("Alumno", back_populates="planificaciones", uselist = False, single_parent = True)
    detalles_dia = db.relationship("Detalle_dia", back_populates="planificacion", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Planificacion {self.planificacion_id}>"

    def to_json(self):
        plan_json = {
            "planificacion_id": self.planificacion_id,
            "profesor_DNI": self.profesor_dni,
            "alumno_DNI": self.alumno_dni,
            "estado": self.estado,
            "creation_date": str(self.creation_date.strftime("%d/%m/%Y")),
        }
        return plan_json

    def to_json_complete(self):
        for index, user in enumerate([self.profesor, self.alumno]):
            if user:
                jsonObj = user.to_json()
                for key in ["Especialidad", "Inicio_actividad"] if index == 0 else ["Edad", "Sexo"]:
                    jsonObj.pop(key)
                jsonObj["Usuario"].pop("Telefono")
                jsonObj["Usuario"].pop("Rol")
            else: jsonObj = ""
            if index == 0: profesorJson = jsonObj
            else: alumnoJson = jsonObj
        dias_orden = {"Lunes": 1, "Martes": 2, "Miercoles": 3,"Miércoles": 3, "Jueves": 4, "Viernes": 5, "Sábado": 6,"Sabado": 6, "Domingo": 7}
        detalles_dia_ordenados = sorted(self.detalles_dia, key=lambda x: dias_orden[x.dia])
        plan_json = {
            "planificacion_id": self.planificacion_id,
            "estado": self.estado,
            "creation_date": str(self.creation_date.strftime("%d/%m/%Y")),
            "Profesor": profesorJson,
            "Alumno": alumnoJson,
            "detalles_dia": ([detalle.to_json() for detalle in detalles_dia_ordenados])
        }
        return plan_json

    @staticmethod
    def from_json(plan_json):
        return Planificacion(
            profesor_dni = plan_json.get("profesor_DNI"),
            alumno_dni = plan_json.get("alumno_DNI"),
            estado = plan_json.get("estado"),
            creation_date = datetime.strptime(plan_json.get("creation_date"), "%d/%m/%Y")
        )