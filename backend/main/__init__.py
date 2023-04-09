from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
import main.resources as resources
api = Api()


def create_app():
    app = Flask(__name__)
    load_dotenv()
    api.add_resource(resources.LoginResource, '/login')
    api.add_resource(resources.PagoResource, '/pago/<dni>', '/pago/<dni>/<dueDate>')
    api.add_resource(resources.ProfesorClasesResource, '/prof_clases')
    api.add_resource(resources.PlanificacionAlumnoResource, '/plan_alumno/<dni>')
    api.add_resource(resources.PlanificacionesProfesoresResource, 
                     '/plans_profs', '/plans_profs/<dni>')
    api.add_resource(resources.PlanificacionProfesorResource, '/plan_prof/<id>')
    api.add_resource(resources.UsuarioResource, '/usuario/<id>')
    api.add_resource(resources.UsuariosResource, '/usuarios')
    api.add_resource(resources.UsuarioAlumnoResource, '/alumno/<id>')
    api.add_resource(resources.UsuariosAlumnosResource, '/alumnos')
    api.add_resource(resources.UsuarioProfesorResource, '/profe/<id>')

    api.init_app(app)
    return app
