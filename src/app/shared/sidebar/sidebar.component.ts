import {  Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { DOCUMENT } from '@angular/common'
import { NgForm, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../data-models/user';
import { UsersService } from '../../core/users.service';
import { AuthService } from '../../core/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements AfterViewInit {
    @Input() page_sidebar_transparent : boolean;

    private currentUserSecurityRole = '';
    
    currentUser: User;
    currentProfile:any;
    errorMessage: string;
    sideBarUserForm = new FormGroup({});

    path: string;

    // fire event sidebar-ready
    ngAfterViewInit() {
        
        window.dispatchEvent(new CustomEvent('sidebar-ready'));
    }

     //-- Inject HttpClient into your component or service
     constructor( private app: AppComponent,
        private route: ActivatedRoute,
        private http:HttpClient,
        private authService: AuthService
    ) {

       
    }
    
    ngOnInit(){     
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
            
            this.setMenu();
            }
        );

        this.authService.currentProfile.subscribe(profile =>{
            this.currentProfile = profile;
        })

    }

    createForm()
    {
       
    }
    setFormValues()
    {

        
    }
    
    setMenu()
    {
        if (this.authService.isAuthenticated())
        {
            if (this.currentUser.security_role == 'Super Admin')
                    this.setIIRPAdminMenu();
            else if (this.currentUser.security_role == 'Tenant Admin')
                this.setTenantAdminMenu();
        }
        else 
                this.setDashboardMenu();
    }

  

    setDashboardMenu()
    {
         // menu list
    this.menu = [
        {
            title: 'Dashboard',
            icon: 'fa fa-home',
            link: '/dashboard/tenant-admin',
            caret: false,
        }];
    }

    setTenantAdminMenu()
    {
         // menu list
    this.menu = [
        {
            title: 'Dashboard',
            icon: 'fa fa-home',
            link: '/dashboard/tenant-admin',
            caret: false,
        },
        {
            title: 'Tenants',
            icon: 'fa fa-building-o',
            link: '/tenants',
            //-- badge: '10',
            caret: false,
        }, 
        {
            title: 'Use Cases',
            icon: 'fa fa-th-large',
            link: '/usecases',
            caret: false,
           
        }, 
        {
            title: 'Device Models',
            icon: 'fa fa-microchip',
            link: '/devicemodels',
            caret: false,
           
        },
        {
            title: 'User Groups',
            icon: 'fa fa-users',
            link: '/usergroups',
            caret: false,
        },
        {
            title: 'Users',
            icon: 'fa fa-users',
            link: '/users',
            caret: false,
        }
    ];
    }

    setIIRPAdminMenu()
    {
         // menu list
        this.menu = [
        {
            title: 'Dashboard',
            icon: 'fa fa-home',
            link: '/dashboard/organization-admin',
            caret: false,
            submenu:
            [
                {
                    title: 'Tenant Admin Dashboard',
                    link: '/dashboard/tenant-admin'
                },
                
            ]
        },
        {
            title: 'Organizations',
            icon: 'fa fa-building-o',
            link: '/organizations',
            //-- badge: '10',
            caret: false,
            
        }
        ,
        {
            title: 'Tenants',
            icon: 'fa fa-building-o',
            link: '/tenants',
            //-- badge: '10',
            caret: false,
        }, 
        {
            title: 'Use Cases',
            icon: 'fa fa-th-large',
            link: '/usecases',
            caret: false,
           
        }, 
        {
            title: 'Device Types',
            icon: 'fa fa-microchip',
            link: '/devicetypes',
            caret: false,
        },
        
        {
            title: 'Device Models',
            icon: 'fa fa-microchip',
            link: '/devicemodels',
            caret: false,
           
        },
        {
            title: 'User Groups',
            icon: 'fa fa-users',
            link: '/usergroups',
            caret: false,
        },
        {
            title: 'Users',
            icon: 'fa fa-users',
            link: '/users',
            caret: false,
        },
        
        {
            title: 'Security Roles',
            icon: 'fa fa-lock',
            link: '/securityroles',
            caret: false,
            
        },
        {
            title: 'Objects',
            icon: 'fa fa-cubes',
            link: '/objects',
            caret: false,
            
        }

    ];
    }

    // menu list
    menu = [
        {
            title: 'Dashboard',
            icon: 'fa fa-home',
            link: '/dashboard/organization-admin',
            caret: false,
            submenu:
            [
                {
                    title: 'Tenant Admin Dashboard',
                    link: '/dashboard/tenant-admin'
                },
                {
                    title: 'Wyndes Dashboard',
                    link: '/dashboard/wyndes-dashboard'
                },
                {
                    title: 'Wyndes PowerBI',
                    link: '/dashboard/wyndes-powerbi'
                },
            ]
        },
        {
            title: 'Organizations',
            icon: 'fa fa-building-o',
            link: '/organizations',
            //-- badge: '10',
            caret: false,
            
        }
        ,
        {
            title: 'Tenants',
            icon: 'fa fa-building-o',
            link: '/tenants',
            //-- badge: '10',
            caret: false,
        }, 
        {
            title: 'Use Cases',
            icon: 'fa fa-th-large',
            link: '/usecases',
            caret: false,
           
        }, 
        {
            title: 'Device Types',
            icon: 'fa fa-microchip',
            link: '/devicetypes',
            caret: false,
        },
        
        {
            title: 'Device Models',
            icon: 'fa fa-microchip',
            link: '/devicemodels',
            caret: false,
           
        },
        {
            title: 'User Groups',
            icon: 'fa fa-users',
            link: '/usergroups',
            caret: false,
        },
        {
            title: 'Users',
            icon: 'fa fa-users',
            link: '/users',
            caret: false,
        },
        
        {
            title: 'Security Roles',
            icon: 'fa fa-lock',
            link: '/securityroles',
            caret: false,
            
        },
        {
            title: 'Objects',
            icon: 'fa fa-cubes',
            link: '/objects',
            caret: false,
            
        }

    ];
  
}