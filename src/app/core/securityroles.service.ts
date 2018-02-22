import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { SecurityRole } from '../data-models/security-role';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';




@Injectable()
export class SecurityRolesService implements OnInit {
    
    securityRoles: Observable<any>;
    private securityRolesEndpoint = 'https://api.iotworldlabs.io/iirp/?guid=d97a3ae7-8f2f-4789-9f61-62b5a2ef6ce5&a=find&ot=SecurityRoles';

    //-- Inject HttpClient into your component or service
    constructor(private http: HttpClient) {
    }
    
    ngOnInit(): void {
    }
    
    
    
    /*****
     * GET Security Roles
     ************************************/
    getSecurityRoles(): Observable<SecurityRole[]> {
        //-- Make the HTTP request
        console.log('Make the HTTP request in ObjectsService');
        
        return this.http.get<Object[]>(this.securityRolesEndpoint)
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
     * GET STATIC 
     * Will integrate once we have API
     */
    getStaticSecurityRoles(){
        

        let staticSecurityRoles = [
            {
                _id:'9195b1e7-f6ca-4e33-b7a6-583732361be5',
                id: 'SUPERADMIN',
                name: 'Super Admin',
                actions: 'ALL'
            }, 
            {
                _id:'9195b1e7-f6ca-4e33-b7a6-583732361be4',
                id: 'TGROUPADMIN',
                name: 'Tenant Group Admin',
                actions: 'ALL'
            }, 
            {
                _id:'9195b1e7-f6ca-4e33-b7a6-583732361be3',
                id: 'TADMIN',
                name: 'Tenant Admin',
                actions: 'ALL'
            }, 
            {
                _id:'9195b1e7-f6ca-4e33-b7a6-583732361be2',
                id: 'MANAGER',
                name: 'Buisness Manager',
                actions: 'SOME'
            }, 
            {
                _id:'9195b1e7-f6ca-4e33-b7a6-583732361be1',
                id: 'USER',
                name: 'Business User',
                actions: 'NONE'
            }
        ] ;
        return staticSecurityRoles;
    }
}
