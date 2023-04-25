from .. import db

class Clase(db.Model):
    clase_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    tipo = db.Column(db.String(50), nullable=False)
    dia = db.Column(db.String(20), nullable=False)
    horario = db.Column(db.String(20), nullable=False)

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