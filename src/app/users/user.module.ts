import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';

import { UsersComponent }           from './users.component';
import { UsersNewComponent }        from './users-new.component';
import { UsersImportComponent }     from './users-import.component';
import { UserDetailsComponent }     from './user-details.component';

import { UserGroupsComponent }      from './user-groups.component';
import { UserGroupsNewComponent }   from './user-groups-new.component';


@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        UsersComponent,
        UsersNewComponent,
        UsersImportComponent,
        UserDetailsComponent,
        
        UserGroupsComponent,
        UserGroupsNewComponent,

    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers:[]
})
export class UserModule{}
