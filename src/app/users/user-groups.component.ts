import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGroup, User } from '../data-models/user';
import { Tenant } from '../data-models/tenant';
import { UsersService } from '../core/users.service';
import { AuthService } from '../core/auth.service';

@Component ({
    selector: 'user-groups-list',
    templateUrl: './user-groups.component.html',
    styleUrls: ['./user-groups.component.css']
})

export class UserGroupsComponent {

    currentUser: User;
    currentTenant: Tenant;

    listOfUserGroups:UserGroup[];
    userGroups: UserGroup[];

    errorMessage:string;
    
    constructor(private router: Router, private usersService:UsersService, private authService:AuthService) {}
    
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('table-manage-combine-ready'));
        if (!this.authService.isAuthenticated()) this.router.navigate(['dashboard']);
        
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
            let filters:string = '';
            if (this.currentUser.security_role == 'Super Admin') 
                this.getUserGroupList(filters);
            else if (this.currentUser.security_role == 'Tenant Admin')
            {
                let filters: string = '&name=organization&value=' + this.currentUser.organization;
                this.getUserGroupList(filters);
            }

        });
        
    }


    getUserGroupList(params:string){
        this.usersService.getUserGroups(params)
            .subscribe(data => {
                    this.userGroups = data['results'];
                    this.listOfUserGroups = this.userGroups;
                },
                error => this.errorMessage = <any>error);
        
    }
    loadUserGroupDetailsPage(param:string)
    {
        this.router.navigate(['usergroups/']); //just go back to usergroups page
    }
    
    loadUserGroupNewPage() {
        this.router.navigate(['usergroups/new']);
    }
}