import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpHeaders,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';

import {
    Request,
    XHRBackend,
    RequestOptions,
    Response,
    Http,
    RequestOptionsArgs,
    Headers
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class IIRPHttpInterceptor implements HttpInterceptor {


    intercept(request: HttpRequest<any>, next:HttpHandler): Observable <HttpEvent<any>>{

       /* if (request.urlWithParams.includes('ot=CurrentUser'))
        {

            console.log('append header' );
            const customRequest = request.clone(
            {
                    headers: new HttpHeaders({'authorization': 'Basic cm94eUBkNGR0LmNvbTpyb3h5cm94eQ=='})}
            );
           

            return next.handle(customRequest)
                .do ( (ev: HttpEvent<any>) => {
                    if( ev instanceof HttpResponse){
                    console.log('processing response', ev);
                }
            });
        }
        else
        {
            const sameRequest = request.clone();
            return next.handle(sameRequest)
                .do ( (ev: HttpEvent<any>) => {
                    if( ev instanceof HttpResponse){
                    console.log('processing response', ev);
                }
        });
        
        }*/

        return next.handle(request);
    }    
}
