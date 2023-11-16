import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const API_KEY = '795354887bd59a6ef7fccf174ad0fe32';
const API_TOKEN = 'ATTAcbe30b18cd7d318266afbaf98c79637f58128685e0925e5b3b4c477c12964d87C208A7D8';

@Injectable({providedIn: "root"})
export class TokenInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders : {
                Accept: 'aplication/json',
                'Authorization': 'OAuth oauth_consumer_key="' + API_KEY + '", oauth_token="' + API_TOKEN + '"'
            }
        });
        return next.handle(req);
    }
}