from .. import db

class Usuarios(db.Model):
    dni = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellidos = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return (
            f"<DNI: {self.dni}, Nombre: {self.nombre}, Apellidos: {self.apellidos}, "
            + f"Telefono: {self.telefono}, Email: {self.email}, Estado: {self.estado}>"
        )

    def to_json(self):
        usuario_json = {
            "DNI": int(self.dni),
            "Nombre": str(self.nombre),
            "Apelidos": str(self.apellidos),
            "Telefono": str(self.telefono),
            "Email": str(self.email),
            "Estado": bool(self.estado)
        }
        return usuario_json

    @staticmethod
    def from_json(usuario_json):
        dni = usuario_json.get("DNI")
        nombre = usuario_json.get("Nombre")
        apellidos = usuario_json.get("Apelidos")
        telefono = usuario_json.get("Telefono")
        email = usuario_json.get("Email")
        estado = usuario_json.get("Estado")
        return Usuarios(
            dni=dni,
            nombre=nombre,
            apellidos=apellidos,
            telefono=telefono,
            email=email,
            estado=estado,
        )