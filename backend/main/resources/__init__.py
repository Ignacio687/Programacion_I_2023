# Cambiar el nombre en la importación para clarificar y evitar conflictos
from .login import Login as LoginResource
from .pago import Pago as PagoResource
from .clases import Clase as ClaseResource
from .clases import Clases as ClasesResource
from .clases import ClasesAlumnos as ClasesAlumnosResource
from .planificacion import PlanificacionAlumno as PlanificacionAlumnoResource
from .planificacion import PlanificacionesProfesores as PlanificacionesProfesoresResource
from .planificacion import PlanificacionProfesor as PlanificacionProfesorResource
from .planificacion import PlanificacionDetalles as PlanificacionDetallesResource
from .planificacion import PlanificacionDetalle as PlanificacionDetalleResource
from .usuario import Usuario as UsuarioResource
from .usuario import Usuarios as UsuariosResource
from .usuario import UsuarioAlumno as UsuarioAlumnoResource
from .usuario import UsuariosAlumnos as UsuariosAlumnosResource
from .usuario import UsuarioProfesor as UsuarioProfesorResource
from .usuario import UsuarioProfesores as UsuarioProfesoresResource
