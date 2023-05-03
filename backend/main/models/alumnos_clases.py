from .. import db, sa

alumnos_clases = db.Table(
    "alumnos_clases",
    sa.Column("clase_id", sa.Integer, sa.ForeignKey("clase.clase_id")),
    sa.Column("alumno_dni", sa.Integer, sa.ForeignKey("alumno.dni")),
    extend_existing = True
)