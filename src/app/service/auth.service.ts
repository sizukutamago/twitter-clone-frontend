import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { Observable } from 'rxjs';

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number | undefined;
  name: string | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private decodedToken;

  constructor(private http: HttpClient) {
    const authMeta = localStorage.getItem('auth_meta');
    if (authMeta) {
      this.decodedToken = JSON.parse(authMeta) as DecodedToken;
    } else {
      this.decodedToken = new DecodedToken();
    }
  }

  postSignUp(
    name: string,
    password: string,
  ): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(
      'http://localhost:3000/auth/signup',
      {
        name,
        password,
      },
    );
  }

  signUp(accessToken: string) {
    this.saveToken(accessToken);
    return this.isAuthenticated();
  }

  logout(): void {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');

    this.decodedToken = new DecodedToken();
  }
  private saveToken(token: string): void {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(moment.unix(this.decodedToken.exp || 0));
  }
}
