import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const cachedResponse = localStorage.getItem(request.url);
    if (cachedResponse) {
      return of(new HttpResponse({ body: JSON.parse(cachedResponse), status: 200 }));
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          localStorage.setItem(request.url, JSON.stringify(event.body));
        }
      })
    );
  }
}
