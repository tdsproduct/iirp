import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';

//-- Services
import { UsecasesService } from '../core/usecases.service';
import { TenantsService }   from '../core/tenants.service';
import { CommonService } from '../core/common.service';
import { AuthService } from '../core/auth.service';

//-- Data Models
import { Collaborators, CommonLookups } from '../data-models/common';
import { Tenant } from '../data-models/tenant';
import { UsecaseDocuments, UsecaseSchema, UsecaseTemplates, UsecaseStatuses, UsecaseTypes } from '../data-models/usecase';
import { User } from '../data-models/user';
import { Group } from '../data-models/common';

@Component({
    selector: 'usecase-details',
    templateUrl: './usecase-details.component.html',
    styleUrls: ['./usecase-details.component.css']
})

export class UsecaseDetailsComponent implements OnInit {
    @Input() usecase = UsecaseSchema;
    currentUser:User;

    jsonBody = {};
    
    isReadOnly: boolean;
    errorMessage: string;
    path: any;
    id: string;
    paramKey: any;
    currentDate = new Date();
    
    //-- Lookups
    usecaseCollaborators = Collaborators;
    usecaseDocuments = UsecaseDocuments;
    usecaseStatuses = UsecaseStatuses;
    usecaseTemplates = UsecaseTemplates;
    usecaseIndustries:Group[];
    listOfIndustries:Group[];

    usecaseTypes = UsecaseTypes;
    usecaseTenants: Tenant[];
    
    //-- Inject HttpClient into your component or service
    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private usecasesService: UsecasesService,
                private tenantsService: TenantsService,
                private commonService: CommonService,
                private authService: AuthService) {
        //-- app.setPageContentFullWidth(false);
    }
    
    //-- Reactive Form
    usecaseDetailsForm = new FormGroup({});
    
    ngOnInit(): void {
        
        this.paramKey = this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log('id = ' + this.id);
        });

        this.path = this.route.snapshot.url[1]? this.route.snapshot.url[1].toString() : this.id;
        console.log('path = ' + this.path);
        //-- Make the HTTP request
        this.jsonBody = JSON.stringify({id: this.id});
        const params = '&name=id&value=' + this.id;
        
        //-- Make the HTTP request via Usecase & Tenant Service
        if (!this.authService.isAuthenticated()) this.router.navigate(['dashboard']);
        
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
            let filters:string = '';
            if (this.currentUser.security_role == 'Super Admin') 
                this.getListOfTenants(filters);

            this.getIndustryList();

        });

        this.authService.currentUsersTenant.subscribe (tenant => {
            // we only get here if the user is not a 'Super Admin'
            if (this.currentUser.security_role != 'Super Admin')
            {
                let filters: string = '&name=id&value=' + tenant.id;
                this.getListOfTenants(filters);    
            }
        });

        if (this.id) {
            this.getUsecaseById(params);
        }
        
        this.createFormDefault();
        
    }
    
    /**
     * User Methods
     ****************/
    
    cancelEditUsecase() {
        this.disableControlsForReadOnly();
        this.router.navigate(['usecases/' + this.id]);
    }
    
    closeUsecaseDetails() {
        this.router.navigate(['usecases'])
    }
    
    createFormDefault() {
        this.usecaseDetailsForm = this.fb.group({
            
            usecaseFriendlyName:        new FormControl(),
            usecaseStatus:              new FormControl(),
            usecaseTemplate:            new FormControl(),
            usecaseTenant:              new FormControl(),
            usecaseType:                new FormControl(),
            description:                new FormControl(),
            usecaseIndustry:            new FormControl(),
            userHierarchy:              new FormControl(),
            changeRoleFunctionality:    new FormControl(),
            userUnsubscribe:            new FormControl(),
            isUserInviteFeatureIncluded: new FormControl(),
            collaborators:              new FormControl(),
            usecaseFileIconId:          new FormControl(),
            usecaseFileIconPath:        new FormControl(),
            usecaseDocuments:           new FormControl(),
            devices:                    new FormControl()
            
        });
    }
    
    disableControlsForReadOnly() {
        
        console.log('Creating read-only form');
        this.isReadOnly = true;

        this.usecaseDetailsForm.controls['usecaseFriendlyName'].disable();
        this.usecaseDetailsForm.controls['usecaseStatus'].disable();
        this.usecaseDetailsForm.controls['usecaseTemplate'].disable();
        this.usecaseDetailsForm.controls['usecaseTenant'].disable();
        this.usecaseDetailsForm.controls['usecaseType'].disable();
        
        this.usecaseDetailsForm.controls['description'].disable();
        this.usecaseDetailsForm.controls['usecaseIndustry'].disable();
        this.usecaseDetailsForm.controls['userHierarchy'].disable();
        this.usecaseDetailsForm.controls['changeRoleFunctionality'].disable();
        
        this.usecaseDetailsForm.controls['userUnsubscribe'].disable();
        this.usecaseDetailsForm.controls['isUserInviteFeatureIncluded'].disable();
        
        this.usecaseDetailsForm.controls['collaborators'].disable();
        this.usecaseDetailsForm.controls['usecaseFileIconId'].disable();
        this.usecaseDetailsForm.controls['usecaseFileIconPath'].disable();
        this.usecaseDetailsForm.controls['usecaseDocuments'].disable();
        this.usecaseDetailsForm.controls['devices'].disable();
        
    }
    
    enableFormControlsForEdit() {
        
        console.log('Creating editable form');
        this.isReadOnly = false;
        this.usecaseDetailsForm.controls['usecaseFriendlyName'].enable();
        this.usecaseDetailsForm.controls['usecaseStatus'].enable();
        this.usecaseDetailsForm.controls['usecaseTemplate'].enable();
        this.usecaseDetailsForm.controls['usecaseTenant'].enable();
        this.usecaseDetailsForm.controls['usecaseType'].enable();
        
        this.usecaseDetailsForm.controls['description'].enable();
        this.usecaseDetailsForm.controls['usecaseIndustry'].enable();
        this.usecaseDetailsForm.controls['userHierarchy'].enable();
        this.usecaseDetailsForm.controls['changeRoleFunctionality'].enable();
        
        this.usecaseDetailsForm.controls['userUnsubscribe'].enable();
        this.usecaseDetailsForm.controls['isUserInviteFeatureIncluded'].enable();
        
        this.usecaseDetailsForm.controls['collaborators'].enable();
        this.usecaseDetailsForm.controls['usecaseFileIconId'].enable();
        this.usecaseDetailsForm.controls['usecaseFileIconPath'].enable();
        this.usecaseDetailsForm.controls['usecaseDocuments'].enable();
        this.usecaseDetailsForm.controls['devices'].enable();
        
    }
    
    getListOfTenants(params:string){
        let filters = ''; //need to add tenant id here
        this.tenantsService.getTenants(params)
            .subscribe(data => {
                    this.usecaseTenants = data['results'];
                },
                error => this.errorMessage = <any>error);
    }

    getIndustryList() {
        
           
        
                this.commonService.getIndustries()
                    .subscribe( data => {
                        this.listOfIndustries = data ["results"];
                            this.usecaseIndustries = this.listOfIndustries;
                    },
                );
               
        
            }
    
    getUsecaseById(params: string) {
        
        this.usecasesService.getUsecaseById(params)
            .subscribe(data => {
                let results = data['results'];
                let updatedUsecase = data['results'][results.length-1] || null;
                console.log('Result of GET Usecase Details via Usecase.Service %j', updatedUsecase);
                
                if (updatedUsecase) {
                    //-- Validate the `usecaseDocFromDB` JSON form and fix any missing attributes
                    this.usecase = this.usecasesService.validateUsecaseSchema(updatedUsecase);
                    console.log('Result of ValidateUserSchema from User.Service %j', this.usecase);
                    
                    console.log('Setting values for `usecase` with validated JSON %j', this.usecase);
                    this.usecaseDetailsForm.setValue({
                        usecaseFriendlyName:        this.usecase.friendly_name,
                        usecaseStatus:              this.usecase.usecase_status,
                        usecaseIndustry:            this.usecase.industry,
                        usecaseTemplate:            this.usecase.usecase_template,
                        usecaseTenant:              this.usecase.usecase_tenant,
                        usecaseType:                this.usecase.usecase_type,
                        description:                this.usecase.description,
                        userHierarchy:              this.usecase.user_info.user_hierarchy,
                        changeRoleFunctionality:    this.usecase.user_info.change_role_functionality,
                        userUnsubscribe:            this.usecase.user_info.user_unsubscribe,
                        isUserInviteFeatureIncluded: this.usecase.user_info.is_user_invite_feature_included,
                        collaborators:      [{
                            email: 'tom.bok@company.com',
                            status: 'CONFIRMED',
                            invite_note: ''
                        }, {
                            email: 'jean.ko@example.com',
                            status: 'INVITED',
                            invite_note: ''
                        }],
                        usecaseFileIconId:      this.usecase.files.usecase_icon.id,
                        usecaseFileIconPath:    this.usecase.files.usecase_icon.path,
                        usecaseDocuments: [
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
                        devices: [
                            {'device_model_id':'D4DT-SG-000','device_model':'SmartGeyser-D4DT-Model2','device_type':'water-heater','sensors':'3','data_freq':'10','packet_size':'512','json_fields':'timeStamp deviceId field1 field2 field3','data_protocols':'HTTPS-POST-JSON'},
                            {'device_model_id':'D4DT-WP-101','device_model':'WaterPurifier-D4DT-Model1','device_type':'water-filter','sensors':'3','data_freq':'12','packet_size':'256','json_fields':'timeStamp deviceId field1 field2 field3','data_protocols':'HTTPS-POST-JSON'},
                            {'device_model_id':'D4DT-WP-102','device_model':'WaterPurifier-D4DT-Model1','device_type':'water-filter','sensors':'3','data_freq':'12','packet_size':'256','data_fields':'timeStamp deviceId field1 field2 field3','data_interface':'MQTT,HTTPS,POST,JSON'},
                            {'device_model_id':'D4DT-WP-103','device_model':'WaterPurifier-D4DT-Model1','device_type':'water-filter','sensors':'3','data_freq_perhour':'12','packet_size':'256','data_fields':'timeStamp deviceId field1 field2 field3','data_interface':'MQTT,HTTPS,POST,JSON'},
                            {'device_model_id':'D4DT-WP-104','device_model':'WaterPurifier-D4DT-Model1','device_type':'water-filter','sensors':'3','data_freq_perhour':'12','packet_size_bytes':'256','data_fields':'timeStamp deviceId field1 field2 field3','data_interface':'MQTT,HTTPS,POST,JSON'},
                            {'device_model_id':'D4DT-WP-105','device_model':'TEST-WaterPurifier-D4DT-Model1','device_type':'water-filter','sensors':'3','data_freq_perhour':'12','packet_size_bytes':'256','data_fields':'timeStamp deviceId field1 field2 field3','data_interface':'MQTT,HTTPS,POST,JSON'}
                        ]
                        
                    });
                    
                    this.path === 'edit'? this.enableFormControlsForEdit() : this.disableControlsForReadOnly();
                    
                } else {
                    this.router.navigate(['usecases'])
                }
                
            })
    }
    
    loadEditUsecase() {
        this.enableFormControlsForEdit();
    }
    
    saveEditUsecase() {
        const updatedUsecase = this.usecaseDetailsForm.value;
        let useCaseId = updatedUsecase.usecaseFriendlyName.replace(/ /g, '');
        if (useCaseId) {
            
            const body = {
                id:                 useCaseId || '',
                name:               useCaseId || '',
                friendly_name:      updatedUsecase.usecaseFriendlyName || '',
                usecase_status:     updatedUsecase.usecaseStatus || '',
                industry:           updatedUsecase.usecaseIndustry || '',
                usecase_template:   updatedUsecase.usecaseTemplate || '',
                usecase_tenant:     updatedUsecase.usecaseTenant || '',
                usecase_type:       updatedUsecase.usecaseType || '',
                description:        updatedUsecase.description || '',
                
                user_info: {
                    user_hierarchy:                     updatedUsecase.userHierarchy || '',
                    change_role_functionality:          updatedUsecase.changeRoleFunctionality || '',
                    user_unsubscribe:                   updatedUsecase.userUnsubscribe || '',
                    is_user_invite_feature_included:    updatedUsecase.isUserInviteFeatureIncluded || true,
                },
                collaborators:      [{
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
                        id:         updatedUsecase.usecaseFileIconId || '',
                        path:       updatedUsecase.usecaseFileIconPath || ''
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
                updated_date:       this.currentDate,
                updated_by:        ''
            };
            
            let saveDoc = {
                id: useCaseId,
                jsonBody: JSON.stringify(body)
            };
            
            //-- Save updated `User`
            console.log('Saves updated `Use Case` %j', this.usecasesService.saveNewOrUpdatedUsecase(saveDoc));
            
            this.router.navigate(['usecases']);
            
        } else {
            alert('Cannot save an empty [Use Case]');
        }
    }
    
}