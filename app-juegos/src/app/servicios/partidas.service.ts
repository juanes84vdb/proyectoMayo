import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {
  private urlApiP = "http://localhost:8000/partidas/partida";
  private updateUrl = "http://localhost:8000/partidas/partidaupdate";
  private userPartidas = "http://127.0.0.1:8000/usuarios/partidas";
  private newUrl = "http://127.0.0.1:8000/partidas/partidanew";

  constructor(private http: HttpClient) { }

  retornarTablero(id: any[]) {
    let jsonData = JSON.stringify(id);
    //  console.log(jsonData);
    return this.http.put<any[]>(this.urlApiP, jsonData);
  }

  updatePartida(partida: any[]): Observable<any> {
    let jsonData = JSON.stringify(partida);
    return this.http.put<any>(this.updateUrl, jsonData);
  }
  newPartida(data: any[]): Observable<any> {
    let jsonData = JSON.stringify(data);
    //  console.log(jsonData);
    return this.http.put<any>(this.newUrl, jsonData);
  }
  PartidasUsuario(filtro: any[]): Observable<any> {
    let jsonData = JSON.stringify(filtro);
    //  console.log(jsonData);
    return this.http.put<any>(this.userPartidas, jsonData);
  }
}
