
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User, UserGroup } from '../data-models/user';

@Injectable()
export class UsersService implements OnInit {
    
    organizations: Observable<any>;
    private apiURI = 'https://api.iotworldlabs.io/iirp/?guid=d97a3ae7-8f2f-4789-9f61-62b5a2ef6ce5';
    getUsersEndpoint = this.apiURI + '&a=find&ot=User';
    postUserEndpoint = this.apiURI + '&a=add&ot=User';
    getUserGroupsEndpoint = this.apiURI + '&a=find&ot=UserGroup'
    postUserGroupEndpoint = this.apiURI + '&a=add&ot=UserGroup';
    
    currentDate = new Date();
    
    //-- Inject HttpClient into your component or service
    constructor(private http: HttpClient) {
    }
    
    ngOnInit(): void {
    }
    
    /**
     * User-defined Methods
     ****************************/
    
    
    getPermissionFilterValues(permissionFilters: string) {
    
        return this.http.get<User[]>(this.getUsersEndpoint + permissionFilters)
            //.do (data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    /*****
     * GET Users
     ************************************/
    getUsers(params:string): Observable<User[]> {
        //-- Make the HTTP request
        
        return this.http.get<User[]>(this.getUsersEndpoint + params)
            //.do (data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    /*****
     * GET Users
     ************************************/
    getUserGroups(params:string): Observable<UserGroup[]> {
        //-- Make the HTTP request
        
        return this.http.get<UserGroup[]>(this.getUserGroupsEndpoint + params)
           // .do (data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    /*****
     * GET User By ID
     ************************************/
    getUserById(params: string): Observable<User[]> {
        //-- Make the HTTP request via User.Service
        return this.http
            .get<User[]>(this.getUsersEndpoint + params)
            .catch(this.handleError);
    }
    
    /*****
     * Save / Update User
     ************************************/
    saveNewOrUpdatedUser(saveDoc: any) {
        //-- Make the HTTP request via User.Service
        
        return this.http
            .post(this.postUserEndpoint, saveDoc.jsonBody)
            .subscribe(data => {
                if (data['nInserted'] && data['nInserted'] === 1) {
                    console.log('Successful updated user ID ' + saveDoc.userId);
                }
                else {
                    console.log('Unable to save user ID ' + saveDoc.userId);
                }
            })
    }
    
    validateUserSchema(userDocFromDB: any) {
        return {
            id:                 userDocFromDB.id || userDocFromDB.email_address || '',
            prefix:             userDocFromDB.prefix || '',
            full_name:          userDocFromDB.full_name || '',
            nick_name:          userDocFromDB.nick_name || '',
            suffix:             userDocFromDB.suffix || '',
        
            organization:       userDocFromDB.organization || '',
            job_title:          userDocFromDB.job_title || '',
            email_address:      userDocFromDB.email_address || '',
            main_contact:       userDocFromDB.main_contact || '',
            phone_number:       userDocFromDB.phone_number || '',
            mobile_number:      userDocFromDB.mobile_number || '',
            address: {
                address1:       (userDocFromDB.address && userDocFromDB.address.address1)? userDocFromDB.address.address1 : '',
                address2:       (userDocFromDB.address && userDocFromDB.address.address2)? userDocFromDB.address.address2 : '',
                city:           (userDocFromDB.address && userDocFromDB.address.city)? userDocFromDB.address.city : '',
                state: {
                    code:       (userDocFromDB.address && userDocFromDB.address.state && userDocFromDB.address.state.code)? userDocFromDB.address.state.code : '',
                    name:       (userDocFromDB.address && userDocFromDB.address.state && userDocFromDB.address.state.name)? userDocFromDB.address.state.name : '',
                },
                country: {
                    code:       (userDocFromDB.address && userDocFromDB.address.country && userDocFromDB.address.country.code)? userDocFromDB.address.country.code : '',
                    name:       (userDocFromDB.address && userDocFromDB.address.country && userDocFromDB.address.country.name)? userDocFromDB.address.country.name : '',
                },
                postal_code:    (userDocFromDB.address && userDocFromDB.address.postal_code)? userDocFromDB.address.postal_code : '',
            },
            security_role:      userDocFromDB.security_role || '',
            group:              userDocFromDB.group || '',
            linkedin:           userDocFromDB.linkedin || '',
            time_created:       userDocFromDB.time_created || this.currentDate,
            time_updated:       userDocFromDB.time_updated || this.currentDate,
            created_by:         userDocFromDB.created_by || '',
            updated_by:         userDocFromDB.updated_by || ''
        };
    }
    
     /*****
     * Save / Update User
     ************************************/
    saveNewOrUpdatedUserGroup(saveDoc: any) {
        //-- Make the HTTP request via User.Service
        
        return this.http
            .post(this.postUserGroupEndpoint, saveDoc.jsonBody)
            .subscribe(data => {
                if (data['nInserted'] && data['nInserted'] === 1) {
                    console.log('Successful updated user Group ID ' + saveDoc.userGroupId);
                }
                else {
                    console.log('Unable to save user Group ID ' + saveDoc.userGroupId);
                }
            })
    }
    
    /*****
     * Common Function: HandleError
     ************************************/
    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}
