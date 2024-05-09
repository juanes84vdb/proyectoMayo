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

  /**
 * This function is used to retrieve the game board based on the provided game ID.
 *
 * @param id - An array of game IDs.
 * @returns An Observable of type any[] containing the game board data.
 *
 * @remarks
 * This function sends a PUT request to the server with the provided game IDs.
 * The server then returns the corresponding game board data.
 *
 * @example
 * ```typescript
 * const gameIds = [1, 2, 3];
 * partidasService.retornarTablero(gameIds).subscribe((data) => {
 *   console.log(data); // Output: The game board data
 * });
 * ```
 */
retornarTablero(id: any[]) {
    let jsonData = JSON.stringify(id);
    return this.http.put<any[]>(this.urlApiP, jsonData);
}

  /**
 * This function is used to update a game partida in the database.
 *
 * @param partida - An array of game partida data.
 * @returns An Observable of type any containing the server response.
 *
 * @remarks
 * This function sends a PUT request to the server with the provided game partida data.
 * The server then updates the corresponding game partida in the database.
 *
 * @example
 * ```typescript
 * const partidaData = [{ id: 1, player1: 'Player1', player2: 'Player2', status: 'In Progress' }];
 * partidasService.updatePartida(partidaData).subscribe((response) => {
 *   console.log(response); // Output: The server response
 * });
 * ```
 */
updatePartida(partida: any[]): Observable<any> {
    let jsonData = JSON.stringify(partida);
    return this.http.put<any>(this.updateUrl, jsonData);
}
  /**
 * This function is used to create a new game partida in the database.
 *
 * @param data - An array of game partida data.
 * @returns An Observable of type any containing the server response.
 *
 * @remarks
 * This function sends a PUT request to the server with the provided game partida data.
 * The server then creates a new game partida in the database.
 *
 * @example
 * ```typescript
 * const partidaData = [{ player1: 'Player1', player2: 'Player2', status: 'In Progress' }];
 * partidasService.newPartida(partidaData).subscribe((response) => {
 *   console.log(response); // Output: The server response
 * });
 * ```
 */
newPartida(data: any[]): Observable<any> {
    let jsonData = JSON.stringify(data);
    return this.http.put<any>(this.newUrl, jsonData);
}
  /**
 * This function is used to retrieve game partidas based on a filter.
 *
 * @param filtro - An array of filter criteria.
 * @returns An Observable of type any containing the server response.
 *
 * @remarks
 * This function sends a PUT request to the server with the provided filter criteria.
 * The server then returns the corresponding game partidas based on the filter.
 *
 * @example
 * ```typescript
 * const filterCriteria = [{ player: 'Player1', status: 'In Progress' }];
 * partidasService.PartidasUsuario(filterCriteria).subscribe((response) => {
 *   console.log(response); // Output: The server response containing filtered game partidas
 * });
 * ```
 */
PartidasUsuario(filtro: any[]): Observable<any> {
    let jsonData = JSON.stringify(filtro);
    return this.http.put<any>(this.userPartidas, jsonData);
}
}
