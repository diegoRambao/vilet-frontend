import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { StorageKeys } from '../const/storage-keys';
import { StorageService } from '../domain/storage.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private storage: StorageService, private router: Router) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let request = req;

        return from(this.storage.get(StorageKeys.token)).pipe(
            switchMap((token) => {
                if (token) {
                    request = req.clone({
                        setHeaders: {
                            authorization: `Bearer ${token}`,
                        },
                    });
                }
                return next.handle(request).pipe(
                    catchError((error: HttpErrorResponse) => {
                        if (error.status === 401) {
                            this.router.navigate(['/auth/sign']);
                        }

                        return throwError(() => error);
                    })
                );
            })
        );
    }
}
