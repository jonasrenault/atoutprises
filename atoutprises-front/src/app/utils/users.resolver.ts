import { Injectable } from '@angular/core';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';

import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Injectable()
export class UsersResolver implements Resolve<User[]> {
  constructor(private userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    return this.userService.getUsers().pipe(
      take(1),
    );
  }
}
