import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';


import { DeviceModelsComponent }             from './device-models.component';
import { DevicesImportComponent }       from './devices-import.component';
import { DeviceModelDetailsComponent }   from './device-model-details.component';
import { DevicesTypesComponent }        from './device-types.component';
import { DevicesTypesImportComponent }  from './device-types-import.component';
import { DevicesTypeDetailsComponent }  from './device-type-details.component';


@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [

        DeviceModelsComponent,
        DevicesImportComponent,
        DeviceModelDetailsComponent,
        DevicesTypesComponent,
        DevicesTypesImportComponent,
        DevicesTypeDetailsComponent,

    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers:[]
})
export class DeviceModule{}



    