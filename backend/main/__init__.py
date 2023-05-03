import os, sqlalchemy, sqlalchemy.orm
from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

api = Api()
db = SQLAlchemy()
sa = sqlalchemy
sao = sqlalchemy.orm

def create_app():
    app = Flask(__name__)
    app.config['JSON_SORT_KEYS'] = False

    load_dotenv()

    import main.resources as resources
    api.add_resource(resources.LoginResource, '/login')
    api.add_resource(resources.PagoResource, '/pago/<dni>', '/pago/<dni>/<dueDate>')
    #api.add_resource(resources.ProfesorClasesResource, '/prof_clases')
    api.add_resource(resources.ClaseResource, '/clase/<id>')
    api.add_resource(resources.ClasesResource, '/clases')
    api.add_resource(resources.ClasesAlumnosResource, '/alum_clas/<id>/<dni>')
    api.add_resource(resources.PlanificacionAlumnoResource, '/plan_alumno/<dni>')
    api.add_resource(resources.PlanificacionesProfesoresResource, '/plans_profs')
    api.add_resource(resources.PlanificacionProfesorResource, '/plan_prof/<dni>')
    api.add_resource(resources.PlanificacionDetallesResource, '/plan')
    api.add_resource(resources.PlanificacionDetalleResource, '/plan/<id>/<dia>')
    api.add_resource(resources.UsuarioResource, '/usuario/<dni>')
    api.add_resource(resources.UsuariosResource, '/usuarios')
    api.add_resource(resources.UsuarioAlumnoResource, '/alumno/<dni>')
    api.add_resource(resources.UsuariosAlumnosResource, '/alumnos')
    api.add_resource(resources.UsuarioProfesorResource, '/profe/<dni>')
    api.add_resource(resources.UsuarioProfesoresResource, '/profs')
    if not os.path.exists(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')):
        open(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME'), 'w').close()
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    #Url de configuración de base de datos
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')
    db.init_app(app)
    api.init_app(app)
    with app.app_context():
        db.create_all()
    return app
