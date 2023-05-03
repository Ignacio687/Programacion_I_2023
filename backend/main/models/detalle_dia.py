from .. import db


class Detalle_dia(db.Model):
    detalle_id = db.Column(db.Integer, db.ForeignKey('planificacion.planificacion_id'),primary_key=True, nullable=False)
    #detalle_id = db.Column(db.Integer, primary_key=True)
    dia = db.Column(db.Integer, primary_key=True, nullable=False)
    detalle = db.Column(db.String(255), nullable=False)
    planificacion = db.relationship("Planificacion", back_populates="detalle_dia", uselist=False, single_parent=True)
    def __repr__(self):
        return f"<Dia {self.dia} Detealle: {self.detalle} >"

    # Convertir objeto en JSON
    def to_json(self):
        detalle_json = {
            "detalle_id":self.detalle_id,
            "dia":self.dia,
            "detalle": self.detalle
            }
        return detalle_json

    @staticmethod
    # Convertir JSON a objeto
    def from_json(detalle_json):
        detalle_id = detalle_json.get("detalle_id")
        dia = detalle_json.get("dia")
        detalle = detalle_json.get("detalle")
        return Detalle_dia(
            detalle_id=detalle_id,
            dia=dia,
            detalle=detalle,
        )
