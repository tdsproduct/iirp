import { NgModule, ModuleWithProviders }                from '@angular/core';
import { RouterModule, Routes, PreloadAllModules }    from '@angular/router'; 

//-- Login
import { SigninComponent }          from './auth/signin.component';
import { CallbackComponent }        from './callback/callback.component';

//-- Dashboard
import { DashboardPage }                      from './dashboard/dashboard';
import { DashboardOrganizationAdminPage }        from './dashboard/dashboard-organization-admin';
import { DashboardTenantAdminPage }             from './dashboard/dashboard-tenant-admin';
import { WyndesDashboardPage } from './dashboard/dashboard-wyndes-dashboard';
//-- Tenants
import { TenantsComponent }         from './tenants/tenants.component';
import { TenantsImportComponent }   from './tenants/tenants-import.component';
import { TenantDetailsComponent }   from './tenants/tenant-details.component';

import { OrganizationsComponent }           from './tenants/organizations.component';
import { OrganizationsImportComponent }     from './tenants/organizations-import.component';
import { OrganizationDetailsComponent }     from './tenants/organization-details.component';

//-- UseCases
import { UsecasesComponent }        from './usecases/usecases.component';
import { UsecasesNewComponent }     from './usecases/usecases-new.component';
import { UsecasesImportComponent }  from './usecases/usecases-import.component';
import { UsecaseDetailsComponent }  from './usecases/usecase-details.component';

//-- Devices
import { DeviceModelsComponent }             from './devices/device-models.component';
import { DevicesImportComponent }       from './devices/devices-import.component';
import { DeviceModelDetailsComponent }  from './devices/device-model-details.component';
import { DevicesTypesComponent }        from './devices/device-types.component';
import { DevicesTypesImportComponent }  from './devices/device-types-import.component';
import { DevicesTypeDetailsComponent }  from './devices/device-type-details.component';

//-- Objects
import { ObjectsComponent }        from './objects/objects.component';
import { ObjectsImportComponent }  from './objects/objects-import.component';

//-- Users
import { UsersComponent }           from './users/users.component';
import { UsersNewComponent }        from './users/users-new.component';
import { UsersImportComponent }     from './users/users-import.component';
import { UserDetailsComponent }     from './users/user-details.component';

import { UserGroupsComponent }      from './users/user-groups.component';
import { UserGroupsNewComponent }   from './users/user-groups-new.component';

import { SecurityRolesComponent } from './securityroles/security-roles.component';
import { SecurityRolesImportComponent }   from './securityroles/security-roles-import.component'
import { WyndesPowerBi } from './dashboard/dashboard-wyndes-powerbi';

const routes: Routes = [


    //-- login
    { path: 'login', component:SigninComponent, data: {title:'Login'}},
    { path: 'callback', component:CallbackComponent },
     
    { path: '', redirectTo: 'dashboard', pathMatch: 'full', data: {title:'Home'} },
    { path: 'dashboard', component: DashboardPage, data: { title: 'Dashboard'} },
    { path: 'dashboard/organization-admin', component: DashboardOrganizationAdminPage, data: { title: 'Admin Dashboard'} },
    { path: 'dashboard/tenant-admin', component: DashboardTenantAdminPage, data: { title: 'Tenant Admin Dashboard'}},
    { path: 'dashboard/wyndes-dashboard', component: WyndesDashboardPage, data: { title: 'Wyndes Dashboard'}},
    { path: 'dashboard/wyndes-powerbi', component: WyndesPowerBi, data: { title: 'Wyndes powerBI'}},
    
    //-- Tenants
    { path: 'tenants', component: TenantsComponent, data: { title: 'Tenants'} },
    { path: 'tenants/new', component: TenantDetailsComponent, data: { title: 'New Tenant'} },
    { path: 'tenants/import', component: TenantsImportComponent, data: { title: 'Import Tenant'} },
    { path: 'tenants/edit/:id', component: TenantDetailsComponent, data: {title: 'Edit Tenant'} },
    { path: 'tenants/:id', component: TenantDetailsComponent, data: { title: 'Tenant Details'} },
    
    //-- Organizations
    { path: 'organizations', component: OrganizationsComponent, data: {title: 'Organizations'} },
    { path: 'organizations/new', component: OrganizationDetailsComponent, data: {title: 'New Organization'} },
    { path: 'organizations/import', component: OrganizationsImportComponent, data: {title:'Import Organization'} },
    { path: 'organizations/edit/:id', component: OrganizationDetailsComponent, data: {title: 'Edit Organization'}  },
    { path: 'organizations/:id', component: OrganizationDetailsComponent, data: { title: 'Organization Details'} },
    
    //-- Use Case
    { path: 'usecases', component: UsecasesComponent, data: { title: 'Use Cases'} },
    { path: 'usecases/new', component: UsecaseDetailsComponent, data: { title: 'New Use Case'} },
    { path: 'usecases/import', component: UsecasesImportComponent, data: { title: 'Import Use Case'} },
    { path: 'usecases/:id', component: UsecaseDetailsComponent, data: { title: 'Use Case Details'} },

    //-- Devices
    { path: 'devicemodels', component: DeviceModelsComponent, data: { title: 'Device Models'} },
    { path: 'devicemodels/new', component: DeviceModelDetailsComponent, data: { title: 'New Device Model'} },
    { path: 'devicemodels/import', component: DevicesImportComponent, data: { title: 'Import Device Models'} },
    { path: 'devicemodels/edit/:id', component: DeviceModelDetailsComponent, data: { title: 'Edit Device Model'} },
    { path: 'devicemodels/:id', component: DeviceModelDetailsComponent, data: { title: 'Device Model Details'} },
    { path: 'devicetypes', component: DevicesTypesComponent, data: { title: 'Device Types'} },
    { path: 'devicetypes/new', component: DevicesTypeDetailsComponent, data: { title: 'New Device Type'} },
    { path: 'devicetypes/import', component: DevicesTypesImportComponent, data: {title: 'Import Device Type'} },
    { path: 'devicetypes/edit/:id', component: DevicesTypeDetailsComponent, data: { title: 'Edit Device Type'} },
    { path: 'devicetypes/:id', component: DevicesTypeDetailsComponent, data: { title: 'Device Type Details'} },
    
    //-- Objects
    { path: 'objects', component: ObjectsComponent, data: { title: 'Objects'} },
    { path: 'objects/new', component: ObjectsComponent, data: { title: 'New Objects'} },
    { path: 'objects/import', component: ObjectsImportComponent, data: { title: 'Import Objects'} },
    { path: 'objects/:id', component: ObjectsImportComponent, data: { title: 'Objects Details'} },
    
    //-- Users
    { path: 'users', component: UsersComponent, data: { title: 'Users'} },
    { path: 'users/new', component: UserDetailsComponent, data: { title: 'New Users'} },
    { path: 'users/import', component: UsersImportComponent, data: { title: 'Import User'} },
    { path: 'users/:id', component: UserDetailsComponent, data: { title: 'User Details'} },
    { path: 'users/edit/:id', component: UserDetailsComponent, data: { title: 'Edit User'} },
    
    { path: 'usergroups', component: UserGroupsComponent, data: { title: 'User Groups'} },
    { path: 'usergroups/new', component: UserGroupsNewComponent, data: { title: 'New User Group'} },
    { path: 'usergroups/import', component: UserGroupsComponent, data: { title: 'Import User Group'} },
    { path: 'usergroups/:id', component: UserGroupsComponent, data: { title: 'User Group Details'} },
    
    
    //-- Security Roles
    { path: 'securityroles', component: SecurityRolesComponent, data: { title: 'Security Roles'} },
    { path: 'securityroles/new', component: SecurityRolesComponent, data: { title: 'New Security Role'} },
    { path: 'securityroles/import', component: SecurityRolesImportComponent, data: { title: 'Import Security Role'} },
    { path: 'securityroles/:id', component: SecurityRolesComponent, data: { title: 'Security Role Details'} },
    
    //-- Taxonomy
    { path: 'taxonomy', component: ObjectsComponent, data: { title: 'Taxonomy'} },
    { path: 'taxonomy/newterm', component: DeviceModelDetailsComponent, data: { title: 'Taxonomy New Term'} },
    { path: 'taxonomy/import', component: DevicesImportComponent, data: { title: 'Taxonomy Import'} },
    { path: 'taxonomy/:id', component: DeviceModelDetailsComponent, data: { title: 'Taxonomy Details'} },
   
   // { path: 'lazy', loadChildren: './lazy.module#LazyModule'}
];


@NgModule({
    imports: [ RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}