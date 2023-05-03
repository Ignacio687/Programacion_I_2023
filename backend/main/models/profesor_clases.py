from .. import db, sa
from . import ProfesorModel, ClaseModel

profesor_clases = db.Table(
    "profesor_clases",
    sa.Column("profesor_dni", sa.ForeignKey(ProfesorModel.dni), primary_key=True),
    sa.Column("clase_id", sa.ForeignKey(ClaseModel.clase_id), primary_key=True)
)