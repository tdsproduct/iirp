import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import { ChartModule }              from 'angular-highcharts';


import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';



// Dashboard
import { DashboardPage }                    from './dashboard';
import { DashboardOrganizationAdminPage }   from './dashboard-organization-admin';
import { DashboardTenantAdminPage }         from './dashboard-tenant-admin';
import { WyndesDashboardPage } from './dashboard-wyndes-dashboard';
import { WyndesPowerBi } from './dashboard-wyndes-powerbi';


@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChartModule,
        AuthModule,
        SharedModule

    ],
    declarations: [

        DashboardPage,
        DashboardOrganizationAdminPage,
        DashboardTenantAdminPage,
        WyndesDashboardPage,
        WyndesPowerBi,


    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers:[]
})
export class DashboardModule{}
