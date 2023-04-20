import os
from main import create_app
# from main.models import Planificacion
# from datetime import date
app = create_app()
app.app_context().push()

if __name__ == "__main__":
    app.run(debug=True, port=os.getenv("PORT"))
    # planificacion = Planificacion(
    #     profesor_DNI=12345678,
    #     alumno_DNI=87654321,
    #     estado=False,
    #     creation_date=date.today()
    # )

    # # Agregar la planificación a la base de datos
    # db.session.add(planificacion)
    # db.session.commit()
