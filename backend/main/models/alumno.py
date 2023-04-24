from .. import db

class Alumno(db.Model):
    DNI = db.Column(db.Integer, primary_key=True)
    edad = db.Column(db.Integer, nullable=False)
    sexo = db.Column(db.Boolean, nullable=False)
    usuario = db.relationship('Usuario', back_populates='usuario', cascade='all, ', single_parent=True )

    def __repr__(self):
        return '<Alumno: %r >' % (self.DNI)
    
    def to_json(self):
        alumno_json = {
            'DNI': self.DNI,
            'edad': self.edad,
            'sexo': self.sexo

        }
        return alumno_json

    def to_json_short(self):
        alumno_json = {
            'DNI': self.DNI,
            'edad': self.edad,
            'sexo': self.sexo

        }
        return alumno_json

    @staticmethod
    def from_json(json):
        DNI = json.get('DNI')
        edad = json.get('edad')
        sexo = json.get('sexo')
        return Alumno(DNI=DNI,
                    edad=edad,
                    sexo=sexo
                    )