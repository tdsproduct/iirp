import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import { DropzoneComponent , DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { DropzoneModule } from 'ngx-dropzone-wrapper';


//-- Tenants
import { TenantsComponent }         from './tenants.component';
import { TenantsImportComponent }   from './tenants-import.component';
import { TenantDetailsComponent }   from './tenant-details.component';

import { OrganizationsComponent }       from './organizations.component';
import { OrganizationsImportComponent } from './organizations-import.component';
import { OrganizationDetailsComponent } from './organization-details.component';

const DROPZONE_CONFIG: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    url: 'https://httpbin.org/post',
    maxFilesize: 50,
    acceptedFiles: 'image/*'
  };

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DropzoneModule.forRoot(DROPZONE_CONFIG)
        
    ],
    declarations: [

        TenantsComponent,
        TenantsImportComponent,
        TenantDetailsComponent,

        OrganizationsComponent,
        OrganizationsImportComponent,
        OrganizationDetailsComponent,

    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers:[]
})
export class TenantModule{}
