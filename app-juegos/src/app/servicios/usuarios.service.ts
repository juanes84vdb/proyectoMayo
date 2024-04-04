import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private urlApi = "http://127.0.0.1:8000/usuarios/todos";
  private urlUsuario = "http://127.0.0.1:8000/usuarios/filtro";
  private urlYo = "http://localhost:8000/usuarios/perfil";
  private urlRanking = "http://localhost:8000/usuarios/ranking";
  private urlColor= "http://localhost:8000/usuarios/newcolor"
  private urlFoto= "http://localhost:8000/usuarios/newfoto"

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
  ranking() {
    return this.http.get<any[]>(this.urlRanking);
  }

  newcolor(color:any){
    let jsonData = JSON.stringify(color);
    return this.http.put<any[]>(this.urlColor, jsonData);
  }

  newfoto(foto:any){
    let jsonData = JSON.stringify(foto);
    return this.http.put<any[]>(this.urlFoto, jsonData);
  }
  usuario(id:any){
    let jsonData = JSON.stringify(id);
    return this.http.put<any[]>(this.urlUsuario, jsonData);
  }
}
