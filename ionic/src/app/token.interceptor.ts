import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SpinnerService } from './services/spinner.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private readonly spinnerService: SpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinnerService.show();
    const authToken = localStorage.getItem("st_1892@121");

    const authRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`)
    });

    return next.handle(authRequest).pipe(
      finalize(() => this.spinnerService.hide())
    )
  }
}
