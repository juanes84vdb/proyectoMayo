import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {
  private urlApiP ="http://localhost:8000/partidas/todos";

  constructor(private http: HttpClient) { }

  retornarTablero() {
    return this.http.get<any[]>(this.urlApiP);
  }
}
