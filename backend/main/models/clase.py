from .. import db, sa
from datetime import datetime
from flask import jsonify

class Clase(db.Model):
    clase_id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    nombre = sa.Column(sa.String(50), nullable=False)
    tipo = sa.Column(sa.String(50), nullable=False)
    dia = sa.Column(sa.String(20), nullable=False)
    horario = sa.Column(sa.DateTime, nullable=False)

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
            "Alumnos": [alumno.to_json() for alumno in self.alumnos]
        }
        return clase_json
    
    def from_json(clase_json):
        clase_id = clase_json.get('Clase_id')
        nombre = clase_json.get('Nombre')
        tipo = clase_json.get('Tipo')
        dia = clase_json.get('Dia')
        horario = datetime.strptime(clase_json.get('Horario'), "%H:%M")
        
        return Clase(clase_id=clase_id,
                    nombre=nombre, 
                    tipo=tipo,
                    dia=dia,
                    horario=horario
                    )