from .. import db

class Usuarios(db.Model):
    dni = db.Column(db.integer(8), primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellidos = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.integer(15), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.bool, nullable=False)
    
    def __repr__(self):
        return (f'DNI: {self.dni}, Nombre: {self.nombre}, Apellidos: {self.apellidos}, '+
                f'Telefono: {self.telefono}, Email: {self.email}, Estado: {self.estado}')

    #Convertir objeto en JSON
    def to_json(self):
        usuario_json = {
            'DNI': self.dni,
            'Nombre': str(self.nombre),
            'Apelidos': self.apellidos,
            'Telefono': self.telefono,
            'Email': self.email,
            'Estado': self.estado
            }
        return usuario_json

    @staticmethod
    #Convertir JSON a objeto
    def from_json(usuario_json):
        dni = usuario_json.get()
        raza = usuario_json.get('raza')

        return Usuario(id=id,
                    raza=raza,
                    )
    
    #intentar instalar pytho