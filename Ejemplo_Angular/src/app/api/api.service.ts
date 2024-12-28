import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = 'http://localhost:3000'; // URL de la API, cambiar por la URL de la API que se vaya a consumir

  constructor(
    private http: HttpClient
  ) { }

  // Enviar la información a analizar a la API (texto plano, método POST)
  analizarCodigo(codigo: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(`${this.apiURL}/analizar`, codigo, { headers });
  }
}