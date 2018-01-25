import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHandler, HttpRequest, HttpResponse, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../routes/oidc/services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    let url = `${environment.ApiServer}${req.url}`;
    
    let authHeader = req.headers.set('Authorization', `Bearer ${this.authService.user.access_token}`);

    let _ApimSubscription = environment.ApimSubscription.filter(x => url.indexOf(x.subPath) > -1)[0];

    if (_ApimSubscription) {
      authHeader = authHeader.set('Ocp-Apim-Subscription-Key', _ApimSubscription.subKey);
    }

    //.set('Ocp-Apim-Environment', 'staging')

    const authReq = req.clone({ url: url, headers: authHeader });

    return next.handle(authReq).catch(err =>
    {
      if (err instanceof HttpErrorResponse)
      {
        console.info(`%c😱${err.url}报错啦！状态码：${err.status},错误信息：${err.message}`,
          "color: red;font-weight:bold");
      }

      return Observable.empty();
    });
  }
}

const AUTH_INTERCEPTOR = { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true };

export { AUTH_INTERCEPTOR };
