from .. import jwt
from flask_jwt_extended import verify_jwt_in_request, get_jwt

#Decorador para restringir el acceso a usuarios por rol
def role_required(roles):
    def decorator(fn):
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            "profesor, admin"
            if set(claims['rol'].replace(" ", "").split(",")) & set(roles):
                return fn(*args, **kwargs)
            else:
                return f'El rol {claims["rol"]} no tiene acceso al recurso', 403
        return wrapper
    return decorator

#Define el atributo que se utilizará para identificar el usuario
@jwt.user_identity_loader
def user_identity_lookup(usuario):
    return usuario.dni

#Define que atributos se guardarán dentro del token
@jwt.additional_claims_loader
def add_claims_to_access_token(usuario):
    claims = {
        'rol': usuario.rol,
        'DNI': usuario.dni,
        'email': usuario.email
    }
    return claims