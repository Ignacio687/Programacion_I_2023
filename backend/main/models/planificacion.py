from .. import db


class Planificacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    profesor_DNI = db.Column(db.Integer(8), nullable=False)
    alumno_DNI = db.Column(db.Boolean(8), nullable=False)
    estado = db.Column(db.Boolean(), default=False, )
    creation_date = db.Column(db.Date, nullable=False)
    def __repr__(self):
        return f'Planificacion {self.id}'
    # Convertir objeto en JSON

    def to_json(self):
        plan_json = {
            'id': id,
            'profesor_DNI': self.profesor_DNI,
            'alumno_DNI': self.alumno_DNI,
            'estado': self.estado,
            'creation_date': self.creation_date,
        }
        return plan_json

    def to_json_short(self):
        plan_json = {
            'alumno_DNI': self.alumno_DNI,
            'estado': self.estado,
            'creation_date': self.creation_date,
        }
        return plan_json

    @staticmethod
    # Convertir JSON a objeto
    def from_json(plan_json):
        return Planificacion(
            profesor_DNI=plan_json['profesor_DNI'],
            alumno_DNI=plan_json['alumno_DNI'],
            estado=plan_json['estado'],
            creation_date=plan_json['creation_date']
        )
