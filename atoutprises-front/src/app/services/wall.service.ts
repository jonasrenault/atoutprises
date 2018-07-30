import { Injectable } from '@angular/core';
import { Wall } from '../models/wall';
import { Route } from '../models/route';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WallService {

  private mursUrl = environment.apiEndpoint + '/walls';
  private routesUrl = environment.apiEndpoint + '/routes';
  constructor(private http: HttpClient) { }

  getWalls() {
    return this.http.get<Wall[]>(this.mursUrl)
      .pipe(catchError(this.handleError('getting walls')));
  }

  createTiles(mur: Wall, maxZoom: number) {
    const tilesUrl = `${this.mursUrl}/${mur.id}/tile/`;
    return this.http.get<Wall>(tilesUrl).pipe(catchError(this.handleError('creating tiles')));
  }

  getRoutes() {
    return this.http.get<Route[]>(this.routesUrl).pipe(catchError(this.handleError('getting routes')));
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
      }

      // return an observable with a user-facing error message
      return throwError(`An error occured while ${operation}. Please try again later.`);
    };
  }
}
