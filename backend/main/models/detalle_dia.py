from .. import db


class Detalle_dia(db.Model):
    detalle_id = db.Column(db.Integer, primary_key=True)
    dia = db.Column(db.Integer, nullable=False)
    detalle = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<Dia {self.dia} Detealle: {self.detalle} >"

    # Convertir objeto en JSON
    def to_json(self):
        detalle_json = {"id": self.id, "dia": self.dia, "detalle": self.detalle}
        return detalle_json

    @staticmethod
    # Convertir JSON a objeto
    def from_json(detalle_json):
        return Detalle_dia(
            dia=detalle_json["dia"],
            detalle=detalle_json["detalle"],
        )
