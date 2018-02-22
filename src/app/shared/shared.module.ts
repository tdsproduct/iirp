import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import {  RouterModule }    from '@angular/router';


import { HeaderComponent }          from './header/header.component';
import { SidebarComponent }         from './sidebar/sidebar.component';
import { MegaMenuComponent }        from './header/mega-menu/mega-menu.component';
import { FooterComponent }          from './footer/footer.component';

import { ImportComponent }          from './import/import.component';

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule, 
        RouterModule, 
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        MegaMenuComponent,
        FooterComponent,
        ImportComponent,
    ],
    exports:[
        HeaderComponent,
        SidebarComponent,
        MegaMenuComponent,
        FooterComponent,
        ImportComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers:[]
})
export class SharedModule{}
