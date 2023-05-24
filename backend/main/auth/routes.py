from flask import request, Blueprint
from .. import db
from main.models import UsuariosModel
from flask_jwt_extended import create_access_token, get_jwt_identity, get_jwt
from main.auth.decorators import role_required

auth = Blueprint('auth', __name__, url_prefix='/auth')

@auth.route('/login', methods=['POST'])
def login():
    usuario = db.session.query(UsuariosModel).filter(UsuariosModel.email == request.get_json().get("email")).first_or_404()
    if usuario.validate_password(request.get_json().get("password")):
        access_token = create_access_token(identity=usuario)
        data = {
            'DNI': str(usuario.dni),
            'email': usuario.email,
            'access_token': access_token
        }
        return data, 200
    else:
        return 'Incorrect password', 401

#Ver si vamos a agregar un estado en usuarios, de manera que un alumno pueda hacer un "pre-registro"
#para luego poder ser comprobado y aceptado por un admin o prof cambiando el estado, pero mientras este 
#el estado en False no pueda a acceder a ningun recurso que requiera jwt

@auth.route('/register', methods=['POST'])
@role_required(roles = ["admin","profesor"])
def register():
    usuario = UsuariosModel.from_json(request.get_json())
    if "admin" not in get_jwt().get("rol") and usuario.rol != "alumno":
        return f'Solo administradores pueden registrar profesores o administradores', 403
    exists = db.session.query(UsuariosModel).filter(UsuariosModel.email == usuario.email).scalar() is not None
    if exists:
        return 'Duplicated mail', 409
    else:
        try:
            db.session.add(usuario)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            return str(error), 409
        return usuario.to_json() , 201