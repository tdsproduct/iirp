import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Dashboard } from '../data-models/dashboard'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Injectable()
export class DashboardService implements OnInit {
    
    dashboards: Observable<any>;
    private dashboardEndpoint = 'https://api.iotworldlabs.io/iirp/?guid=d97a3ae7-8f2f-4789-9f61-62b5a2ef6ce5&a=find&ot=Dashboard';
    

    //-- Inject HttpClient into your component or service
    constructor(private http: HttpClient) {
    }
    
    ngOnInit(): void {
        
    }
    
    
    
    /*****
     * GET Dashboards
     ************************************/
    getDashboards(): Observable<Dashboard[]> {
        //-- Make the HTTP request
        
        return this.http.get<Dashboard[]>(this.dashboardEndpoint)
           // .do (data =>console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    /**
     * Get & Show specific dashboard
     */
    getDashboardDevicesbyRegion():Observable<Dashboard[]>{
        return this.http.get<Dashboard[]>(this.dashboardEndpoint+'&name=uri&value=dashboard:devices-by-region')
        //.do (data => console.log(JSON.stringify(data)))
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
