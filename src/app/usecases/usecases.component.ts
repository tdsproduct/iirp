import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usecase } from '../data-models/usecase';
import { Tenant } from '../data-models/tenant';
import { User } from '../data-models/user';


//-- Services
import { UsecasesService } from '../core/usecases.service';
import { UsersService } from '../core/users.service';
import { AuthService } from '../core/auth.service';

@Component ({
    selector: 'usecases-list',
    templateUrl: './usecases.component.html',
    styleUrls: ['./usecases.component.css']
})

export class UsecasesComponent implements OnInit {
    currentUser: User;
    currentTenant: Tenant;

    listOfUsecases: Usecase[];
    errorMessage: string;
    permissionFiltersWithValues = '';
    
    //-- Inject HttpClient into your component or service
    constructor(private router: Router,
                private usersService: UsersService,
                private usecasesService: UsecasesService,
                private authService: AuthService) {}
    
    ngOnInit(): void {
        window.dispatchEvent(new CustomEvent('table-manage-combine-ready'));
        this.createPermissionFilter();

        if (!this.authService.isAuthenticated()) this.router.navigate(['dashboard']);
        
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
            let filters:string = '';
            if (this.currentUser.security_role == 'Super Admin') 
                this.getUsecasesList(filters);

        });

        this.authService.currentUsersTenant.subscribe (tenant => {
            // we only get here if the user is not a 'Super Admin'
            if (this.currentUser.security_role != 'Super Admin')
            {
                let filters: string = '&name=usecase_tenant&value=' + tenant.id;
                this.getUsecasesList(filters);    
            }
        });
    }
    
    /**
     * User-defined Methods
     ****************************/
    
    createPermissionFilter() {
        let name = 'usecase_tenant';
        let value = 'Company1-Manufacturing';
        
        this.usersService.getPermissionFilterValues('&name=' + name + '&value=' + value)
            .subscribe(data => {
                    this.permissionFiltersWithValues = data['results'];
                    this.getUsecasesList(this.permissionFiltersWithValues);
                },
                error => this.errorMessage = <any>error);
    }
    
    getUsecasesList(params: string) {
    
        this.usecasesService.getUsecases(params)
            .subscribe(data => {
                    this.listOfUsecases = data['results'];
                },
                error => this.errorMessage = <any>error);
    
    }
    
    getUsecasesTemplates() {
        //console.log('Retrieving templates for Use Cases');
        alert('getUsecase Templates not yet implemented.')
    }
    
    loadUseCaseDetailsPage(param:string) {
        this.router.navigate(['usecases/' + param]);
    }
    
    loadUsecasesNewPage() {
        this.router.navigate(['usecases/new']);
    }
    
    loadUsecasesImportPage() {
        this.router.navigate(['usecases/import']);
    }
    
}

