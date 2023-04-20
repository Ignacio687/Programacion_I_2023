from .. import db


class Planificacion(db.Model):
    self.id = db.Column(db.Integer, primary_key=True)
    self.profesor_DNI = db.Column(db.Integer(8), nullable=False)
    self.alumno_DNI = db.Column(db.Integer(8), nullable=False)
    self.estado = db.Column(db.Boolean, default=False)
    self.creation_date = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f'Planificacion {self.id} {self.creation_date}'
    # Convertir objeto en JSON

    def to_json(self):
        plan_json = {
            'id': self.id,
            'profesor_DNI': self.profesor_DNI,
            'alumno_DNI': self.alumno_DNI,
            'estado': self.estado,
            'creation_date': self.creation_date,
        }
        return plan_json

    def to_json_short(self):
        plan_json = {
            'id': self.id,
            'profesor_DNI': self.profesor_DNI,
            'alumno_DNI': self.alumno_DNI,
            'estado': self.estado,
            'creation_date': self.creation_date,
        }
        return plan_json

    @staticmethod
    # Convertir JSON a objeto
    def from_json(plan_json):
        id = db.Column(db.Integer, primary_key=True)
        profesor_DNI = db.Column(db.Integer(8), nullable=False)
        alumno_DNI = db.Column(db.Integer(8), nullable=False)
        estado = db.Column(db.Boolean, default=False)
        creation_date = db.Column(db.Date, nullable=False)
        return Animal(id=id,
                      profesor_DNI=profesor_DNI,
                      alumno_DNI=alumno_DNI,
                      estado=estado,
                      creation_date=creation_date
                      )
