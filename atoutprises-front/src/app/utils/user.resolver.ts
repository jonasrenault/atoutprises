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
export class UserResolver implements Resolve<User> {
  constructor(private userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    const id = route.paramMap.get('id');

    return this.userService.getUser(id).pipe(
      take(1),
    );
  }
}
