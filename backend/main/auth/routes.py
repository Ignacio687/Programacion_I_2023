from flask import request, Blueprint
from .. import db
from main.models import UsuariosModel
from flask_jwt_extended import create_access_token, get_jwt, jwt_required
from main.mail.functions import sendMail

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
@jwt_required(optional=True)
def register():
    usuario = UsuariosModel.from_json(request.get_json())
    # if ("admin" not in get_jwt().get("rol") if get_jwt() else False) and usuario.rol != "":
    #     return f'Solo administradores pueden habilitar cuentas', 403
    existsMail = db.session.query(UsuariosModel).filter(UsuariosModel.email == usuario.email).scalar() is not None
    existsDNI = db.session.query(UsuariosModel).filter(UsuariosModel.dni == usuario.dni).scalar() is not None
    if existsMail:
        return 'Duplicated mail', 409
    elif existsDNI:
        return 'Duplicated DNI', 409
    else:
        try:
            db.session.add(usuario)
            db.session.commit()
            register = "register_alumno" if usuario.rol == "alumno" else "register_profesor"
            if usuario.rol != "admin":
                sent = sendMail([usuario.email], "Welcome!", register, usuario = usuario)
        except Exception as error:
            db.session.rollback()
            return str(error), 409
        return usuario.to_json() , 201