from .. import db, sa
from . import PlanificacionModel

class Detalle_dia(db.Model):
    planificacion_id = sa.Column(sa.Integer, sa.ForeignKey(PlanificacionModel.planificacion_id), primary_key=True, nullable=False)
    dia = sa.Column(sa.String(20), primary_key=True, nullable=False)
    detalle = sa.Column(sa.String(255), nullable=False)
    planificacion = db.relationship("Planificacion", back_populates= "detalles_dia", uselist=False, single_parent=True)
    
    def __repr__(self):
        return f"<Dia {self.dia} Detealle: {self.detalle}>"

    def to_json(self):
        detalle_json = {
            "planificacion_id":self.planificacion_id,
            "dia":self.dia,
            "planificacion": self.detalle
            }
        return detalle_json
    
    def to_json_complete(self):
        detalle_json = {
            "planificacion_id":self.planificacion_id,
            "dia":self.dia,
            "planificacion": self.detalle,
            "Planificacion": self.planificacion
            }
        return detalle_json

    @staticmethod
    def from_json(detalle_json):
        return Detalle_dia(
            detalle_id = detalle_json.get("planificacion_id"),
            dia = detalle_json.get("dia"),
            detalle = detalle_json.get("detalle"),
        )
