import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseurl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, public router: Router) {}
 
  // Sign-up
  signUp(user: User): Observable<any> {
    return this.http.post(this.baseurl + '/register', user);
  }

  // Sign-in
  signIn(user: any): Observable<any> {
    return this.http.post<any>(this.baseurl + '/login', user);
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem('access_token');
  }

  // Check if user is logged in
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null;
  }

  // Logout user
  doLogout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }

  // Error handling
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      msg = error.error.message;
    } else {
      // Server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  // Refresh token
  refreshToken(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(`${this.baseurl}/users/refreshToken/`, { refreshToken: token }, httpOptions);
  }

  setLoggedInUserId(userId: string): void {
    localStorage.setItem('user_id', userId);
  }

  // Get logged-in user ID from localStorage
  getLoggedInUserIdFromStorage(): number | null {
    const userId = localStorage.getItem('user_id');
    return userId ? +userId : null; // Parse the stored value as a number or return null
  }

  // Get logged-in user data
  getLoggedInUser(): any {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
}
