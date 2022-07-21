import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

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

  signUp(name: string, password: string) {
    console.log({ name });
    this.http
      .post<{ accessToken: string }>('http://localhost:3000/auth/signup', {
        name,
        password,
      })
      .subscribe((token) => {
        this.saveToken(token.accessToken);
      });
  }

  logout(): void {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');

    this.decodedToken = new DecodedToken();
  }
  private saveToken(token: string): string {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));

    return token;
  }

  public isAuthenticated(): boolean {
    console.log(this.decodedToken);
    return moment().isBefore(moment.unix(this.decodedToken.exp || 0));
  }
}
