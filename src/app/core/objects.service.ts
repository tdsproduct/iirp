import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Object } from '../data-models/object'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';




@Injectable()
export class ObjectsService implements OnInit {
    
    organizations: Observable<any>;
    private objectsEndpoint = 'https://api.iotworldlabs.io/iirp/?guid=d97a3ae7-8f2f-4789-9f61-62b5a2ef6ce5&a=find&ot=Object';

    //-- Inject HttpClient into your component or service
    constructor(private http: HttpClient) {
    }
    
    ngOnInit(): void {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
    }
    
    
    /*****
     * NOTE: Not implemented yet. Need to revisit when the APIs are finalized.
     * CREATE Authorization Headers
     ************************************/
    createAuthorizationHeaders(headers: Headers) {
        headers.append('Authorization', 'Basic');
    }
    
    
    /*****
     * GET Objects
     ************************************/
    getObjects(): Observable<Object[]> {
        //-- Make the HTTP request
        
        return this.http.get<Object[]>(this.objectsEndpoint)
            //.do (data =>console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    /*****
     * Common Function: HandleError
     ************************************/
    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }

    /*****
     * GET STATIC Objects from Object.ts
     * Will integrate once we have API
     */
    getStaticObjects(){
        

        let staticObjects = [
            {
                _id:'9195b1e7-f6ca-4e33-b7a6-583732361be5',
                id:'Dashboard', 
                object_type:'Dashboard',
                organization:'HeroMotocorp',
                use_cases:'Automotive',
                item1:'Data',
                item2:'Data'
            },
            {   
                _id:'9195b1e7-f6ca-4e33-b7a6-583732361be4',
                id:'Report', 
                object_type:'Report',
                organization:'HeroMotocorp',
                use_cases:'Automotive',
                item1:'Data',
                item2:'Data'
            },
            { 
                _id:'9195b1e7-f6ca-4e33-b7a6-583732361be3',
                id:'UsageReport', 
                object_type:'Visualization',
                organization:'Havells',
                use_cases:'Manufacturing',
                item1:'Data',
                item2:'Data'
            }
        ] ;
        return staticObjects;
    }
}
