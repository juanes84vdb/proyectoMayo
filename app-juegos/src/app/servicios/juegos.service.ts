import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  private urlApi = "http://127.0.0.1:8000/juegos/todos";

  constructor(private http: HttpClient) { }

  /**
 * This method is responsible for making a GET request to the API endpoint
 * and returning the list of games.
 *
 * @returns {Observable<any[]>} An observable of an array of game objects.
 *
 * @throws Will throw an error if the request fails or if the server returns an error.
 *
 * @remarks
 * This method uses the HttpClient module to make the HTTP request.
 * The HttpClient module is provided by Angular's CommonHttpModule,
 * which must be imported in the module where this service is used.
 *
 * @example
 * ```typescript
 * import { JuegosService } from './juegos.service';
 *
 * @Component({... })
 * export class MyComponent {
 *   constructor(private juegosService: JuegosService) { }
 *
 *   ngOnInit() {
 *     this.juegosService.retornar().subscribe(
 *       (games) => {
 *         console.log(games);
 *       },
 *       (error) => {
 *         console.error('Error fetching games:', error);
 *       }
 *     );
 *   }
 * }
 * ```
 */
retornar() {
  return this.http.get<any[]>(this.urlApi);
}

}