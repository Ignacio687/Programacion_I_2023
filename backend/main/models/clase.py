from .. import db, sa
from . import alumnos_clasesTable

class Clase(db.Model):
    clase_id = sa.Column(sa.Integer, primary_key=True)
    nombre = sa.Column(sa.String(50), nullable=False)
    tipo = sa.Column(sa.String(50), nullable=False)
    dia = sa.Column(sa.String(20), nullable=False)
    horario = sa.Column(sa.String(20), nullable=False)
    alumnos = db.relationship('Alumno', secondary = alumnos_clasesTable, back_populates = "clases")

    def __repr__(self):
        return (f'<Clase_id: {self.clase_id}, Nombre: {self.nombre}, '+ 
        f'Tipo: {self.tipo}, Dia: {self.dia}, Horario: {self.horario}>')

    
    def to_json(self):
        clase_json = {
            'Clase_id': self.clase_id,
            'Nombre': self.nombre,
            'Tipo': self.tipo,
            'Dia': self.dia,
            'Horario': self.horario
        }
        return clase_json
    
    def from_json(clase_json):
        clase_id = clase_json.get('Clase_id')
        nombre = clase_json.get('Nombre')
        tipo = clase_json.get('Tipo')
        dia = clase_json.get('Dia')
        horario = clase_json.get('Horario')
        
        return Clase(clase_id=clase_id,
                    nombre=nombre, 
                    tipo=tipo,
                    dia=dia,
                    horario=horario
                    )