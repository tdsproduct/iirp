import { Injectable, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../data-models/common';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ImportService implements OnInit {
    @Input() dataString:string;
    jsonBody = {};
    
    importDataEndpoint = 'https://api.iotworldlabs.io/iirp/?guid=d97a3ae7-8f2f-4789-9f61-62b5a2ef6ce5&a=import';
    importFormatJson = '&fmt=json'; 
    importObject = '&ot='
    
    //-- Inject HttpClient into your component or service
    constructor(private http: HttpClient,private router: Router, private route: ActivatedRoute) {
    }
    
    ngOnInit(): void {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
    }
    
    /*****
     * NOTE: Not implemented yet. Need to revisit when the APIs are finalized.
     * CREATE Authorization Headers
     ************************************/
    createAuthorizationHeaders(headers: HttpHeaders) {
        headers.append('Authorization', 'Basic');
    }
    
    /*****
     * IMPORT Use Case
     ************************************/
    import(params: string[]): Observable<Object[]>{
        //-- Make the HTTP request

        this.jsonBody = JSON.stringify(params[1]);
        this.importObject = '&ot='+ params[0];
        let importURI = this.importDataEndpoint + this.importFormatJson + this.importObject;
        return this.http
            .post(importURI , this.jsonBody)
            .catch(this.handleError);
        }
        
    
    
    /*****
     * Common Function: HandleError
     ************************************/
    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}
