
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CommonLookup, Group, UseCaseType} from '../data-models/common'

@Injectable()
export class CommonService implements OnInit {
    
    commonLookup: Observable<any>;
    private apiURI = 'https://api.iotworldlabs.io/iirp/?guid=d97a3ae7-8f2f-4789-9f61-62b5a2ef6ce5';
    private commonLookupsEndpoint = this.apiURI + '&a=find&ot=CommonLookups';
    private groupsEndPoint = this.apiURI + '&a=find&ot=Group&name=type&value=';
    private getUseCaseTypesEndpoint = this.apiURI + '&a=find&ot=UseCaseType';
    
    //-- Inject HttpClient into your component or service
    constructor(private http: HttpClient) {
    }
    
    ngOnInit(): void {
        
    }
    
    
    
    
    /*****
     * GET Common Lookups
     ************************************/
    getCommonLookups(): Observable<CommonLookup[]> {
        
        return this.http.get<CommonLookup[]>(this.commonLookupsEndpoint)
            //.do (data => console.log(JSON.stringify(data)))
            .catch (this.handleError);
    }
    

    getIndustries(): Observable<Group[]> {
        
        return this.http.get<Group[]>(this.groupsEndPoint + 'industry')
           // .do (data => console.log(JSON.stringify(data)))
            .catch (this.handleError);
    }

    getUseCaseTypes():Observable<any[]>{
        return this.http.get<any[]>(this.getUseCaseTypesEndpoint)
        //.do (data => console.log(JSON.stringify(data)))
        .catch (this.handleError);
    }
    

    /*****
     * Common Function: HandleError
     ************************************/
    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
    
}