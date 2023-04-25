from .. import db

class Alumno(db.Model):
    dni = db.Column(db.Integer, primary_key=True)
    edad = db.Column(db.Integer, nullable=False)
    sexo = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return f'<DNI: {self.dni}, Edad: {self.edad}, Sexo: {self.sexo}>'
    
    def to_json(self):
        alumno_json = {
            'DNI': self.dni,
            'Edad': self.edad,
            'Sexo': self.sexo
        }
        return alumno_json

    @staticmethod
    def from_json(alumno_json):
        dni = alumno_json.get('DNI')
        edad = alumno_json.get('Edad')
        sexo = alumno_json.get('Sexo')
        return Alumno(dni=dni,
                    edad=edad,
                    sexo=sexo
                    )