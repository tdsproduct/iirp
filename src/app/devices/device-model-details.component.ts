
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { AppComponent } from '../app.component';

//-- Data Models
import { CommonLookups, Protocols } from '../data-models/common';
import { Constants, Regions } from '../data-models/common';
import { DataInterfaces, DeviceModel, DeviceModelSchema, DeviceTypeTemplates, RawDataFormats } from '../data-models/device';
import { Tenant } from '../data-models/tenant';
import { User } from '../data-models/user';

//-- Services
import { DevicesService } from '../core/devices.service';
import { TenantsService } from '../core/tenants.service';
import { UsersService } from '../core/users.service';
import { AuthService } from '../core/auth.service';


@Component({
    selector: 'device-model-details',
    templateUrl: './device-model-details.component.html',
    styleUrls: ['./device-model-details.component.css']
})

export class DeviceModelDetailsComponent implements OnInit {
    @Input() deviceModel = DeviceModelSchema;

    currentUser: User;
    currentTenant: Tenant;


    jsonBody = {};
    isReadOnly: boolean;
    
    errorMessage: string;
    formHeader: string;
    path: any;
    id: string;
    paramKey: any;
    currentDate = new Date();
    
    //-- Lookups
    deviceTypeTemplates = DeviceTypeTemplates;
    protocols = Protocols;
    industries = CommonLookups.results.industries;
    regions = Regions;
    rawDataFormats = RawDataFormats;
    dataInterfaces = DataInterfaces;
    
    tenants: Tenant[];
    sensors: DeviceModel[];
    
    //-- Inject HttpClient into your component or service
    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private devicesService: DevicesService,
                private tenantsService: TenantsService,
                private usersService: UsersService,
                private authService: AuthService) {
        //-- app.setPageContentFullWidth(false);
    }
    
    //-- Reactive Form
    deviceModelDetailsForm = new FormGroup({});
    
    ngOnInit(): void {
        

        if (!this.authService.isAuthenticated()) this.router.navigate(['dashboard']);
        this.paramKey = this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log('id = ' + this.id);
        });
        
        this.path = this.route.snapshot.url[1]? this.route.snapshot.url[1].toString() : this.id;
        
        console.log('path = ' + this.path);
        this.jsonBody = JSON.stringify({id: this.id});
        const params = '&name=id&value=' + this.id;
        

        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
            let filters:string = '';
            if (this.currentUser.security_role == 'Super Admin') 
                this.getListOfTenants(filters);

        });

        this.authService.currentUsersTenant.subscribe (tenant => {
            // we only get here if the user is not a 'Super Admin'
            if (this.currentUser.security_role != 'Super Admin')
            {
                let filters: string = '&name=tenant_id&value=' + tenant.id;
                this.getListOfTenants(filters);    
            }
        });

        this.createFormDefault();
        
        if (this.path === 'new') {
            this.formHeader = 'New Device Model';
            this.enableFormControlsForEdit();
        } else if (this.path === 'edit') {
            this.formHeader = 'Edit Device Model';
            this.getDeviceModelById(params);
            this.enableFormControlsForEdit();
        } else {
            console.log('Viewing details for Device Model ID ' + this.path);
            this.formHeader = 'Device Model Details';
            this.getDeviceModelById(params);
            this.disableControlsForReadOnly();
        }
        
    }
    
    /**
     * User-defined Methods
     ****************************/

    addNewDeviceModel() {}
    
    cancelEditDeviceModel() {
        this.disableControlsForReadOnly();
        this.router.navigate(['devicemodels/' + this.id]);
    }
    
    closeDeviceModel() {
        this.router.navigate(['devicemodels'])
    }
    
    createFormDefault() {
        this.deviceModelDetailsForm = this.fb.group({
    
            deviceModelId: new FormControl(),
            deviceTenantId: new FormControl(),
            deviceType: new FormControl(),
            
            deviceTypeTemplate: new FormControl(),
            numberOfDevices: new FormControl(),
            deviceIndustry: new FormControl(),
            numberOfSensorsPerDevice: new FormControl(),
            deviceDetails: new FormControl(),
            deviceProtocol: new FormControl(),
            isUserDataImport: new FormControl(),
            isDeviceDataImport: new FormControl(),
            deviceRegion: new FormControl(),
            rawDataFormat: new FormControl(),
    
            interfaceDescription: new FormControl(),
            dataInterface: new FormControl(),
            maxAllowedTokensPerUser: new FormControl(),
            notificationTypeEmail: new FormControl(),
            notificationTypeSMS: new FormControl(),
            notificationTypeMobile: new FormControl(),
            notificationTypeOther: new FormControl(),
            scheduledActionsNeeded: new FormControl(),
            schedulingWillBeManagedBy: new FormControl(),
            isDataViewsShowing: new FormControl(),
            
            deviceSettings: new FormControl(),
            rawDataPolicy: new FormControl(),
            processedDataPolicy: new FormControl(),
            userDataPolicy: new FormControl(),
            inviteNoteMobileAppFeatures: new FormControl(),
            inviteNoteMobileAppPermissionMgr: new FormControl(),
            inviteNoteUserDevicePermissions: new FormControl(),
            deviceImagePath: new FormControl(),
            deviceIconPath: new FormControl(),
            deviceDocuments: new FormControl()
            
        });
    }
    
    disableControlsForReadOnly() {
        
        console.log('Creating read-only form');
        this.isReadOnly = true;
        this.deviceModelDetailsForm.controls['deviceModelId'].disable();
        this.deviceModelDetailsForm.controls['deviceTenantId'].disable();
        this.deviceModelDetailsForm.controls['deviceType'].disable();
        
        this.deviceModelDetailsForm.controls['deviceTypeTemplate'].disable();
        this.deviceModelDetailsForm.controls['numberOfDevices'].disable();
        this.deviceModelDetailsForm.controls['deviceIndustry'].disable();
        this.deviceModelDetailsForm.controls['numberOfSensorsPerDevice'].disable();
        this.deviceModelDetailsForm.controls['deviceDetails'].disable();
        this.deviceModelDetailsForm.controls['deviceProtocol'].disable();
        this.deviceModelDetailsForm.controls['isUserDataImport'].disable();
        this.deviceModelDetailsForm.controls['isDeviceDataImport'].disable();
        this.deviceModelDetailsForm.controls['deviceRegion'].disable();
        this.deviceModelDetailsForm.controls['rawDataFormat'].disable();
        
        this.deviceModelDetailsForm.controls['interfaceDescription'].disable();
        this.deviceModelDetailsForm.controls['dataInterface'].disable();
        this.deviceModelDetailsForm.controls['maxAllowedTokensPerUser'].disable();
        this.deviceModelDetailsForm.controls['notificationTypeEmail'].disable();
        this.deviceModelDetailsForm.controls['notificationTypeSMS'].disable();
        this.deviceModelDetailsForm.controls['notificationTypeMobile'].disable();
        this.deviceModelDetailsForm.controls['notificationTypeOther'].disable();
        this.deviceModelDetailsForm.controls['scheduledActionsNeeded'].disable();
        this.deviceModelDetailsForm.controls['schedulingWillBeManagedBy'].disable();
        this.deviceModelDetailsForm.controls['isDataViewsShowing'].disable();
        
        this.deviceModelDetailsForm.controls['deviceSettings'].disable();
        this.deviceModelDetailsForm.controls['rawDataPolicy'].disable();
        this.deviceModelDetailsForm.controls['processedDataPolicy'].disable();
        this.deviceModelDetailsForm.controls['userDataPolicy'].disable();
        this.deviceModelDetailsForm.controls['inviteNoteMobileAppFeatures'].disable();
        this.deviceModelDetailsForm.controls['inviteNoteMobileAppPermissionMgr'].disable();
        this.deviceModelDetailsForm.controls['inviteNoteUserDevicePermissions'].disable();
        this.deviceModelDetailsForm.controls['deviceImagePath'].disable();
        this.deviceModelDetailsForm.controls['deviceIconPath'].disable();
        this.deviceModelDetailsForm.controls['deviceDocuments'].disable();
        
    }
    
    editDeviceModel() {
        this.router.navigate(['devicemodels/edit/' + this.id]);
    }
    
    enableFormControlsForEdit() {
        
        console.log('Creating editable form');
        this.isReadOnly = false;
        this.deviceModelDetailsForm.controls['deviceModelId'].enable();
        this.deviceModelDetailsForm.controls['deviceTenantId'].enable();
        this.deviceModelDetailsForm.controls['deviceType'].enable();
        
        this.deviceModelDetailsForm.controls['deviceTypeTemplate'].enable();
        this.deviceModelDetailsForm.controls['numberOfDevices'].enable();
        this.deviceModelDetailsForm.controls['deviceIndustry'].enable();
        this.deviceModelDetailsForm.controls['numberOfSensorsPerDevice'].enable();
        this.deviceModelDetailsForm.controls['deviceDetails'].enable();
        this.deviceModelDetailsForm.controls['deviceProtocol'].enable();
        this.deviceModelDetailsForm.controls['isUserDataImport'].enable();
        this.deviceModelDetailsForm.controls['isDeviceDataImport'].enable();
        this.deviceModelDetailsForm.controls['deviceRegion'].enable();
        this.deviceModelDetailsForm.controls['rawDataFormat'].enable();
        
        this.deviceModelDetailsForm.controls['interfaceDescription'].enable();
        this.deviceModelDetailsForm.controls['dataInterface'].enable();
        this.deviceModelDetailsForm.controls['maxAllowedTokensPerUser'].enable();
        this.deviceModelDetailsForm.controls['notificationTypeEmail'].enable();
        this.deviceModelDetailsForm.controls['notificationTypeSMS'].enable();
        this.deviceModelDetailsForm.controls['notificationTypeMobile'].enable();
        this.deviceModelDetailsForm.controls['notificationTypeOther'].enable();
        this.deviceModelDetailsForm.controls['scheduledActionsNeeded'].enable();
        this.deviceModelDetailsForm.controls['schedulingWillBeManagedBy'].enable();
        this.deviceModelDetailsForm.controls['isDataViewsShowing'].enable();
        
        this.deviceModelDetailsForm.controls['deviceSettings'].enable();
        this.deviceModelDetailsForm.controls['rawDataPolicy'].enable();
        this.deviceModelDetailsForm.controls['processedDataPolicy'].enable();
        this.deviceModelDetailsForm.controls['userDataPolicy'].enable();
        this.deviceModelDetailsForm.controls['inviteNoteMobileAppFeatures'].enable();
        this.deviceModelDetailsForm.controls['inviteNoteMobileAppPermissionMgr'].enable();
        this.deviceModelDetailsForm.controls['inviteNoteUserDevicePermissions'].enable();
        this.deviceModelDetailsForm.controls['deviceImagePath'].enable();
        this.deviceModelDetailsForm.controls['deviceIconPath'].enable();
        this.deviceModelDetailsForm.controls['deviceDocuments'].enable();
        
    }
    
    getListOfSensors(filters:string){
        this.devicesService.getSensorsWithFilter(filters)
            .subscribe(data => {
                    this.sensors = data['results'];
                },
                error => this.errorMessage = <any>error);
    }
    
    getListOfTenants(filters:string){
        this.tenantsService.getTenants(filters)
            .subscribe(data => {
                    this.tenants = data['results'];
                    console.log('this.tenants = %j', this.tenants);
                },
                error => this.errorMessage = <any>error);
    }
    
    getDeviceModelById(params: string) {
        
        this.devicesService.getDeviceModelById(params)
            .subscribe(data => {
                let results = data['results'];
                let updatedDeviceModel = data['results'][results.length-1] || null;
                console.log('Result of GET DeviceModel Details via Devices.Service %j', updatedDeviceModel);
                
                if (updatedDeviceModel) {
                    //-- Validate the `deviceModelDocFromDB` JSON form and fix any missing attributes
                    this.deviceModel = this.devicesService.validateDeviceModelSchema(updatedDeviceModel);
                    console.log('Result of ValidateUserSchema from User.Service %j', this.deviceModel);
                    
                    console.log('Setting values for `device model` with validated JSON');
                    this.deviceModelDetailsForm.setValue({
                        deviceModelId: this.deviceModel.id,
                        deviceTenantId: this.deviceModel.tenant_id,
                        deviceType: this.deviceModel.device_type,
                        deviceTypeTemplate: this.deviceModel.details.device_type_template,
                        numberOfDevices: this.deviceModel.details.number_of_devices,
                        deviceIndustry: this.deviceModel.details.industry,
                        numberOfSensorsPerDevice: this.deviceModel.details.number_of_sensors_per_device,
                        deviceDetails: this.deviceModel.details.device_details,
                        deviceProtocol: this.deviceModel.details.device_protocol,
                        isUserDataImport: this.deviceModel.details.is_user_data_import,
                        isDeviceDataImport: this.deviceModel.details.is_device_data_import,
                        deviceRegion: this.deviceModel.details.device_region,
                        rawDataFormat: this.deviceModel.details.raw_data_format,
    
                        interfaceDescription: this.deviceModel.details.data_interface,
                        dataInterface: this.deviceModel.details.data_interface,
                        maxAllowedTokensPerUser: this.deviceModel.details.max_allowed_tokens_per_user,
                        notificationTypeEmail: this.deviceModel.details.notification_type_email,
                        notificationTypeSMS: this.deviceModel.details.notification_type_sms,
                        notificationTypeMobile: this.deviceModel.details.notification_type_mobile,
                        notificationTypeOther: this.deviceModel.details.notification_type_other,
                        scheduledActionsNeeded: this.deviceModel.details.scheduled_actions_needed,
                        schedulingWillBeManagedBy: this.deviceModel.details.scheduling_will_be_managed_by,
                        isDataViewsShowing: this.deviceModel.details.is_data_views_showing,
                        
                        deviceSettings: this.deviceModel.details.device_settings,
                        rawDataPolicy: this.deviceModel.details.device_settings,
                        processedDataPolicy: this.deviceModel.details.processed_data_policy,
                        userDataPolicy: this.deviceModel.details.user_data_policy,
                        inviteNoteMobileAppFeatures: this.deviceModel.details.invite_note_mobile_app_features,
                        inviteNoteMobileAppPermissionMgr: this.deviceModel.details.invite_note_mobile_app_permission_mgr,
                        inviteNoteUserDevicePermissions: this.deviceModel.details.invite_note_user_device_permissions,
                        deviceImagePath: this.deviceModel.files.device_image.path,
                        deviceIconPath: this.deviceModel.files.device_icon.path,
                        deviceDocuments: this.deviceModel.device_documents
                        
                    });
                    
                } else {
                    this.router.navigate(['devicemodels'])
                }
                
            })
    }
    
    importDeviceModel() {}
    
    loadSensorDetails(sensorId: string) {
        console.log('Loading the Sensor Details ' + sensorId);
        //-- this.router.navigate(['sensors/' + sensorId]);
    }
    
    saveDeviceModel() {
        const newOrUpdatedDeviceModel = this.deviceModelDetailsForm.value;
        let deviceModelId = newOrUpdatedDeviceModel.deviceModelId.replace(/ /g, '');
        if (deviceModelId) {
            console.log('Saving ' + deviceModelId);
            
            const body = {
                id:                             newOrUpdatedDeviceModel.deviceModelId,
                tenant_id:                      newOrUpdatedDeviceModel.deviceTenantId,
                device_type:                    newOrUpdatedDeviceModel.deviceType,
                details: {
                    device_type_template:                   newOrUpdatedDeviceModel.deviceTypeTemplate,
                    number_of_devices:                      newOrUpdatedDeviceModel.numberOfDevices,
                    industry:                               newOrUpdatedDeviceModel.deviceIndustry,
                    number_of_sensors_per_device:           newOrUpdatedDeviceModel.numberOfSensorsPerDevice,
                    device_details:                         newOrUpdatedDeviceModel.deviceDetails,
                    device_protocol:                        newOrUpdatedDeviceModel.deviceProtocol,
                    is_user_data_import:                    newOrUpdatedDeviceModel.isUserDataImport,
                    is_device_data_import:                  newOrUpdatedDeviceModel.isDeviceDataImport,
                    device_region:                          newOrUpdatedDeviceModel.deviceRegion,
                    raw_data_format:                        newOrUpdatedDeviceModel.rawDataFormat,
    
                    interface_description:                  newOrUpdatedDeviceModel.interfaceDescription,
                    data_interface:                         newOrUpdatedDeviceModel.dataInterface,
                    max_allowed_tokens_per_user:            newOrUpdatedDeviceModel.maxAllowedTokensPerUser,
                    notification_type_email:                newOrUpdatedDeviceModel.notificationTypeEmail,
                    notification_type_sms:                  newOrUpdatedDeviceModel.notificationTypeSMS,
                    notification_type_mobile:               newOrUpdatedDeviceModel.notificationTypeMobile,
                    notification_type_other:                newOrUpdatedDeviceModel.notificationTypeOther,
                    scheduled_actions_needed:               newOrUpdatedDeviceModel.scheduledActionsNeeded,
                    scheduling_will_be_managed_by:          newOrUpdatedDeviceModel.schedulingWillBeManagedBy,
                    is_data_views_showing:                  newOrUpdatedDeviceModel.isDataViewsShowing,
    
                    device_settings:                        newOrUpdatedDeviceModel.deviceSettings,
                    raw_data_policy:                        newOrUpdatedDeviceModel.rawDataPolicy,
                    processed_data_policy:                  newOrUpdatedDeviceModel.processedDataPolicy,
                    user_data_policy:                       newOrUpdatedDeviceModel.userDataPolicy,
                    invite_note_mobile_app_features:        newOrUpdatedDeviceModel.inviteNoteMobileAppFeatures,
                    invite_note_mobile_app_permission_mgr:  newOrUpdatedDeviceModel.inviteNoteMobileAppPermissionMgr,
                    invite_note_user_device_permissions:    newOrUpdatedDeviceModel.inviteNoteUserDevicePermissions
                },
                files: {
                    device_image: {
                        id: 'NUUID',
                        path:                               newOrUpdatedDeviceModel.deviceImagePath
                    },
                    device_icon: {
                        id: 'NUUID',
                        path:                               newOrUpdatedDeviceModel.deviceIconPath
                    }
                },
                
                device_documents:   newOrUpdatedDeviceModel.deviceDocuments,
                
                /**
                 * Begin: Temporarily hardcoded; should be coming from the Sensors table
                 */
                device_tag_frequency: { value: 9, unit: 'HOUR' },
                device_packet_size: { value: 9, unit: 'BYTES' },
                data_format: Constants.DEFAULT_DATA_FORMAT,
                
                /**
                 * End: Temporarily hardcoded; should be coming from the Sensors table
                 */
                
            };
    
            if (this.path === 'new') {
                body['time_created'] = this.currentDate;
                body['created_by'] = (this.currentUser)? this.currentUser.id: '';
            } else {
                body['time_updated'] = this.currentDate;
                body['updated_by'] = this.currentUser? this.currentUser.id: '';
            }
            
            let saveDoc = {
                id: deviceModelId,
                jsonBody: JSON.stringify(body),
                objectType: Constants.OBJECT_TYPE.DeviceModel
            };
            
            //-- Save new or updated `Device Model`
            console.log('Saves new or updated `Device Model` %j', this.devicesService.saveNewOrUpdatedDevice(saveDoc));
            
            this.router.navigate(['devicemodels']);
            
        } else {
            alert('Cannot save an empty [Device Model]');
        }
    }
    
    
    
    
}