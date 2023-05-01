from .. import db, sa
from . import AlumnoModel, ClaseModel

alumnos_clases = db.Table(
    "alumnos_clases",
    sa.Column("alumno_dni", sa.ForeignKey(AlumnoModel.dni), primary_key=True),
    sa.Column("clase_id", sa.ForeignKey(ClaseModel.clase_id), primary_key=True)
)