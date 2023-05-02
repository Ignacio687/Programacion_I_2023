from .. import db, sa

class Usuarios(db.Model):
    dni = sa.Column(sa.Integer, primary_key=True)
    nombre = sa.Column(sa.String(100), nullable=False)
    apellidos = sa.Column(sa.String(100), nullable=False)
    telefono = sa.Column(sa.Integer, nullable=False)
    email = sa.Column(sa.String(100), nullable=False)
    estado = sa.Column(sa.Boolean, nullable=False)
    profesor = db.relationship("Profesor", uselist=False, back_populates= "usuarios",
                               cascade="all, delete-orphan", single_parent=True)
    alumno = db.relationship("Alumno", uselist = False, back_populates = "usuario", 
                              cascade = "all, delete-orphan", single_parent = True)

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
    
    def to_json_complete(self):
        usuario_json = {
            "DNI": int(self.dni),
            "Nombre": str(self.nombre),
            "Apelidos": str(self.apellidos),
            "Telefono": str(self.telefono),
            "Email": str(self.email),
            "Estado": bool(self.estado),
            "alumno" if self.alumno != None else "profesor": self.alumno if self.alumno != None else self.profesor  
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