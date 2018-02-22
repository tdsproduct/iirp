
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { AppComponent }  from '../app.component';
import { SecurityRoles, SecurityRole } from '../data-models/security-role';
import { SecurityRolesService } from '../core/securityroles.service';

@Component({
    selector: 'security-roles',
    templateUrl: './security-roles.component.html',
    styleUrls: ['./security-roles.component.css']
})

export class SecurityRolesComponent {
    securityRoles:SecurityRole[];
    
        constructor(private router: Router, private securityRolesService: SecurityRolesService) {}
        
        ngOnInit() {
            window.dispatchEvent(new CustomEvent('table-manage-combine-ready'));
            
            this.securityRoles = this.securityRolesService.getStaticSecurityRoles(); //change this after integrate with database
        }
        
        loadSecurityRoleDetailsPage(param:string)
        {
            this.router.navigate(['securityroles/' + param]);
        }
        loadSecurityRoletNewPage() {
            this.router.navigate(['securityroles/new']);
        }
        
        loadSecurityRoleImportPage() {
            this.router.navigate(['securityroles/import']);
        }
        
}