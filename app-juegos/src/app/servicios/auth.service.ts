import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8000/login_check';
  private registerUrl = 'http://localhost:8000/register';
  constructor(private http: HttpClient) { }

  /**
   * Logs a user in with the given credentials.
   *
   * @param credentials - The user's credentials, including their username and password.
   * @returns An observable that emits the user's data once they have been successfully authenticated.
   */
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }
  /**
 * Registers a new user with the given credentials.
 *
 * @param credentials - The user's credentials, including their username and password.
 * @returns An observable that emits the server's response once the registration is successful.
 *          The response will contain the user's data.
 * @throws Will throw an error if the registration fails, with the server's error message.
 */
  register(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(this.registerUrl, credentials);
  }
}
