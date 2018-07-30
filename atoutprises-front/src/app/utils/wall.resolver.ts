import { Injectable } from '@angular/core';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';

import { Wall } from '../models/wall';
import { WallService } from '../services/wall.service';

@Injectable()
export class WallResolver implements Resolve<Wall> {
  constructor(private wallService: WallService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Wall> {
    return this.wallService.getWalls().pipe(
      take(1),
      map(walls => {
        return walls[0];
      })
    );
  }
}
