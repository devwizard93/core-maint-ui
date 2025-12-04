import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private tokenKey = 'authToken'; // única fuente de verdad
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<{ message: string; token?: string }>(`${this.apiUrl}/login`, { username, password }) /** este metodo devuelve automaticamente un observable */
      .pipe(
        tap(res => {
          if (res?.token) {
            this.setToken(res.token);
            this.loggedIn.next(true);
          }
        }),
        catchError(err => {
          const msg = err.error?.error || 'Error en login';
          return throwError(() => new Error(msg));
        })
      );
  }

  register(user: any) {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, user);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
  }

  // getter/setter centralizados
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.loggedIn.next(true);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  // Optional: decode exp if you want to check expiry
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      return !isExpired;
    } catch {
      return false;
    }
  }
}
