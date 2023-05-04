import os, sqlalchemy, sqlalchemy.orm
from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

api = Api()
db = SQLAlchemy()
migrate = Migrate()
sa = sqlalchemy

def create_app():
    app = Flask(__name__)
    app.config['JSON_SORT_KEYS'] = False

    load_dotenv()

    import main.resources as resources
    
    api.add_resource(resources.LoginResource, '/login')
    api.add_resource(resources.PagoResource, '/pago/<dni>', '/pago/<dni>/<dueDate>')
    api.add_resource(resources.ClaseResource, '/clase/<id>')
    api.add_resource(resources.ClasesResource, '/clases')
    api.add_resource(resources.ClasesAlumnosResource, '/alum_clas/<id>/<dni>')
    api.add_resource(resources.ClasesProfesoresResource, '/prof_clas/<id>/<dni>')
    api.add_resource(resources.PlanificacionResource, '/plan/<id>')
    api.add_resource(resources.PlanificacionesResource, '/plans')
    api.add_resource(resources.PlanificacionAlumnoResource, '/plan_alumno/<dni>')
    api.add_resource(resources.PlanificacionProfesorResource, '/plan_prof/<dni>')
    api.add_resource(resources.PlanificacionDetallesResource, '/detalle')
    api.add_resource(resources.PlanificacionDetalleResource, '/detalle/<id>/<dia>')
    api.add_resource(resources.UsuarioResource, '/usuario/<dni>')
    api.add_resource(resources.UsuariosResource, '/usuarios')
    api.add_resource(resources.UsuarioAlumnoResource, '/alumno/<dni>')
    api.add_resource(resources.UsuariosAlumnosResource, '/alumnos')
    api.add_resource(resources.UsuarioProfesorResource, '/profe/<dni>')
    api.add_resource(resources.UsuarioProfesoresResource, '/profs')
    
    if not os.path.exists(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')):
        open(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME'), 'w').close()
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')

    db.init_app(app)
    api.init_app(app)
    migrate.init_app(app,db)

    with app.app_context():
        db.create_all()
    return app
