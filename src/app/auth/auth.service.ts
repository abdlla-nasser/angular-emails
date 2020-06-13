import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}
interface SignResponse {
  username: string;
}
interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}
interface SigninCredentials {
  username: string;
  password: string;
}
interface SignedinResponse {
  authenticated: boolean;
  username: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'https://api.angular-email.com/auth';
  signedin$ = new BehaviorSubject(null);
  username = '';
  constructor(private http: HttpClient) { }
  userNameAvailabe = (username: string) => {
    return this.http.post<UsernameAvailableResponse>(`${this.url}/username`, { username });
  }
  signup = (credentials: SignupCredentials) => {
    return this.http
      .post<SignResponse>(`${this.url}/signup`, credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }
  signin = (credentials: SigninCredentials) => {
    return this.http
      .post<SignResponse>(`${this.url}/signin`, credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }
  checkAuthStatus = () => {
    return this.http.get<SignedinResponse>(`${this.url}/signedin`).pipe(
      tap(({ authenticated, username }) => {
        this.signedin$.next(authenticated);
        this.username = username;
      })
    );
  }
  signout = () => {
    return this.http.post(`${this.url}/signout`, {})
      .pipe(
        tap(() => this.signedin$.next(false))
      );
  }
}
