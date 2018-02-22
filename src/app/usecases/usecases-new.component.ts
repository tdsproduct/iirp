import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Usecase, UsecaseStatuses, UsecaseTemplates, UsecaseTypes, UsecaseIcons, UsecaseDocuments } from '../data-models/usecase';
import { Constants, Collaborators, Industries } from '../data-models/common';
import { ListOfDevices } from '../data-models/device';
import { ListOfTenantsNames } from '../data-models/tenant';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'usecases-new',
    templateUrl: './usecases-new.component.html',
    styleUrls: ['./usecases-new.component.css']
})

export class UsecasesNewComponent implements OnInit {
    
    @Input() useCase = Usecase;
    jsonBody = {};
    
    //-- Reactive Form
    usecaseNewForm = new FormGroup({});
    
    //-- Lookups
    devices = ListOfDevices;
    industries = Industries;
    usecaseStatuses = UsecaseStatuses;
    usecaseTemplates = UsecaseTemplates;
    usecaseTenants = ListOfTenantsNames;
    usecaseTypes = UsecaseTypes;
    usecaseCollaborators = Collaborators;
    usecaseIcons = UsecaseIcons;
    usecaseDocuments = UsecaseDocuments;

    constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {}

    ngOnInit() {
        this.createForm();
    }
    
    createForm() {
        this.usecaseNewForm = this.fb.group({
            usecaseStatus: new FormControl({value: Constants.DEFAULT_COMMON_STATUS_DRAFT, disabled: false}),
            inviteNote: '',
            inviteOthersToCollaborate: '',
            usecaseCollaborators: [{
                email: '',
                status: '',
                invite_note: ''
            }],
    
            usecaseTemplate: Constants.DEFAULT_USECASE_TEMPLATE,
            usecaseTenant: Constants.DEFAULT_USECASE_TENANT,
            usecaseName: '',
            usecaseType: Constants.DEFAULT_USECASE_TYPE_CNC,
            description: '',
            industry: Constants.DEFAULT_USECASE_INDUSTRY,
            userHierarchy: '',
            changeRoleFunctionality: '',
            userUnsubscribe: '',
            isUserInviteFeatureIncluded: true,
    
            //-- Files
            usecaseIcon: {
                id: '',
                path: ''
            },
            usecaseDocuments: [
                {
                    id: '', //-- Temporary; must be UUID.v4()
                    filename: '',
                    path: ''
                }
            ]
            
        });
    }

    cancelNewUsecase() {
        this.router.navigate(['/usecases']);
    }

    sendInviteNote() {}
    
    uploadUsecaseIcon() {}

    saveAsTemplate() {}
    
    saveNewUsecase() {
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        
        const newUsecase = this.usecaseNewForm.value;
        let usecaseId = newUsecase.usecaseName.replace(/ /g, '');
        if (usecaseId) {
            let currentDate = new Date();
            console.log('Saving ' + usecaseId);
            
            const body = {
                id: usecaseId,
                usecase_status: newUsecase.usecaseStatus,
                details: {
                    usecase_template: newUsecase.usecaseTemplate,
                    usecase_tenant: newUsecase.usecaseTenant,
                    usecase_name: newUsecase.usecaseName,
                    usecase_type: newUsecase.usecaseType,
                    description: newUsecase.description,
                    industry: newUsecase.industry,
                    
                },
    
                user_info: {
                    user_hierarchy: newUsecase.userHierarchy,
                    change_role_functionality: newUsecase.changeRoleFunctionality,
                    user_unsubscribe: newUsecase.userUnsubscribe,
                    is_user_invite_feature_included: newUsecase.isUserInviteFeatureIncluded
                },
    
                invite_others_to_collaborate: newUsecase.inviteOthersToCollaborate,
                
                /*
                usecase_collaborators: [{
                    email: newUsecase.usecaseCollaborator.email,
                    status: '',
                    invite_note: newUsecase.inviteNote
                }],
                
                files: {
                    device_image: {
                        id: '', //-- Temporary; must be UUID.v4()
                        path: newUsecase.deviceImagePath
                    },
                    usecase_icon: {
                        id: '', //-- Temporary; must be UUID.v4()
                        path: newUsecase.deviceIconPath
                    },
                    device_documents: [{
                        id: '', //-- Temporary; must be UUID.v4()
                        filename: '',
                        path: ''
                    }]
                },
                */
                
                time_created: currentDate
                
            };
            
            const saveNewUsecaseEndpoint = 'https://api.iotworldlabs.io/iirp/?guid=d97a3ae7-8f2f-4789-9f61-62b5a2ef6ce5&a=add&ot=UseCase';
            this.jsonBody = JSON.stringify(body);
            
            this.http
                .post(saveNewUsecaseEndpoint, this.jsonBody)
                .subscribe(data => {
                    if (data['nInserted'] && data['nInserted'] === 1) {
                       // console.log('Successfully saved Use Case ID ' + usecaseId);
                        this.router.navigate(['usecases']);
                    }
                    else {
                       // console.log('Unable to save Use Case ID ' + usecaseId);
                    }
                })
        } else {
            alert('Cannot save an empty [Use Case Name]');
        }
        
    }
    
    publishNewUsecase () {}

}
