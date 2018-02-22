
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

//-- Data Models
import { Constants } from '../data-models/common';
import { Usecase, UsecaseSchema } from '../data-models/usecase';


@Injectable()
export class UsecasesService implements OnInit {
    
    usecases: Observable<any>;
    private apiURI = 'https://api.iotworldlabs.io/iirp/?guid=d97a3ae7-8f2f-4789-9f61-62b5a2ef6ce5';
    getUsecaseEndpoint = this.apiURI + '&a=find&ot=UseCase';
    postUsecaseEndpoint = this.apiURI + '&a=add&ot=UseCase';
    getUsecaseCountEndpoint = this.apiURI + '&a=count&ot=UseCase';
    getUsecaseTypeEndpoint = this.apiURI + '&a=count&ot=UseCaseType';
    
    currentDate = new Date();
    headers = new HttpHeaders({'Content-Type': 'application/json'});

    //-- Sub-Documents
    usecaseCollaboratorsDefault = {email_address:  '', full_name: ''};
    usecaseDocumentsDefault = {id: '', filename: '', path: '',};
    usecaseDevicesDefault = {
        device_id: '',
        device_name: '',
        device_type: '',
        device_model: '',
        sensors_per_device: '',
        number_of_devices: '',
        location: '',
        device_tag_frequency: {
            value: '',
            unit: '',
        },
        device_packet_size: {
            value: '',
            unit: '',
        },
        data_format: '',
        data_interface: '',
    };
    
    //-- Inject HttpClient into your component or service
    constructor(private httpClient: HttpClient) {
    }
    
    ngOnInit(): void {}
    
    
    
    /*****
     * GET Total Number of Use Cases
     ************************************/
    getCountWithParams(params: string): Observable<any[]> {
        
        return this.httpClient.get<any[]>(this.getUsecaseCountEndpoint + params)
            //.do (data =>console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    /*****
     * GET Usecases
     ************************************/
    getUsecases(params: string): Observable<Usecase[]> {
        
        return this.httpClient
            .get<Usecase[]>(this.getUsecaseEndpoint + params)
            //.do (data =>console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    /*****
     * GET Usecase By ID
     ************************************/
    getUsecaseById(params: string): Observable<Usecase[]> {
        return this.httpClient
            .get<Usecase[]>(this.getUsecaseEndpoint + params)
            .catch(this.handleError);
    }
    
    /*****
     * GET Usecase Templates
     ************************************/
    getUsecaseTemplates(params:string): Observable<any[]> {
        
        return this.httpClient
            .get<Usecase[]>(this.getUsecaseEndpoint+params)
            .catch(this.handleError);
    }

    /*****
     * GET Usecase Types
     ************************************/
    getUsecaseTypes(params:string): Observable<any[]> {
       
        return this.httpClient
            .get<Usecase[]>(this.getUsecaseTypeEndpoint+params)
            .catch(this.handleError);
    }
    
    /*****
     * Save / Update Usecase
     ************************************/
    saveNewOrUpdatedUsecase(saveDoc: any) {
        //-- Make the HTTP request via Usecase.Service
        console.log('Make the HTTP request to POST the New or Updated Usecase via Usecase.Service. The endpoint is ' + this.postUsecaseEndpoint);
        
        return this.httpClient
            .post(this.postUsecaseEndpoint, saveDoc.jsonBody)
            .subscribe(data => {
                if (data['nInserted'] && data['nInserted'] === 1) {
                   // console.log('Successful updated Usecase ID ' + saveDoc.id);
                } else {
                   // console.log('Unable to save Usecase ID ' + saveDoc.id);
                }
            })
    }
    
    validateUsecaseSchema(usecaseDocFromDB: any) {
        return {
            id:                 usecaseDocFromDB.id || '',
            name:               usecaseDocFromDB.name || usecaseDocFromDB.id || '',
            friendly_name:      usecaseDocFromDB.friendly_name || '',
            usecase_status:     usecaseDocFromDB.usecase_status || '',
            industry:           usecaseDocFromDB.industry || '',
            usecase_template:   usecaseDocFromDB.usecase_template || '',
            usecase_tenant:     usecaseDocFromDB.usecase_tenant || '',
            usecase_type:       usecaseDocFromDB.usecase_type || '',
            description:        usecaseDocFromDB.description || '',
            
            user_info: {
                user_hierarchy:                     (usecaseDocFromDB.user_info && usecaseDocFromDB.user_info.user_hierarchy)? usecaseDocFromDB.user_info.user_hierarchy : '',
                change_role_functionality:          (usecaseDocFromDB.user_info && usecaseDocFromDB.user_info.change_role_functionality)? usecaseDocFromDB.user_info.change_role_functionality : '',
                user_unsubscribe:                   (usecaseDocFromDB.user_info && usecaseDocFromDB.user_info.user_unsubscribe)? usecaseDocFromDB.user_info.user_unsubscribe : '',
                is_user_invite_feature_included:    (usecaseDocFromDB.user_info && usecaseDocFromDB.user_info.is_user_invite_feature_included)? usecaseDocFromDB.user_info.is_user_invite_feature_included : true
            },
            collaborators: [{
                email: 'tom.bok@company.com',
                status: 'CONFIRMED',
                invite_note: ''
            }, {
                email: 'jean.ko@example.com',
                status: 'INVITED',
                invite_note: ''
            }],
            files: {
                usecase_icon: {
                    //-- Temporary; must be UUID.v4()
                    id:         (usecaseDocFromDB.files && usecaseDocFromDB.files.usecase_icon && usecaseDocFromDB.files.usecase_icon.id)? usecaseDocFromDB.files.usecase_icon.id : '',
                    path:       (usecaseDocFromDB.files && usecaseDocFromDB.files.usecase_icon && usecaseDocFromDB.files.usecase_icon.path)? usecaseDocFromDB.files.usecase_icon.path : ''
                },
                usecase_documents: [
                    //-- Temporary; hard-coded until this function of adding documents is added
                    {
                        id: '7eea57b5-61a0-4efa-b9e3-26c652f8c821',
                        filename: 'Water Filter Model 56568.pdf',
                        path: 'https://iotworldlabs.s3.bucketname1/'
                    }, {
                        id: 'cfead218-c333-42ce-8188-51c34dae6e4b',
                        filename: 'Water Filter Model 56568 MSDS.pdf',
                        path: 'https://iotworldlabs.s3.bucketname1/'
                    }
                ],
            },
            devices: [
                //-- Temporary; hard-coded until this function of adding device models under Use Case is added
                {'device_model_id':'D4DT-SG-000','device_model':'SmartGeyser-D4DT-Model2','device_type':'water-heater','sensors':'3','data_freq':'10','packet_size':'512','json_fields':'timeStamp deviceId field1 field2 field3','data_protocols':'HTTPS-POST-JSON'},
                {'device_model_id':'D4DT-WP-101','device_model':'WaterPurifier-D4DT-Model1','device_type':'water-filter','sensors':'3','data_freq':'12','packet_size':'256','json_fields':'timeStamp deviceId field1 field2 field3','data_protocols':'HTTPS-POST-JSON'},
                {'device_model_id':'D4DT-WP-102','device_model':'WaterPurifier-D4DT-Model1','device_type':'water-filter','sensors':'3','data_freq':'12','packet_size':'256','data_fields':'timeStamp deviceId field1 field2 field3','data_interface':'MQTT,HTTPS,POST,JSON'},
                {'device_model_id':'D4DT-WP-103','device_model':'WaterPurifier-D4DT-Model1','device_type':'water-filter','sensors':'3','data_freq_perhour':'12','packet_size':'256','data_fields':'timeStamp deviceId field1 field2 field3','data_interface':'MQTT,HTTPS,POST,JSON'},
                {'device_model_id':'D4DT-WP-104','device_model':'WaterPurifier-D4DT-Model1','device_type':'water-filter','sensors':'3','data_freq_perhour':'12','packet_size_bytes':'256','data_fields':'timeStamp deviceId field1 field2 field3','data_interface':'MQTT,HTTPS,POST,JSON'},
                {'device_model_id':'D4DT-WP-105','device_model':'TEST-WaterPurifier-D4DT-Model1','device_type':'water-filter','sensors':'3','data_freq_perhour':'12','packet_size_bytes':'256','data_fields':'timeStamp deviceId field1 field2 field3','data_interface':'MQTT,HTTPS,POST,JSON'}
            ],
            created_time:       usecaseDocFromDB.created_time || this.currentDate,
            created_by:         usecaseDocFromDB.created_by || '',
            time_updated:       usecaseDocFromDB.time_updated || this.currentDate,
            updated_by:        usecaseDocFromDB.updated_by || '',
            
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