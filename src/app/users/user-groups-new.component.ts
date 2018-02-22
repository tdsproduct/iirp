import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { AppComponent }  from '../app.component';
import {  UserGroup } from '../data-models/user';
import { SecurityRoles } from '../data-models/security-role';
import { StatesOrProvincesPerCountry } from '../data-models/common';
import { UsersService } from '../core/users.service';

@Component({
    selector: 'user-groups-new',
    templateUrl: './user-groups-new.component.html',
    styleUrls: ['./user-groups-new.component.css']
})

export class UserGroupsNewComponent implements OnInit {
    @Input() organization:string;

    listOfUserGroups: UserGroup[];
    userGroup = UserGroup;
    
    
        loadUserGroupsNewPage() {
            this.router.navigate(['usergroups/new']);
        }

    //-- Reactive Form
    userGroupsNewForm = new FormGroup({});

        //-- Lookups
    usersSecurityRoles = SecurityRoles;

    constructor(private app: AppComponent, 
                private router: Router, 
                private fb:FormBuilder,
                private usersService: UsersService) {
        app.setPageContentFullWidth(false);
        this.createForm();
    }

    ngOnInit() {
        window.dispatchEvent(new CustomEvent('user-groups-new-ready'));
    }

    createForm(){
        this.userGroupsNewForm = this.fb.group({
            userGroupName:'',
            userSecurityRole:''
        })
    }

    saveNewUserGroup() {

        const updatedUserGroup = this.userGroupsNewForm.value;
        let userGroupId = updatedUserGroup.userGroupName;

        let currentDate = new Date();
        let createdDate = new Date();
        let createdBy = '';
        const body = {
            id: userGroupId,
            name: updatedUserGroup.userGroupName,
            organization: this.organization || 'D4DT',
            security_role: updatedUserGroup.userSecurityRole,

            time_created: new Date(),
            time_updated: new Date(),
            created_by: '',
            updated_by: ''
        };

        let saveDoc = {
            userGroupId: userGroupId,
            jsonBody: JSON.stringify(body)
        };

        //-- Save updated `User`
        console.log('Saves updated `User` %j', this.usersService.saveNewOrUpdatedUserGroup(saveDoc));

        this.router.navigate(['usergroups']);
    }
}
