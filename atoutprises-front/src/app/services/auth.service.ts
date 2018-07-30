import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap, map } from 'rxjs/operators';
import * as moment from 'moment';
import * as jwt_decode from 'jwt-decode';
import { environment } from '../../environments/environment';

export const TOKEN_NAME = 'jwt_token';
export const EXPIRATION_NAME = 'expires_at';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = environment.apiEndpoint + '/api-token-auth/';
  private isAdminUrl = environment.apiEndpoint + '/profile/isadmin/';

  constructor(private http: HttpClient) {
  }

  checkIsUserAdmin() {
    return this.http.get<boolean>(this.isAdminUrl);
  }

  login(email: string, password: string) {
    return this.http.post<User>(this.loginUrl, { email, password }).pipe(
      map(res => this.setSession(res)),
      shareReplay()
    );
  }

  private setSession(authResult) {
    const decoded = jwt_decode(authResult.token);
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    const expiresAt = moment(date);

    localStorage.setItem(TOKEN_NAME, authResult.token);
    localStorage.setItem(EXPIRATION_NAME, JSON.stringify(expiresAt.valueOf()));
    return new User(decoded.user_id, decoded.email);
  }

  logout() {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(EXPIRATION_NAME);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem(EXPIRATION_NAME) || '0';
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }

}
