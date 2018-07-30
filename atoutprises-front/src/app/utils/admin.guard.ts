import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    return this.authService.checkIsUserAdmin().pipe(catchError((error: HttpErrorResponse) => {
      console.error(`User is not admin.`);
      return of(false);
    }));
  }

}
