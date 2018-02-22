import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../data-models/user';
import { Tenant } from '../data-models/tenant';
import { UsersService } from '../core/users.service';
import { AuthService } from '../core/auth.service';


@Component ({
    selector: 'users-list',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})

export class UsersComponent {

    currentUser: User;
    currentTenant: Tenant;
    
    listOfUsers: User[];
    users: User[];
    errorMessage:string;

    //-- Inject HttpClient into your component or service
    constructor(private router: Router, private usersService:UsersService, private authService:AuthService) {}
    
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('table-manage-combine-ready'));
        if (!this.authService.isAuthenticated()) this.router.navigate(['dashboard']);
        
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
            let filters:string = '';
            if (this.currentUser.security_role == 'Super Admin') 
                this.getUsersList(filters);
            
            else if (this.currentUser.security_role == 'Tenant Admin')
            {
                let filters: string = '&name=organization&value=' + this.currentUser.organization;
                this.getUsersList(filters);
            }

        });

        
    }

    getUsersList(params:string) {
        this.usersService.getUsers(params)
            .subscribe(data => {
                    this.users = data['results'];
                    this.listOfUsers = this.users;
                },
                error => this.errorMessage = <any>error);
        
    }
    loadUserDetailsPage(param:string)
    {
        this.router.navigate(['users/' + param]);
    }
    
    loadUserNewPage() {
        this.router.navigate(['users/new']);
    }
    
    loadUserImportPage() {
        this.router.navigate(['users/import']);
    }
}
