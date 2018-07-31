import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = environment.apiEndpoint + '/users/';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.usersUrl);
  }
}
