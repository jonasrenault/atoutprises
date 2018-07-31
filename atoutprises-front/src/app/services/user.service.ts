import { Injectable } from '@angular/core';
import { User, TopStats } from '../models/user';
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

  getUser(id: string) {
    return this.http.get<User>(this.usersUrl + id);
  }

  getUserStats(id: string) {
    return this.http.get<TopStats>(this.usersUrl + id + '/tops/');
  }
}
