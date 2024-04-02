import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  
  private urlApi = "http://127.0.0.1:8000/usuarios/todos";
  private urlYo = "http://localhost:8000/usuarios/perfil";
  private urlRanking="http://localhost:8000/usuarios/ranking";

  constructor(private http: HttpClient) { }

  retornar() {
    return this.http.get<any[]>(this.urlApi);
  }
  retornarYo() {
    const token = localStorage.getItem("loggedInKey");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(this.urlYo, { headers });
  }
  ranking(){
    return this.http.get<any[]>(this.urlRanking);
  }
}
