import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { environment } from 'environments/environment';
import { Observable, of, switchMap, throwError } from 'rxjs';

@Injectable()
export class AuthService {
  protected apiUrl: string = environment.apiUrl;
  private _authenticated: boolean = false;

  constructor(private _httpClient: HttpClient) {}

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  signIn(credentials: { usuario: string; senha: string }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this._httpClient.post(this.apiUrl + 'administrador', credentials).pipe(
      switchMap((response: any) => {
        // Store the access token in the local storage

        this.accessToken = response.data.accessToken;

        // Set the authenticated flag to true
        this._authenticated = true;

        // Return a new observable with the response
        return of(response);
      })
    );
  }

  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }

    // If the access token exists and it didn't expire, sign in using it
    // return this.signInUsingToken();
    return of(true);
  }
}
