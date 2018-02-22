import { NgModule } from '@angular/core';
import { Title }                     from '@angular/platform-browser';


//-- Services
import { TenantsService }           from './tenants.service';
import { OrganizationsService }     from './organizations.service';
import { ObjectsService }           from './objects.service';
import { UsecasesService }          from './usecases.service';
import { DashboardService }         from './dashboard.service';
import { DevicesService }           from './devices.service';
import { UsersService }             from './users.service';
import { ImportService }            from './import.service';
import { AuthGuardService } from './auth-guard.service';
import { CommonService }            from './common.service';
import { SecurityRolesService }            from './securityroles.service';

@NgModule({
    providers: [ 
        AuthGuardService,

        DashboardService,
        DevicesService,
        ImportService,
        OrganizationsService, 
        ObjectsService,
        TenantsService,
        Title,
        UsecasesService,
        UsersService ,
        SecurityRolesService, 
        CommonService

     ]
})

export class CoreModule{}