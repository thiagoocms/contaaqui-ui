import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthDataService} from '../network/auth/auth-data.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  private readonly authDataService: AuthDataService = inject(AuthDataService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.authDataService.logout()
          return EMPTY;
        }

        return throwError(() => error);
      }),
    );
  }
}
