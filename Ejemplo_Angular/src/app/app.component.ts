import { Component } from '@angular/core';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  codigo: string = '';
  consola: string = '';
  lexemas: any[] = [];
  errores: any[] = [];

  constructor(private apiService: ApiService) {}

  analizar() {
    if (this.codigo.trim() === '') {
      alert('El campo de código no puede estar vacío.');
      return;
    }

    this.apiService.analizarCodigo(this.codigo).subscribe(
      (res: { lexemas: any[]; errores: any[] }) => {
        this.lexemas = res.lexemas || [];
        this.errores = res.errores || [];
        this.imprimirEnConsola();
      },
      (err: any) => {
        console.error('Error al analizar el código:', err);
        alert('Hubo un error al comunicarse con la API.');
      }
    );
  }

  limpiar() {
    this.codigo = '';
    this.consola = '';
    this.lexemas = [];
    this.errores = [];
  }

  imprimirEnConsola() {
    // Imprimir los lexemas y los errores en la consola
    this.consola = '';
    console.log('Lexemas:', this.lexemas);
    this.lexemas.forEach((lexema) => {
      this.consola += `${lexema.tipo} - (${lexema.valor})\n`;
    });
    this.errores.forEach((error) => {
      this.consola += `${error}\n`;
    });
  }
}
