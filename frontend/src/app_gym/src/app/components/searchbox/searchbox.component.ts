import { Component } from '@angular/core';
import { ClasesService } from 'src/app/services/clases/clases.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent {
  constructor(private clasesService: ClasesService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      startHour: new FormControl(0),
      endHour: new FormControl(24)
    });
  }
  selectedOption: string = "Cualquier dia"
  dias: string[] = ['Cualquier dia','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  tipos: string[] = ['Cualquier tipo','Cardio', 'estiramiento', 'EstafaPiramedal'];
  diaSeleccionado: string = 'Cualquier dia';
  tipoSeleccionado: string = 'Cualquier tipo';
  form: FormGroup;
  mostrarBtnGroup: boolean = false;
  ordenarPorHora = false;

  onSwitchChange(event: Event) {
    this.ordenarPorHora = (event.target as HTMLInputElement).checked;
    this.clasesService.setOrdenarPorHora(this.ordenarPorHora);
  }

  // Función para manejar la selección del día
  seleccionarDia(dia: string): void {
    this.diaSeleccionado = dia;
    if ( dia == 'Cualquier dia'){ dia=''}
      this.clasesService.setDiaSeleccionado(dia);
  }

  // Función para manejar la selección del tipo
  seleccionarTipo(tipo: string): void {
    this.tipoSeleccionado = tipo;
    if ( tipo == 'Cualquier tipo'){ tipo=''}
      this.clasesService.setTipoSeleccionado(tipo)
  }
}

