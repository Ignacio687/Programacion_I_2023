from .. import db

class Clase(db.Model):
    claseID = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    tipo = db.Column(db.String(50), nullable=False)
    dia = db.Column(db.DateTime, nullable=False)
    horario = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return '<Clase: %r >' % (self.nombre)
    
    def to_json(self):
        clase_json = {
            'claseID': self.claseID,
            'nombre': self.nombre,
            'tipo': self.tipo,
            'dia': self.dia,
            'horario': self.horario
        }
        return clase_json
    
    def to_json_short(self):
        clase_json = {
            'claseID': self.claseID,
            'nombre': self.nombre,
            'tipo': self.tipo,
            'dia' : self.dia,
            'horario' : self.horario
        }
        return clase_json
    
    def from_json(json):
        claseID = json.get('claseID')
        nombre = json.get('nombre')
        tipo = json.get('tipo')
        dia = json.get('dia')
        horario = json.get('horario')
        
        return Clase(claseID=claseID,
                    nombre=nombre, 
                    tipo=tipo,
                    dia=dia,
                    horario=horario
                    )