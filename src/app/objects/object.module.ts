import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';


//-- Objects
import { ObjectsComponent }        from './objects.component';
import { ObjectsImportComponent }  from './objects-import.component';

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
            
        ObjectsComponent,
        ObjectsImportComponent,
        
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers:[]
})
export class ObjectModule{}



    