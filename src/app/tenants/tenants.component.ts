import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TenantsService } from '../core/tenants.service';
import { AuthService } from '../core/auth.service';
import { User } from '../data-models/user';
import { Tenant } from '../data-models/tenant';

@Component({
    selector: 'table-manage-combine',
    templateUrl: './tenants.component.html',
    styleUrls: ['./tenants.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class TenantsComponent implements OnInit {
    
    private currentUser: User;
    private listOfTenants: Tenant[];
    
    // -- Inject HttpClient into your component or service
    constructor(private router: Router,  private tenantsService:TenantsService, private authService:AuthService) {};

    ngOnInit(): void {
        window.dispatchEvent(new CustomEvent('table-manage-combine-ready'));

        if (!this.authService.isAuthenticated()) this.router.navigate(['login']);
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
            let filters:string = '';
            if (this.currentUser.security_role == 'Super Admin') 
                filters = '';
            else
                filters = '&name=details.tenant_admins.email&value=' + this.currentUser.email_address;
            this.tenantsService.getTenants(filters)
                .subscribe(data => {
                    this.listOfTenants = data['results'];
                    if (this.listOfTenants.length == 0)
                        filters = '&name=details.organization&value=' + this.currentUser.organization;
                        this.tenantsService.getTenants(filters)
                            .subscribe( datafilteredbyorg => {
                                this.listOfTenants = datafilteredbyorg['results'];

                            });
            });

        });

       
       
    };

    loadTenantDetailsPage(params:string)
    {
        this.router.navigate(['tenants/'+params])
    }

    loadTenantNewPage() {
        this.router.navigate(['tenants/new']);
    }
    
    loadTenantImportPage() {
        this.router.navigate(['tenants/import']);
    }
    
   

}