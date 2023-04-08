from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
import main.resources as resources
api = Api()


def create_app():
    app = Flask(__name__)
    load_dotenv()

    api.add_resource(resources.AnimalesResource, '/animales')
    api.add_resource(resources.AnimalResource, '/animal/<id>')

    api.add_resource(resources.LoginResource, '/login')

    api.add_resource(resources.PagoResource, '/pago/<dni>', '/pago/<dni>/<dueDate>')

    api.add_resource(resources.ProfesorClasesResource, '/prof_clases')

    api.add_resource(resources.PlanificacionAlumnoResource, '/plan_alumno/<dni>')
    api.add_resource(resources.PlanificacionesProfesoresResource, '/plans_profs/<dni>')
    api.add_resource(resources.PlanificacionProfesorResource, '/plan_prof/<id>')

    api.add_resource(resources.UsersResource, '/users')
    api.add_resource(resources.UserResource, '/user/<id>')

    api.add_resource(resources.ProfesoresResource, '/profesores')
    api.add_resource(resources.ProfesorResource, '/profesor/<id>')

    api.init_app(app)
    return app
