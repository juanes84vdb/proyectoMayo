import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {
  private urlApiP ="http://localhost:8000/partidas/partida";
  private updateUrl ="http://localhost:8000/partidas/todos";

  constructor(private http: HttpClient) { }

  retornarTablero() {
    return this.http.get<any[]>(this.urlApiP);
  }

  updatePartida(partida: any[]): Observable<any> {
    let jsonData = JSON.stringify(partida);
    return this.http.put<any>(this.updateUrl, jsonData);
  }
}
