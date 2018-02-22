import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Organization } from '../data-models/tenant'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Injectable()
export class OrganizationsService implements OnInit {
    
    organizations: Observable<any>;
    currentDate = new Date();
    private apiURI = 'https://api.iotworldlabs.io/iirp/?guid=d97a3ae7-8f2f-4789-9f61-62b5a2ef6ce5';
    private organizationsEndpoint =  this.apiURI + '&a=find&ot=Organization';
    private organizationSaveEndpoint = this.apiURI + '&a=add&ot=Organization';
    
    //-- Inject HttpClient into your component or service
    constructor(private http: HttpClient) {
    }
    
    ngOnInit(): void {
    }

    
    
    /*****
     * GET Organizations
     ************************************/
    getOrganizations(params:string): Observable<Organization[]> {
        //-- Make the HTTP request
        
        return this.http.get<Organization[]>(this.organizationsEndpoint+ params)
            //.do (data =>console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }
    /*****
     * GET Organization By ID
     ************************************/
    getOrganizationById(params: string): Observable<Organization[]> {
        //-- Make the HTTP request via User.Service
        //console.log('Make the HTTP request to GET the Organization details via OrganizationService. The query parameters are ' + params);
        
        return this.http
            .get<Organization[]>(this.organizationsEndpoint + params)
            .catch(this.handleError);
    }



    /*****
     * Save / Update Organization
     ************************************/
    saveNewOrUpdatedOrganization(saveDoc: any) {
        //-- Make the HTTP request via User.Service
        //console.log('Make the HTTP request to POST for the New or Updated User via Organization.Service. The query parameters are ' + this.organizationSaveEndpoint);
        
        return this.http
            .post(this.organizationSaveEndpoint, saveDoc.jsonBody)
            .subscribe(data => {
                if (data['nInserted'] && data['nInserted'] === 1) {
                    console.log('Successful updated Organization ID ' + saveDoc.organizationId);
                }
                else {
                    console.log('Unable to save organization ID ' + saveDoc.organizationId);
                }
            })
    }

    validateOrganizationSchema(organizationDocFromDB: any) {
        return {
            id:                 organizationDocFromDB.id || organizationDocFromDB.name || '',
       
            name:               organizationDocFromDB.name || '',
            domain_name:        organizationDocFromDB.domain_name || '',
            industry:           organizationDocFromDB.industry || '',
            use_cases:          organizationDocFromDB.use_cases || '',
            main_contact:       organizationDocFromDB.main_contact || '',
            address: {
                address1:       (organizationDocFromDB.address && organizationDocFromDB.address.address1)? organizationDocFromDB.address.address1 : '',
                address2:       (organizationDocFromDB.address && organizationDocFromDB.address.address2)? organizationDocFromDB.address.address2 : '',
                city:           (organizationDocFromDB.address && organizationDocFromDB.address.city)? organizationDocFromDB.address.city : '',
                state: {
                    code:       (organizationDocFromDB.address && organizationDocFromDB.address.state && organizationDocFromDB.address.state.code)? organizationDocFromDB.address.state.code : '',
                    name:       (organizationDocFromDB.address && organizationDocFromDB.address.state && organizationDocFromDB.address.state.name)? organizationDocFromDB.address.state.name : '',
                },
                country: {
                    code:       (organizationDocFromDB.address && organizationDocFromDB.address.country && organizationDocFromDB.address.country.code)? organizationDocFromDB.address.country.code : '',
                    name:       (organizationDocFromDB.address && organizationDocFromDB.address.country && organizationDocFromDB.address.country.name)? organizationDocFromDB.address.country.name : '',
                },
                postal_code:    (organizationDocFromDB.address && organizationDocFromDB.address.postal_code)? organizationDocFromDB.address.postal_code : '',
            },
            branding_logo:
            {
                id: organizationDocFromDB.branding_logo.id,
                path: 
                {
                   brandingLogoPath: organizationDocFromDB.branding_logo.path,
                }
            },
            time_created:       organizationDocFromDB.time_created || this.currentDate,
            time_updated:       organizationDocFromDB.time_updated || this.currentDate
        };
    }
    
    
    /*****
     * Common Function: HandleError
     ************************************/
    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}
