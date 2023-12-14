from flask import request, Blueprint
from .. import db
from main.models import UsuariosModel
from flask_jwt_extended import create_access_token, get_jwt, jwt_required
from main.mail.functions import sendMail
import datetime
from main.resources import UsuarioResource

auth = Blueprint('auth', __name__, url_prefix='/auth')

@auth.route('/recover-pass', methods=['POST'])
def recoverPass():
    email = request.get_json().get('email')
    existsMail = db.session.query(UsuariosModel).filter(UsuariosModel.email == email).scalar() is not None
    usuario = db.session.query(UsuariosModel).filter(UsuariosModel.email == email).first()
    if not usuario:
        return 'Mail no registrado', 409
    usuario.rol = "recover-pass"
    access_token = create_access_token(identity=usuario, expires_delta=datetime.timedelta(minutes=10))
    if existsMail:
        result = sendMail([email], "Recupera tu contraseña", "recover_pass", usuario=usuario, token=access_token)
        if result:
            return {"message": 'Correo de recuperación enviado exitosamente'}, 200
        else:
            return 'Error al enviar el correo de recuperación' , 500
    else:
        return 'Mail no registrado', 409

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

@auth.route('/register', methods=['POST'])
@jwt_required(optional=True)
def register():
    usuario = UsuariosModel.from_json(request.get_json())
    existsMail = db.session.query(UsuariosModel).filter(UsuariosModel.email == usuario.email).scalar()
    existsDNI = db.session.query(UsuariosModel).filter(UsuariosModel.dni == usuario.dni).scalar()
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

