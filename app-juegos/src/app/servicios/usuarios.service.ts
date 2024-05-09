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

  /**
 * This function is used to retrieve all users from the API.
 *
 * @returns {Observable<any[]>} An observable of an array of user objects.
 *
 * @example
 * ```typescript
 * usuariosService.retornar().subscribe(users => {
 *   console.log(users);
 * });
 * ```
 */
retornar() {
  return this.http.get<any[]>(this.urlApi);
}
  /**
 * This function is used to retrieve the logged in user's information from the API.
 * It sends an HTTP GET request with an Authorization header containing the JWT token.
 *
 * @returns {Observable<any[]>} An observable of an array of user objects.
 *
 * @example
 * ```typescript
 * usuariosService.retornarYo().subscribe(user => {
 *   console.log(user);
 * });
 * ```
 *
 * @throws Will throw an error if the token is not found in localStorage.
 * @throws Will throw an error if the HTTP request fails.
 */
retornarYo() {
    const token = localStorage.getItem("loggedInKey");
    if (!token) {
        throw new Error("Token not found in localStorage");
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(this.urlYo, { headers });
}
  /**
 * This function is used to retrieve the ranking of users from the API.
 * It sends an HTTP GET request to the specified URL.
 *
 * @returns {Observable<any[]>} An observable of an array of user objects.
 * The array is sorted by a ranking attribute, which represents the user's position in the ranking.
 *
 * @example
 * ```typescript
 * usuariosService.ranking().subscribe(ranking => {
 *   console.log(ranking);
 * });
 * ```
 *
 * @throws Will throw an error if the HTTP request fails.
 */
ranking() {
    return this.http.get<any[]>(this.urlRanking);
}

  /**
 * This function is used to send a PUT request to the API to update the user's color preference.
 * It takes an object containing the new color as a parameter.
 *
 * @param color - An object containing the new color. The object should have a 'color' property.
 * @returns {Observable<any[]>} An observable of an array of user objects.
 *
 * @example
 * ```typescript
 * const newColor = { color: "#FF0000" };
 * usuariosService.newcolor(newColor).subscribe(response => {
 *   console.log(response);
 * });
 * ```
 *
 * @throws Will throw an error if the 'color' property is not provided in the input object.
 * @throws Will throw an error if the HTTP request fails.
 */
newcolor(color:any){
    let jsonData = JSON.stringify(color);
    return this.http.put<any[]>(this.urlColor, jsonData);
}

  /**
 * This function is used to send a PUT request to the API to update the user's profile picture.
 * It takes an object containing the new profile picture as a parameter.
 *
 * @param foto - An object containing the new profile picture. The object should have a 'foto' property.
 * @returns {Observable<any[]>} An observable of an array of user objects.
 *
 * @example
 * ```typescript
 * const newFoto = { foto: "new_profile_picture.jpg" };
 * usuariosService.newfoto(newFoto).subscribe(response => {
 *   console.log(response);
 * });
 * ```
 *
 * @throws Will throw an error if the 'foto' property is not provided in the input object.
 * @throws Will throw an error if the HTTP request fails.
 */
newfoto(foto:any){
    let jsonData = JSON.stringify(foto);
    return this.http.put<any[]>(this.urlFoto, jsonData);
}
  /**
 * This function is used to send a PUT request to the API to filter users based on certain criteria.
 * It takes an object containing the filter criteria as a parameter.
 *
 * @param id - An object containing the filter criteria. The object should have an 'id' property.
 * @returns {Observable<any[]>} An observable of an array of user objects.
 *
 * @example
 * ```typescript
 * const filterCriteria = { id: 123 };
 * usuariosService.usuario(filterCriteria).subscribe(filteredUsers => {
 *   console.log(filteredUsers);
 * });
 * ```
 *
 * @throws Will throw an error if the 'id' property is not provided in the input object.
 * @throws Will throw an error if the HTTP request fails.
 */
usuario(id:any){
    let jsonData = JSON.stringify(id);
    return this.http.put<any[]>(this.urlUsuario, jsonData);
}
}
