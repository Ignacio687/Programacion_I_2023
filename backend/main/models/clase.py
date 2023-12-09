from .. import db, sa
from datetime import datetime

alumnos_clases = db.Table(
    "alumnos_clases",
    sa.Column("clase_id", sa.Integer, sa.ForeignKey("clase.clase_id")),
    sa.Column("alumno_dni", sa.Integer, sa.ForeignKey("alumno.dni")),
    extend_existing = True
)

profesores_clases = db.Table(
    "profesores_clases",
    sa.Column("clase_id", sa.Integer, sa.ForeignKey("clase.clase_id")),
    sa.Column("profesor_dni", sa.Integer, sa.ForeignKey("profesor.dni")),
    extend_existing = True
)

class Clase(db.Model):
    clase_id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    nombre = sa.Column(sa.String(50), nullable=False)
    tipo = sa.Column(sa.String(50), nullable=False)
    dia = sa.Column(sa.String(20), nullable=False)
    horario = sa.Column(sa.DateTime, nullable=False)
    alumnos = db.relationship('Alumno', secondary = alumnos_clases, 
                              backref = db.backref('clases', lazy='dynamic'))
    profesores = db.relationship('Profesor', secondary = profesores_clases, 
                              backref = db.backref('clases', lazy='dynamic'))

    def __repr__(self):
        return (f'<Clase_id: {self.clase_id}, Nombre: {self.nombre}, '+ 
        f'Tipo: {self.tipo}, Dia: {self.dia}, Horario: {self.horario}>')

    def to_json(self):
        clase_json = {
            "Clase_id": self.clase_id,
            "Nombre": str(self.nombre),
            "Tipo": str(self.tipo),
            "Dia": str(self.dia),
            "Horario":  str(self.horario.strftime("%H:%M"))
        }
        return clase_json
    
    def to_json_complete(self):
        clase_json = {
            "Clase_id": self.clase_id,
            "Nombre": str(self.nombre),
            "Tipo": str(self.tipo),
            "Dia": str(self.dia),
            "Horario": str(self.horario.strftime("%H:%M")),
            "Alumnos": [alumno.to_json() for alumno in self.alumnos],
            "Profesores": [profesor.to_json() for profesor in self.profesores]
        }
        return clase_json
    
    def from_json(clase_json):
        print(clase_json.get("Horario"))
        return Clase(clase_id = clase_json.get("Clase_id"),
                    nombre = clase_json.get("Nombre"), 
                    tipo = clase_json.get("Tipo"),
                    dia = clase_json.get("Dia"),
                    horario = datetime.strptime(clase_json.get("Horario"), "%H:%M")
                    )