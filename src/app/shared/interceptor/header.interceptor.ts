import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class HeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const header = localStorage.getItem('token');
    const newReq = req.clone({ headers: req.headers.set('Authorization', "Bearer" + " " + header) });
    return next.handle(newReq);
  }
}
