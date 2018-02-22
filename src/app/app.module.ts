import { NgModule, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Title }                     from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute }    from '@angular/router';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import { HttpClientModule,  HTTP_INTERCEPTORS }                         from '@angular/common/http';
import { HttpModule }                               from '@angular/http';



// Main Component
import { AppRoutingModule }         from './app-routing.module';
import { AppComponent }             from './app.component';
import { SidebarTwoComponent }      from './sidebar-two/sidebar-two.component';
import { ContentComponent }         from './content/content.component';
import { TopMenuComponent }         from './top-menu/top-menu.component';
import { ThemePanelComponent }      from './theme-panel/theme-panel.component';

//import { IIRPHttpInterceptor }      from './core/iirp-interceptor.service';


import { CallbackComponent } from './callback/callback.component';

// Shared Component
import { SharedModule }         from './shared/shared.module';
import { AuthModule }           from './auth/auth.module';

import { DashboardModule }      from './dashboard/dashboard.module';

import { TenantModule }         from './tenants/tenant.module';
import { UsecaseModule }        from './usecases/usecase.module';
import { DeviceModule }         from './devices/device.module';
import { ObjectModule }         from './objects/object.module';
import { UserModule }           from './users/user.module';
import { SecurityRoleModule }   from './securityroles/securityrole.module';
import { CoreModule }        from './core/core.module';
import { AuthService }      from './core/auth.service';

import { ChartsService } from './core/charts.service';



@NgModule({
    imports:        [ 
        BrowserModule, 
        AppRoutingModule, 
        FormsModule, 
        ReactiveFormsModule, 
        HttpClientModule, 
        HttpModule,

        SharedModule,
        AuthModule,
        CoreModule,

        DashboardModule,
        TenantModule,
        UsecaseModule,
        UserModule,
        DeviceModule,
        ObjectModule,
        SecurityRoleModule
    ],
    declarations:   [ 
        AppComponent,

        SidebarTwoComponent,
        ContentComponent,
        ThemePanelComponent,
        TopMenuComponent,
        
        CallbackComponent,

     ],
    
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [ 
        AppComponent,
        AuthService,
        ChartsService,

    //    {provide: HTTP_INTERCEPTORS, useClass: IIRPHttpInterceptor, multi: true}
        
     ],
     
    bootstrap: [ AppComponent ]
})

export class AppModule {
    
    constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
        
    }
    
    ngOnInit()
    {
        this.router.events.subscribe((e) => {
            // change page title when url change
            if (e instanceof NavigationEnd) {
                var title = 'D4DT';
                this.titleService.setTitle(title);                
                window.dispatchEvent(new CustomEvent('page-reload'));
            }
        });
    }
}