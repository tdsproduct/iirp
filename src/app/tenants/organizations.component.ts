import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Organization } from '../data-models/tenant';
import { OrganizationsService } from '../core/organizations.service';
import { User } from '../data-models/user';
import { AuthService } from '../core/auth.service';


@Component({
    selector: 'organizations-list',
    templateUrl: './organizations.component.html',
    styleUrls: ['./organizations.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class OrganizationsComponent implements OnInit {
    
    listOfOrganizations: Organization[];
    organizations: Organization[];
    errorMessage:string;

    currentUser:User;

    //-- Inject HttpClient into your component or service
    constructor(private router: Router, private organizationsService: OrganizationsService, private authService:AuthService) {

    }
    
    
    ngOnInit(): void {
        window.dispatchEvent(new CustomEvent('table-manage-combine-ready'));
       
        if (!this.authService.isAuthenticated()) this.router.navigate(['login']);
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
            let filters:string = '';

            if (this.currentUser.security_role == 'Super Admin')
                filters = '';
            else 
                filters = '&name=name&value=' + this.currentUser.organization;
            this.getOrganizationsList(filters);    

        });


    }

   
    
    getOrganizationsList(params:string) {
        this.organizationsService.getOrganizations(params)
            .subscribe(data => {
                    this.listOfOrganizations = data['results'];
                    this.organizations = this.listOfOrganizations;
                },
                error => this.errorMessage = <any>error);
        
    }


    
    loadOrganizationDetailsPage(params:string)
    {
        this.router.navigate(['organizations/'+params])
    }
    
    loadOrganizationNewPage() {
        this.router.navigate(['organizations/new']);
    }
    
    loadOrganizationImportPage() {
        this.router.navigate(['organizations/import']);
    }
    
}