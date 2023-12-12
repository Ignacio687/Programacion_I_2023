import { Component, Input } from '@angular/core';
import { ClasesService } from 'src/app/services/clases/clases.service';
import { ProfesorService } from 'src/app/services/user/profesor.service';
import { AlumnoService } from 'src/app/services/user/alumno.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent {
  constructor(private clasesService: ClasesService, private formBuilder: FormBuilder, private profesorService: ProfesorService, private alumnoService: AlumnoService) {
    this.form = this.formBuilder.group({
      startHour: new FormControl(0),
      endHour: new FormControl(24),
    });
    this.parentPage = ""
  }
  selectedOption: string = "Cualquier dia"
  dias: string[] = ['Cualquier dia', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  tipos: string[] = ['Cualquier tipo', 'Cardio', 'Estiramiento', 'Crossfit', 'Running'];
  diaSeleccionado: string = 'Cualquier dia';
  tipoSeleccionado: string = 'Cualquier tipo';
  stringSearch: string = '';
  form: FormGroup;
  mostrarBtnGroup: boolean = false;
  ordenarPorHora = false;
  filtroAplicado: boolean = true;

  @Input() parentPage: string;

  onSwitchChange(event: Event) {
    this.ordenarPorHora = (event.target as HTMLInputElement).checked;
    this.clasesService.setOrdenarPorHora(this.ordenarPorHora);
    this.clasesService.setFiltroAplicado(this.filtroAplicado);
  }

  seleccionarDia(dia: string): void {
    this.diaSeleccionado = dia;
    if (dia == 'Cualquier dia') { dia = '' }
    this.clasesService.setDiaSeleccionado(dia);
    this.clasesService.setFiltroAplicado(this.filtroAplicado);
  }
  buscar(keyword: string): void {
    this.stringSearch = keyword;
    if (this.parentPage === 'profesores' || this.parentPage === 'alumnos') {
      this.profesorService.setStringSearch(keyword);
      this.profesorService.setFiltroAplicado(this.filtroAplicado);
    } if (this.parentPage === 'inscripto' || this.parentPage === 'disponibles') {
      this.clasesService.setStringSearch(keyword);
      this.clasesService.setFiltroAplicado(this.filtroAplicado);
    }
  }

  seleccionarTipo(tipo: string): void {
    this.tipoSeleccionado = tipo;
    if (tipo == 'Cualquier tipo') { tipo = '' }
    this.clasesService.setTipoSeleccionado(tipo);
    this.clasesService.setFiltroAplicado(this.filtroAplicado);
  }
}

