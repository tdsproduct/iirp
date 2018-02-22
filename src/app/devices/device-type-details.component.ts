import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AppComponent } from '../app.component';

//-- Data Models
import { DataInterfaces, DeviceTypes, DeviceTypeSchema, DeviceTypeStatuses, DeviceTypeUsecases } from '../data-models/device';
import { Collaborators, Constants, Protocols, Organizations, Regions } from '../data-models/common';
import { Usecase } from '../data-models/usecase';
import { Tenant, Organization } from '../data-models/tenant';
import { User } from '../data-models/user';


//-- Services
import { DevicesService } from '../core/devices.service';
import { UsecasesService } from '../core/usecases.service';
import { OrganizationsService } from '../core/organizations.service';
import { UsersService } from '../core/users.service';
import { AuthService } from '../core/auth.service';

@Component({
    selector: 'device-type-details',
    templateUrl: './device-type-details.component.html',
    styleUrls: ['./device-type-details.component.css']
})

export class DevicesTypeDetailsComponent implements OnInit {
    
    @Input() deviceType = DeviceTypeSchema;
    currentUser:User;
    currentTenant:Tenant;


    jsonBody = {};
    isReadOnly: boolean;
    
    errorMessage: string;
    formHeader: string;
    path: any;
    id: string;
    paramKey: any;
    currentDate = new Date();
    
    //-- Reactive Form
    deviceTypeDetailsForm = new FormGroup({});
    
    //-- Lookups
    collaborators = Collaborators;
    dataInterfaces = DataInterfaces;
    listOfOrganizations: Organization[];
    deviceTypeOrganizations:Organization[];
    deviceTypeStatuses = DeviceTypeStatuses;
    fromDeviceTypes = DeviceTypes;
    protocols = Protocols;
    regions = Regions;
    
    usecases: Usecase[];
    
    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private devicesService: DevicesService,
                private usersService: UsersService,
                private usecasesService: UsecasesService,
                private app:AppComponent,
                private organizationsService: OrganizationsService,
                private authService: AuthService) {
        //-- app.setPageContentFullWidth(false);
    }
    
    ngOnInit(): void {
    
        this.paramKey = this.route.params.subscribe(params => {
            this.id = params['id'];
        });
    
        this.path = this.route.snapshot.url[1]? this.route.snapshot.url[1].toString() : this.id;
    
        this.jsonBody = JSON.stringify({id: this.id});
        const params = '&name=id&value=' + this.id;


     
        if (!this.authService.isAuthenticated()) this.router.navigate(['dashboard']);
        
        this.authService.currentUser.subscribe(
            user => {
            this.currentUser = user;
            let filters:string = '';

            if (user.security_role == 'Super Admin')
                filters = '';
            else 
                filters = '&name=name&value=' + user.organization;
            this.getOrganizationsList(filters);     
            
        });
    
        this.getListOfUsecases();
        this.createFormDefault();
    
        if (this.path === 'new') {
            this.formHeader = 'New Device Type';
            this.enableFormControlsForEdit();
        } else if (this.path === 'edit') {
            this.formHeader = 'Edit Device Type';
            this.getDeviceTypeById(params);
            this.enableFormControlsForEdit();
        } else {
            this.formHeader = 'Device Type Details';
            this.getDeviceTypeById(params);
            this.disableControlsForReadOnly();
        }
    }
    

    getOrganizationsList(params:string) {
        this.organizationsService.getOrganizations(params)
            .subscribe(data => {
                    this.listOfOrganizations = data['results'];
                    this.deviceTypeOrganizations = this.listOfOrganizations;
                },
                error => this.errorMessage = <any>error);
        
    }

    /**
     * User-defined Methods
     ****************************/
    
    attachDeviceDocument() {}
    
    attachProcessedDataPolicy() {}
    
    attachRawDataPolicy() {}
    
    attachUserDataPolicy() {}
    
    cancelEditDeviceType() {
        this.disableControlsForReadOnly();
        this.router.navigate(['devicetypes/' + this.id]);
    }
    
    closeDeviceType() {
        this.router.navigate(['devicetypes']);
    }
    
    createFormDefault() {
        this.deviceTypeDetailsForm = this.fb.group({
            //-- Buttons
            //-- btnCloseDeviceTypeDetails:  new FormControl({disabled: true}),
            //-- btnEditDeviceTypeDetails:   new FormControl({disabled: true}),
            deviceTypeName:             new FormControl(),
            deviceTypeStatus:           new FormControl(),
            deviceTypeUsecase:          new FormControl(),
            deviceTypeOrganization:     new FormControl(),
            
            fromDeviceType:             new FormControl(),
            deviceTypeDetails:          new FormControl(),
            standardSettings:           new FormControl(),
            rawDataPolicy:              new FormControl(),
            processedDataPolicy:        new FormControl(),
            userDataPolicy:             new FormControl(),
            deviceTypeProtocol:         new FormControl(),
            userDataImport:             new FormControl(),
            deviceDataImport:           new FormControl(),
            deviceTypeRegion:           new FormControl(),
            rawDataFormat:              new FormControl(),
            interfaceDescription:       new FormControl(),
            pasteSampleData:            new FormControl(),
            dataInterface:              new FormControl(),
            maxAllowedTokensPerUser:    new FormControl(),
            //-- Notifications
            notificationTypeEmail:      new FormControl(),
            notificationTypeSMS:        new FormControl(),
            notificationTypeMobile:     new FormControl(),
            notificationTypeOther:      new FormControl(),
            scheduledActionsNeeded:     new FormControl(),
            schedulingWillBeManagedBy:  new FormControl(),
            isDataViewsShowing:         new FormControl(),
    
            //-- General Information
            deviceImagePath: '',
            deviceIconPath: '',
            deviceDocuments: '',
            customDeviceImagePath: '',
            
            //-- Mobile App Details
            mobileAppLoginOAuthRequirementGoogle:       new FormControl(),
            mobileAppLoginOAuthRequirementFacebook:     new FormControl(),
            mobileAppLoginOAuthRequirementOTP:          new FormControl(),
            mobileAppLoginOAuthRequirementMultiFactor:  new FormControl(),
            deviceTypeMobileAppFeatures:                new FormControl(),
            deviceTypeMobileAppPermissionMgr:           new FormControl(),
            deviceTypeUserDevicePermissions:            new FormControl(),
    
            //-- Objects that needed implementation review
            inviteOthersToCollaborate: new FormControl(),
            inviteNote: new FormControl()
            
        });
    }
    
    enableFormControlsForEdit() {
        this.isReadOnly = false;
        this.deviceTypeDetailsForm.controls['deviceTypeName'].enable();
        this.deviceTypeDetailsForm.controls['deviceTypeStatus'].enable();
        this.deviceTypeDetailsForm.controls['deviceTypeUsecase'].enable();
        this.deviceTypeDetailsForm.controls['deviceTypeOrganization'].enable();
        
        this.deviceTypeDetailsForm.controls['fromDeviceType'].enable();
        this.deviceTypeDetailsForm.controls['deviceTypeDetails'].enable();
        this.deviceTypeDetailsForm.controls['standardSettings'].enable();
        this.deviceTypeDetailsForm.controls['rawDataPolicy'].enable();
        this.deviceTypeDetailsForm.controls['processedDataPolicy'].enable();
        this.deviceTypeDetailsForm.controls['userDataPolicy'].enable();
        this.deviceTypeDetailsForm.controls['deviceTypeProtocol'].enable();
        this.deviceTypeDetailsForm.controls['userDataImport'].enable();
        this.deviceTypeDetailsForm.controls['deviceDataImport'].enable();
        this.deviceTypeDetailsForm.controls['deviceTypeRegion'].enable();
        this.deviceTypeDetailsForm.controls['rawDataFormat'].enable();
        this.deviceTypeDetailsForm.controls['interfaceDescription'].enable();
        this.deviceTypeDetailsForm.controls['pasteSampleData'].enable();
        this.deviceTypeDetailsForm.controls['dataInterface'].enable();
        this.deviceTypeDetailsForm.controls['maxAllowedTokensPerUser'].enable();
        
        this.deviceTypeDetailsForm.controls['notificationTypeEmail'].enable();
        this.deviceTypeDetailsForm.controls['notificationTypeSMS'].enable();
        this.deviceTypeDetailsForm.controls['notificationTypeMobile'].enable();
        this.deviceTypeDetailsForm.controls['notificationTypeOther'].enable();
        this.deviceTypeDetailsForm.controls['scheduledActionsNeeded'].enable();
        this.deviceTypeDetailsForm.controls['schedulingWillBeManagedBy'].enable();
        this.deviceTypeDetailsForm.controls['isDataViewsShowing'].enable();
        
        this.deviceTypeDetailsForm.controls['deviceImagePath'].enable();
        this.deviceTypeDetailsForm.controls['deviceIconPath'].enable();
        this.deviceTypeDetailsForm.controls['customDeviceImagePath'].enable();
        
        this.deviceTypeDetailsForm.controls['mobileAppLoginOAuthRequirementGoogle'].enable();
        this.deviceTypeDetailsForm.controls['mobileAppLoginOAuthRequirementFacebook'].enable();
        this.deviceTypeDetailsForm.controls['mobileAppLoginOAuthRequirementOTP'].enable();
        this.deviceTypeDetailsForm.controls['mobileAppLoginOAuthRequirementMultiFactor'].enable();
        this.deviceTypeDetailsForm.controls['deviceTypeMobileAppFeatures'].enable();
        this.deviceTypeDetailsForm.controls['deviceTypeMobileAppPermissionMgr'].enable();
        this.deviceTypeDetailsForm.controls['deviceTypeUserDevicePermissions'].enable();
        
    }
    
    editDeviceType() {
        this.router.navigate(['devicetypes/edit/' + this.id]);
    }
    
    disableControlsForReadOnly() {
        
        this.isReadOnly = true;
        this.deviceTypeDetailsForm.controls['deviceTypeName'].disable();
        this.deviceTypeDetailsForm.controls['deviceTypeStatus'].disable();
        this.deviceTypeDetailsForm.controls['deviceTypeUsecase'].disable();
        this.deviceTypeDetailsForm.controls['deviceTypeOrganization'].disable();
        
        this.deviceTypeDetailsForm.controls['fromDeviceType'].disable();
        this.deviceTypeDetailsForm.controls['deviceTypeDetails'].disable();
        this.deviceTypeDetailsForm.controls['standardSettings'].disable();
        this.deviceTypeDetailsForm.controls['rawDataPolicy'].disable();
        this.deviceTypeDetailsForm.controls['processedDataPolicy'].disable();
        this.deviceTypeDetailsForm.controls['userDataPolicy'].disable();
        this.deviceTypeDetailsForm.controls['deviceTypeProtocol'].disable();
        this.deviceTypeDetailsForm.controls['userDataImport'].disable();
        this.deviceTypeDetailsForm.controls['deviceDataImport'].disable();
        this.deviceTypeDetailsForm.controls['deviceTypeRegion'].disable();
        this.deviceTypeDetailsForm.controls['rawDataFormat'].disable();
        this.deviceTypeDetailsForm.controls['interfaceDescription'].disable();
        this.deviceTypeDetailsForm.controls['pasteSampleData'].disable();
        this.deviceTypeDetailsForm.controls['dataInterface'].disable();
        this.deviceTypeDetailsForm.controls['maxAllowedTokensPerUser'].disable();
        
        this.deviceTypeDetailsForm.controls['notificationTypeEmail'].disable();
        this.deviceTypeDetailsForm.controls['notificationTypeSMS'].disable();
        this.deviceTypeDetailsForm.controls['notificationTypeMobile'].disable();
        this.deviceTypeDetailsForm.controls['notificationTypeOther'].disable();
        this.deviceTypeDetailsForm.controls['scheduledActionsNeeded'].disable();
        this.deviceTypeDetailsForm.controls['schedulingWillBeManagedBy'].disable();
        this.deviceTypeDetailsForm.controls['isDataViewsShowing'].disable();
        
        this.deviceTypeDetailsForm.controls['deviceImagePath'].disable();
        this.deviceTypeDetailsForm.controls['deviceIconPath'].disable();
        this.deviceTypeDetailsForm.controls['customDeviceImagePath'].disable();
        
        this.deviceTypeDetailsForm.controls['mobileAppLoginOAuthRequirementGoogle'].disable();
        this.deviceTypeDetailsForm.controls['mobileAppLoginOAuthRequirementFacebook'].disable();
        this.deviceTypeDetailsForm.controls['mobileAppLoginOAuthRequirementOTP'].disable();
        this.deviceTypeDetailsForm.controls['mobileAppLoginOAuthRequirementMultiFactor'].disable();
        this.deviceTypeDetailsForm.controls['deviceTypeMobileAppFeatures'].disable();
        this.deviceTypeDetailsForm.controls['deviceTypeMobileAppPermissionMgr'].disable();
        this.deviceTypeDetailsForm.controls['deviceTypeUserDevicePermissions'].disable();
        
    }
    
    getDeviceTypeById(params: string) {
        
        this.devicesService.getDeviceTypeById(params)
            .subscribe(data => {
                let results = data['results'];
                let updatedDeviceType = data['results'][results.length-1] || null;
                
                if (updatedDeviceType) {
                    //-- Validate the `deviceTypeDocFromDB` JSON form and fix any missing attributes
                    this.deviceType = this.devicesService.validateDeviceTypeSchema(updatedDeviceType);

                    this.deviceTypeDetailsForm.setValue({
                        deviceTypeName: this.deviceType.friendly_name,
                        deviceTypeStatus: this.deviceType.device_type_status,
                        deviceTypeUsecase: this.deviceType.device_type_usecase,
                        deviceTypeOrganization: this.deviceType.device_type_organization,
                        
                        fromDeviceType: this.deviceType.details.from_device_type,
                        deviceTypeDetails: this.deviceType.details.device_type_details,
    
                        standardSettings: this.deviceType.details.standard_settings,
                        rawDataPolicy: this.deviceType.details.raw_data_policy,
                        processedDataPolicy: this.deviceType.details.processed_data_policy,
                        userDataPolicy: this.deviceType.details.user_data_policy,
                        deviceTypeProtocol: this.deviceType.details.device_type_protocol,
                        userDataImport: this.deviceType.details.user_data_import,
                        deviceDataImport: this.deviceType.details.device_data_import,
                        deviceTypeRegion: this.deviceType.details.device_type_region,
                        rawDataFormat: this.deviceType.details.raw_data_format,
                        interfaceDescription: this.deviceType.details.interface_description,
                        pasteSampleData: this.deviceType.details.paste_sample_data,
                        dataInterface: this.deviceType.details.data_interface,
                        maxAllowedTokensPerUser: this.deviceType.details.max_allowed_tokens_per_user,
    
                        notificationTypeEmail: this.deviceType.details.notification_type_email,
                        notificationTypeSMS: this.deviceType.details.notification_type_sms,
                        notificationTypeMobile: this.deviceType.details.notification_type_mobile,
                        notificationTypeOther: this.deviceType.details.notification_type_other,
                        scheduledActionsNeeded: this.deviceType.details.scheduled_actions_needed,
                        schedulingWillBeManagedBy: this.deviceType.details.scheduling_will_be_managed_by,
                        isDataViewsShowing: this.deviceType.details.is_data_views_showing,
                        deviceImagePath: this.deviceType.files.device_image.path,
                        deviceIconPath: this.deviceType.files.device_icon.path,
                        deviceDocuments: this.deviceType.files.device_documents,
                        customDeviceImagePath: this.deviceType.files.custom_actions_device_image.path,
    
                        mobileAppLoginOAuthRequirementGoogle: this.deviceType.mobile_app_details.mobile_app_login_oauth_requirement_google,
                        mobileAppLoginOAuthRequirementFacebook: this.deviceType.mobile_app_details.mobile_app_login_oauth_requirement_facebook,
                        mobileAppLoginOAuthRequirementOTP: this.deviceType.mobile_app_details.mobile_app_login_oauth_requirement_otp,
                        mobileAppLoginOAuthRequirementMultiFactor: this.deviceType.mobile_app_details.mobile_app_login_oauth_requirement_multifactor,
                        deviceTypeMobileAppFeatures: this.deviceType.mobile_app_details.mobile_app_features,
                        deviceTypeMobileAppPermissionMgr: this.deviceType.mobile_app_details.mobile_app_permission_mgr,
                        deviceTypeUserDevicePermissions: this.deviceType.mobile_app_details.user_device_permissions,
                        
                        //-- Objects that needed implementation review
                        inviteOthersToCollaborate: '',
                        inviteNote: '',
                    });
                    
                } else {
                    this.router.navigate(['devicetypes'])
                }
                
            })
    }
    
    getListOfUsecases(){
        this.usecasesService.getUsecases('')
            .subscribe(data => {
                    let usecases = data['results'];
                    this.usecases = usecases
                },
                error => this.errorMessage = <any>error);
    }
    
    saveDeviceType() {
        const newOrUpdatedDeviceType = this.deviceTypeDetailsForm.value;
        let deviceTypeName = newOrUpdatedDeviceType.deviceTypeName,
            deviceTypeId = deviceTypeName.replace(/ /g, '');
        
        if (deviceTypeId) {
            
            const body = {
                id: deviceTypeId,
                friendly_name:              newOrUpdatedDeviceType.deviceTypeName,
                device_type_status:         newOrUpdatedDeviceType.deviceTypeStatus,
                device_type_usecase:        newOrUpdatedDeviceType.deviceTypeUsecase,
                device_type_organization:   newOrUpdatedDeviceType.deviceTypeOrganization,
                details: {
                    from_device_type:               newOrUpdatedDeviceType.fromDeviceType,
                    device_type_details:            newOrUpdatedDeviceType.deviceTypeDetails,
                    standard_settings:              newOrUpdatedDeviceType.standardSettings,
                    raw_data_policy:                newOrUpdatedDeviceType.rawDataPolicy,
                    processed_data_policy:          newOrUpdatedDeviceType.processedDataPolicy,
                    user_data_policy:               newOrUpdatedDeviceType.userDataPolicy,
                    device_type_protocol:           newOrUpdatedDeviceType.deviceTypeProtocol,
                    user_data_import:                newOrUpdatedDeviceType.userDataImport,
                    device_data_import:             newOrUpdatedDeviceType.deviceDataImport,
                    device_type_region:             newOrUpdatedDeviceType.deviceTypeRegion,
                    raw_data_format:                newOrUpdatedDeviceType.rawDataFormat,
                    interface_description:          newOrUpdatedDeviceType.interfaceDescription,
                    paste_sample_data:              newOrUpdatedDeviceType.pasteSampleData,
                    data_interface:                 newOrUpdatedDeviceType.dataInterface,
                    max_allowed_tokens_per_user:    newOrUpdatedDeviceType.maxAllowedTokensPerUser,
                    
                    notification_type_email:        newOrUpdatedDeviceType.notificationTypeEmail,
                    notification_type_sms:          newOrUpdatedDeviceType.notificationTypeSMS,
                    notification_type_mobile:       newOrUpdatedDeviceType.notificationTypeMobile,
                    notification_type_other:        newOrUpdatedDeviceType.notificationTypeOther,
                    scheduled_actions_needed:       newOrUpdatedDeviceType.scheduledActionsNeeded,
                    scheduling_will_be_managed_by:  newOrUpdatedDeviceType.schedulingWillBeManagedBy,
                    is_data_views_showing:          newOrUpdatedDeviceType.isDataViewsShowing,
                },
                files: {
                    device_image: {
                        id: '', //-- Temporary; must be UUID.v4()
                        path: newOrUpdatedDeviceType.deviceImagePath
                    },
                    device_icon: {
                        id: '', //-- Temporary; must be UUID.v4()
                        path: newOrUpdatedDeviceType.deviceIconPath
                    },
                    custom_actions_device_image: {
                        id: '', //-- Temporary; must be UUID.v4()
                        path: newOrUpdatedDeviceType.customDeviceImagePath
                    },
                    device_documents: [{
                        id: '', //-- Temporary; must be UUID.v4()
                        filename: '',
                        path: ''
                    }]
                },
                custom_actions_mapping: {},
                mobile_app_details: {
                    mobile_app_login_oauth_requirement_google:          newOrUpdatedDeviceType.mobileAppLoginOAuthRequirementGoogle,
                    mobile_app_login_oauth_requirement_facebook:        newOrUpdatedDeviceType.mobileAppLoginOAuthRequirementFacebook,
                    mobile_app_login_oauth_requirement_otp:             newOrUpdatedDeviceType.mobileAppLoginOAuthRequirementOTP,
                    mobile_app_login_oauth_requirement_multifactor:     newOrUpdatedDeviceType.mobileAppLoginOAuthRequirementMultiFactor,
                    mobile_app_features:                                newOrUpdatedDeviceType.deviceTypeMobileAppFeatures,
                    mobile_app_permission_mgr:                          newOrUpdatedDeviceType.deviceTypeMobileAppPermissionMgr,
                    user_device_permissions:                            newOrUpdatedDeviceType.deviceTypeUserDevicePermissions
                },
                time_created: this.currentDate,
                created_by: this.currentUser.id
                
            };
    
            if (this.path === 'new') {
                body['time_created'] = this.currentDate;
                body['created_by'] = this.currentUser.id;
            } else {
                body['time_updated'] = this.currentDate;
                body['updated_by'] = this.currentUser.id;
            }
    
            let saveDoc = {
                id: deviceTypeId,
                jsonBody: JSON.stringify(body),
                objectType: Constants.OBJECT_TYPE.DeviceType
            };
    
            //-- Save new or updated `Device Type`
            console.log('Saves new or updated `Device Type` %j', this.devicesService.saveNewOrUpdatedDevice(saveDoc));
    
            this.router.navigate(['devicetypes']);
            
        } else {
            alert('Cannot save an empty [Device Type ID]');
        }
    }
    
    sendInviteNote() {}
    
}
