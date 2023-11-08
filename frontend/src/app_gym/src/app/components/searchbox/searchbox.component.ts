import { Component } from '@angular/core';
import { ClasesService } from 'src/app/services/clases/clases.service';
@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})
export class SearchboxComponent {
  constructor(private clasesService: ClasesService) {}
  selectedOption: string = "Cualquier dia"
  dias: string[] = ['Cualquier dia','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  tipos: string[] = ['Cualquier tipo','Cardio', 'Rick', 'EstafaPiramedal'];
  horas: string[] = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM'];
  diaSeleccionado: string = 'Cualquier dia';
  tipoSeleccionado: string = 'Cualquier tipo';
  horaSeleccionada: string = '';


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

  // Función para manejar la selección de la hora
  seleccionarHora(hora: string): void {
    this.horaSeleccionada = hora;
  }
}

