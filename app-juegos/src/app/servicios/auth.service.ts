import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8000/login_check';
  private registerUrl = 'http://localhost:8000/register';
  constructor(private http: HttpClient) {}

  /**
   * Logs a user in with the given credentials.
   *
   * @param credentials - The user's credentials, including their username and password.
   * @returns An observable that emits the user's data once they have been successfully authenticated.
   */
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }
  register(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(this.registerUrl, credentials);
  }
}
