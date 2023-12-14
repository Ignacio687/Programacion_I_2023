from .. import db, sa
from werkzeug.security import generate_password_hash, check_password_hash

class Usuarios(db.Model):
    dni = sa.Column(sa.Integer, primary_key=True, unique=True)
    nombre = sa.Column(sa.String(100), nullable=False)
    apellidos = sa.Column(sa.String(100), nullable=False)
    telefono = sa.Column(sa.Integer, nullable=False)
    email = sa.Column(sa.String(100), nullable=False, unique=True)
    password = sa.Column(sa.String(16), nullable=False)
    rol = sa.Column(sa.String(10), nullable=False)
    profesor = db.relationship("Profesor", uselist = False, back_populates= "usuario",
                               cascade="all, delete-orphan", single_parent = True)
    alumno = db.relationship("Alumno", uselist = False, back_populates = "usuario", 
                              cascade = "all, delete-orphan", single_parent = True)

    @property
    def plain_password(self):
        raise AttributeError("Password can not be read")
    
    @plain_password.setter
    def plain_password(self, password):
        self.password = generate_password_hash(password)
    
    def validate_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return (
            f"<DNI: {self.dni}, Email: {self.email}, Rol: {self.rol}>"
        )

    def to_json(self):
        usuario_json = {
            "DNI": int(self.dni),
            "Nombre": str(self.nombre),
            "Apellidos": str(self.apellidos),
            "Telefono": str(self.telefono),
            "Email": str(self.email),
            "Rol": str(self.rol),
        }
        return usuario_json
    
    def to_json_complete(self):
        if self.alumno != None:
            roltxt = "Alumno"
            roljson = self.alumno.to_json()
        elif self.profesor != None:
            roltxt = "Profesor"
            roljson = self.profesor.to_json()
        else: roltxt, roljson = "", ""
        if roltxt == "":
            usuario_json = {
                "DNI": self.dni,
                "Nombre": str(self.nombre),
                "Apellidos": str(self.apellidos),
                "Telefono": str(self.telefono),
                "Email": str(self.email),
                "Rol": str(self.rol),
                roltxt: roljson
            }
        else:
            usuario_json = {
                roltxt: roljson
            }
        return usuario_json

    @staticmethod
    def from_json(usuario_json):
        return Usuarios(
            dni = usuario_json.get("DNI"),
            nombre = usuario_json.get("Nombre"),
            apellidos = usuario_json.get("Apellidos"),
            telefono = usuario_json.get("Telefono"),
            email = usuario_json.get("Email"),
            plain_password = usuario_json.get("Password"),
            rol = usuario_json.get("Rol")
        )