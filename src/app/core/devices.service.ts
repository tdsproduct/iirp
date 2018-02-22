
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';

//-- Data Models
import { Constants } from '../data-models/common';
import { DeviceDocuments, DeviceModel, DeviceType } from '../data-models/device';

//-- Services


@Injectable()
export class DevicesService implements OnInit {
    
    devices: Observable<any>;

    private apiUri = 'https://api.iotworldlabs.io/iirp/?guid=d97a3ae7-8f2f-4789-9f61-62b5a2ef6ce5';
    private getDeviceModelsEndpoint     = this.apiUri + '&a=find&ot=DeviceModel';
    private getDeviceTypesEndpoint      = this.apiUri + '&a=find&ot=DeviceType';
    private deviceTypeCountEndpoint     = this.apiUri + '&a=count&ot=DeviceType';
    private deviceCountEndpoint         = this.apiUri + '&a=count&ot=Device';
    private deviceModelCountEndpoint    = this.apiUri + '&a=count&ot=DeviceModel';
    private postDeviceModelEndpoint     = this.apiUri + '&a=add&ot=DeviceModel';
    private postDeviceTypeEndpoint      = this.apiUri + '&a=add&ot=DeviceType';

    currentDate = new Date();
    headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    //-- Inject HttpClient into your component or service
    constructor(private httpClient: HttpClient, private requestOptions: RequestOptions) {
        
    }
    
    ngOnInit(): void {
    }
    
    /**
     * User Methods
     ****************/
    
   
    
    getDeviceModelById(params: string): Observable<DeviceModel[]> {
        
        return this.httpClient
            .get<DeviceModel[]>(this.getDeviceModelsEndpoint + params)
            .catch(this.handleError);
    }
    
    getDeviceModels(params:string): Observable<DeviceModel[]> {
        
        return this.httpClient
            .get<DeviceModel[]>(this.getDeviceModelsEndpoint + params)
            //.do (data =>console.log('getDeviceModels() result = %j', data))
            .catch(this.handleError);
    }
    
    getDeviceTypes(params:string): Observable<any[]> {
        //-- Make the HTTP request
        console.log('Make the HTTP GET request for `Device Type`');
        
        return this.httpClient
            .get<any[]>(this.getDeviceTypesEndpoint + params)
            //.do (data =>console.log('getDeviceTypes() result = %j', data))
            .catch(this.handleError);
    }

    getDeviceModelCountWithParams(params: string): Observable<any[]> {
        

        return this.httpClient
            .get<any[]>(this.deviceModelCountEndpoint + params)
            .catch(this.handleError);
    }

    getDeviceCountWithParams(params: string): Observable<any[]> {
        
        return this.httpClient
            .get<any[]>(this.deviceCountEndpoint + params)
            .catch(this.handleError);
    }
    
    getDeviceTypeById(params: string): Observable<DeviceType[]> {
        return this.httpClient
            .get<DeviceType[]>(this.getDeviceTypesEndpoint + params)
            .catch(this.handleError);
    }
    
    getDeviceTypeCountWithParams(params: string): Observable<any[]> {
    
        return this.httpClient
            .get<any[]>(this.deviceTypeCountEndpoint + params)
           // .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    saveNewOrUpdatedDevice(saveDoc: any) {
        let endpoint;
        
        if (saveDoc.objectType && saveDoc.objectType === Constants.OBJECT_TYPE.DeviceModel) {
            endpoint = this.postDeviceModelEndpoint;
        } else if (saveDoc.objectType && saveDoc.objectType === Constants.OBJECT_TYPE.DeviceType) {
            endpoint = this.postDeviceTypeEndpoint;
        }
        else
            return;
        
        return this.httpClient
            .post(endpoint, saveDoc.jsonBody)
            .subscribe(data => {
                if (data['nInserted'] && data['nInserted'] === 1) {
                    console.log('Successful saved ' + saveDoc.objectType + ' ID ' + saveDoc.id);
                } else {
                    console.log('Unable to save ' + saveDoc.objectType + ' ID ' + saveDoc.id);
                }
            })
    }
    
    getSensorsWithFilter(filterString: string): Observable<DeviceModel[]> {
        
        return this.httpClient
            .get<DeviceModel[]>(this.getDeviceModelsEndpoint + filterString)
            //.do (data =>console.log('getDeviceModels() result = %j', data))
            .catch(this.handleError);
    }
    
    validateDeviceModelSchema(deviceModelDocFromDB: any) {
        return {
            id:                             deviceModelDocFromDB.id || '',
            tenant_id:                      deviceModelDocFromDB.tenant_id || '',
            device_type:                    deviceModelDocFromDB.device_type || '',
            details: {
                device_type_template:                   (deviceModelDocFromDB.details && deviceModelDocFromDB.details.device_type_template) ? deviceModelDocFromDB.details.device_type_template : '',
                number_of_devices:                      (deviceModelDocFromDB.details && deviceModelDocFromDB.details.number_of_devices) ? deviceModelDocFromDB.details.number_of_devices : '',
                industry:                               (deviceModelDocFromDB.details && deviceModelDocFromDB.details.industry) ? deviceModelDocFromDB.details.industry : '',
                number_of_sensors_per_device:           (deviceModelDocFromDB.details && deviceModelDocFromDB.details.number_of_sensors_per_device) ? deviceModelDocFromDB.details.number_of_sensors_per_device : '',
                device_details:                         (deviceModelDocFromDB.details && deviceModelDocFromDB.details.device_details) ? deviceModelDocFromDB.details.device_details : '',
                device_protocol:                        (deviceModelDocFromDB.details && deviceModelDocFromDB.details.device_protocol) ? deviceModelDocFromDB.details.device_protocol : '',
                is_user_data_import:                    (deviceModelDocFromDB.details && deviceModelDocFromDB.details.is_user_data_import) ? deviceModelDocFromDB.details.is_user_data_import : '',
                is_device_data_import:                  (deviceModelDocFromDB.details && deviceModelDocFromDB.details.is_device_data_import) ? deviceModelDocFromDB.details.is_device_data_import : '',
                device_region:                          (deviceModelDocFromDB.details && deviceModelDocFromDB.details.device_region) ? deviceModelDocFromDB.details.device_region : '',
                raw_data_format:                        (deviceModelDocFromDB.details && deviceModelDocFromDB.details.raw_data_format) ? deviceModelDocFromDB.details.raw_data_format : '',
    
                interface_description:                  (deviceModelDocFromDB.details && deviceModelDocFromDB.details.interface_description) ? deviceModelDocFromDB.details.interface_description : '',
                data_interface:                         (deviceModelDocFromDB.details && deviceModelDocFromDB.details.data_interface) ? deviceModelDocFromDB.details.data_interface : '',
                max_allowed_tokens_per_user:            (deviceModelDocFromDB.details && deviceModelDocFromDB.details.max_allowed_tokens_per_user) ? deviceModelDocFromDB.details.max_allowed_tokens_per_user : '',
                notification_type_email:                (deviceModelDocFromDB.details && deviceModelDocFromDB.details.notification_type_email) ? deviceModelDocFromDB.details.notification_type_email : '',
                notification_type_sms:                  (deviceModelDocFromDB.details && deviceModelDocFromDB.details.notification_type_sms) ? deviceModelDocFromDB.details.notification_type_sms : '',
                notification_type_mobile:               (deviceModelDocFromDB.details && deviceModelDocFromDB.details.notification_type_mobile) ? deviceModelDocFromDB.details.notification_type_mobile : '',
                notification_type_other:                (deviceModelDocFromDB.details && deviceModelDocFromDB.details.notification_type_other) ? deviceModelDocFromDB.details.notification_type_other : '',
                scheduled_actions_needed:               (deviceModelDocFromDB.details && deviceModelDocFromDB.details.scheduled_actions_needed) ? deviceModelDocFromDB.details.scheduled_actions_needed : '',
                scheduling_will_be_managed_by:          (deviceModelDocFromDB.details && deviceModelDocFromDB.details.scheduling_will_be_managed_by) ? deviceModelDocFromDB.details.scheduling_will_be_managed_by : '',
                is_data_views_showing:                  (deviceModelDocFromDB.details && deviceModelDocFromDB.details.is_data_views_showing) ? deviceModelDocFromDB.details.is_data_views_showing : '',
        
                device_settings:                        (deviceModelDocFromDB.details && deviceModelDocFromDB.details.device_settings) ? deviceModelDocFromDB.details.device_settings : '',
                raw_data_policy:                        (deviceModelDocFromDB.details && deviceModelDocFromDB.details.raw_data_policy) ? deviceModelDocFromDB.details.raw_data_policy : '',
                processed_data_policy:                  (deviceModelDocFromDB.details && deviceModelDocFromDB.details.processed_data_policy) ? deviceModelDocFromDB.details.processed_data_policy : '',
                user_data_policy:                       (deviceModelDocFromDB.details && deviceModelDocFromDB.details.user_data_policy) ? deviceModelDocFromDB.details.user_data_policy : '',
                invite_note_mobile_app_features:        (deviceModelDocFromDB.details && deviceModelDocFromDB.details.invite_note_mobile_app_features) ? deviceModelDocFromDB.details.invite_note_mobile_app_features : '',
                invite_note_mobile_app_permission_mgr:  (deviceModelDocFromDB.details && deviceModelDocFromDB.details.invite_note_mobile_app_permission_mgr) ? deviceModelDocFromDB.details.invite_note_mobile_app_permission_mgr : '',
                invite_note_user_device_permissions:    (deviceModelDocFromDB.details && deviceModelDocFromDB.details.invite_note_user_device_permissions) ? deviceModelDocFromDB.details.invite_note_user_device_permissions : '',
            },
            files: {
                device_image: {
                    id: 'NUUID',
                    path:                               (deviceModelDocFromDB.files && deviceModelDocFromDB.files.device_image && deviceModelDocFromDB.files.device_image.path) ? deviceModelDocFromDB.files.device_image.path : '',
                },
                device_icon: {
                    id: 'NUUID',
                    path:                               (deviceModelDocFromDB.files && deviceModelDocFromDB.files.device_icon && deviceModelDocFromDB.files.device_icon.path) ? deviceModelDocFromDB.files.device_icon.path : '',
                }
            },
            device_documents:               deviceModelDocFromDB.device_documents || '',
    
            /**
             * Begin: Temporarily hardcoded; should be coming from the Sensors table
             */
            device_tag_frequency: {
                value: (deviceModelDocFromDB.device_tag_frequency && deviceModelDocFromDB.device_tag_frequency.value) || '',
                unit: 'HOUR' },
            device_packet_size: {
                value: (deviceModelDocFromDB.device_tag_frequency && deviceModelDocFromDB.device_tag_frequency.value) || '',
                unit: 'BYTES' },
            data_format: Constants.DEFAULT_DATA_FORMAT,
    
            /**
             * End: Temporarily hardcoded; should be coming from the Sensors table
             */
            
        };

    }
    
    validateDeviceTypeSchema(deviceTypeDocFromDB: any) {
        
        return {
            id:                         deviceTypeDocFromDB.id || '',
            friendly_name:              deviceTypeDocFromDB.friendly_name || '',
            device_type_status:         deviceTypeDocFromDB.device_type_status || '',
            device_type_usecase:        deviceTypeDocFromDB.device_type_usecase || '',
            device_type_organization:   deviceTypeDocFromDB.device_type_organization || '',
            details: {
                from_device_type:               (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.from_device_type) ? deviceTypeDocFromDB.details.from_device_type : '',
                device_type_details:            (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.device_type_details) ? deviceTypeDocFromDB.details.device_type_details : '',
                standard_settings:              (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.standard_settings) ? deviceTypeDocFromDB.details.standard_settings : '',
                raw_data_policy:                (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.raw_data_policy) ? deviceTypeDocFromDB.details.raw_data_policy : '',
                processed_data_policy:          (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.processed_data_policy) ? deviceTypeDocFromDB.details.processed_data_policy : '',
                user_data_policy:               (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.user_data_policy) ? deviceTypeDocFromDB.details.user_data_policy : '',
                device_type_protocol:           (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.device_type_protocol) ? deviceTypeDocFromDB.details.device_type_protocol : '',
                user_data_import:                (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.user_data_import) ? deviceTypeDocFromDB.details.user_data_import : '',
                device_data_import:             (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.device_data_import) ? deviceTypeDocFromDB.details.device_data_import : '',
                device_type_region:             (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.device_type_region) ? deviceTypeDocFromDB.details.device_type_region : '',
                raw_data_format:                (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.raw_data_format) ? deviceTypeDocFromDB.details.raw_data_format : '',
                interface_description:          (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.interface_description) ? deviceTypeDocFromDB.details.interface_description : '',
                paste_sample_data:              (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.paste_sample_data) ? deviceTypeDocFromDB.details.paste_sample_data : '',
                data_interface:                 (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.data_interface) ? deviceTypeDocFromDB.details.data_interface : '',
                max_allowed_tokens_per_user:    (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.max_allowed_tokens_per_user) ? deviceTypeDocFromDB.details.max_allowed_tokens_per_user : '',
                userData_policy:                (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.userData_policy) ? deviceTypeDocFromDB.details.userData_policy : '',
        
                notification_type_email:        (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.notification_type_email) ? deviceTypeDocFromDB.details.notification_type_email : '',
                notification_type_sms:          (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.notification_type_sms) ? deviceTypeDocFromDB.details.notification_type_sms : '',
                notification_type_mobile:       (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.notification_type_mobile) ? deviceTypeDocFromDB.details.notification_type_mobile : '',
                notification_type_other:        (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.notification_type_other) ? deviceTypeDocFromDB.details.notification_type_other : '',
                scheduled_actions_needed:       (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.scheduled_actions_needed) ? deviceTypeDocFromDB.details.scheduled_actions_needed : '',
                scheduling_will_be_managed_by:  (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.scheduling_will_be_managed_by) ? deviceTypeDocFromDB.details.scheduling_will_be_managed_by : '',
                is_data_views_showing:          (deviceTypeDocFromDB.details && deviceTypeDocFromDB.details.is_data_views_showing) ? deviceTypeDocFromDB.details.is_data_views_showing : '',
            },
            files: {
                device_image: {
                    id: '', //-- Temporary; must be UUID.v4()
                    path: (deviceTypeDocFromDB.files && deviceTypeDocFromDB.files.device_image && deviceTypeDocFromDB.files.device_image.path) ? deviceTypeDocFromDB.files.device_image.path : '',
                },
                device_icon: {
                    id: '', //-- Temporary; must be UUID.v4()
                    path: (deviceTypeDocFromDB.files && deviceTypeDocFromDB.files.device_icon && deviceTypeDocFromDB.files.device_icon.path) ? deviceTypeDocFromDB.files.device_image.path : '',
                },
                custom_actions_device_image: {
                    id: '', //-- Temporary; must be UUID.v4()
                    path: (deviceTypeDocFromDB.files && deviceTypeDocFromDB.files.custom_actions_device_image && deviceTypeDocFromDB.files.custom_actions_device_image.path) ? deviceTypeDocFromDB.files.device_image.path : '',
                },
                device_documents: DeviceDocuments
            },
            mobile_app_details: {
                mobile_app_login_oauth_requirement_google:          (deviceTypeDocFromDB.mobile_app_details && deviceTypeDocFromDB.mobile_app_details.mobile_app_login_oauth_requirement_google) ? deviceTypeDocFromDB.mobile_app_details.mobile_app_login_oauth_requirement_google : '',
                mobile_app_login_oauth_requirement_facebook:        (deviceTypeDocFromDB.mobile_app_details && deviceTypeDocFromDB.mobile_app_details.mobile_app_login_oauth_requirement_facebook) ? deviceTypeDocFromDB.mobile_app_details.mobile_app_login_oauth_requirement_google : '',
                mobile_app_login_oauth_requirement_otp:             (deviceTypeDocFromDB.mobile_app_details && deviceTypeDocFromDB.mobile_app_details.mobile_app_login_oauth_requirement_otp) ? deviceTypeDocFromDB.mobile_app_details.mobile_app_login_oauth_requirement_google : '',
                mobile_app_login_oauth_requirement_multifactor:     (deviceTypeDocFromDB.mobile_app_details && deviceTypeDocFromDB.mobile_app_details.mobile_app_login_oauth_requirement_multifactor) ? deviceTypeDocFromDB.mobile_app_details.mobile_app_login_oauth_requirement_google : '',
                mobile_app_features:                                (deviceTypeDocFromDB.mobile_app_details && deviceTypeDocFromDB.mobile_app_details.mobile_app_features) ? deviceTypeDocFromDB.mobile_app_details.mobile_app_login_oauth_requirement_google : '',
                mobile_app_permission_mgr:                          (deviceTypeDocFromDB.mobile_app_details && deviceTypeDocFromDB.mobile_app_details.mobile_app_permission_mgr) ? deviceTypeDocFromDB.mobile_app_details.mobile_app_login_oauth_requirement_google : '',
                user_device_permissions:                            (deviceTypeDocFromDB.mobile_app_details && deviceTypeDocFromDB.mobile_app_details.user_device_permissions) ? deviceTypeDocFromDB.mobile_app_details.mobile_app_login_oauth_requirement_google : '',
            }
    
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