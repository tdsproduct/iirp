import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';

import { UsecasesComponent }        from './usecases.component';
import { UsecasesNewComponent }     from './usecases-new.component';
import { UsecasesImportComponent }  from './usecases-import.component';
import { UsecaseDetailsComponent }  from './usecase-details.component';


@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [

        UsecasesComponent,
        UsecasesNewComponent,
        UsecaseDetailsComponent,
        UsecasesImportComponent,

    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers:[]
})
export class UsecaseModule{}
