import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//-- Data Models
import { DeviceType, ListOfDevicesTypes } from '../data-models/device';
import { Tenant } from '../data-models/tenant';
import { User } from '../data-models/user';

//-- Services
import { AuthService } from '../core/auth.service';
import { DevicesService } from '../core/devices.service';

@Component ({
    selector: 'devicestypes-list',
    templateUrl: './device-types.component.html',
    styleUrls: ['./device-types.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class DevicesTypesComponent implements OnInit {

    currentUser:User = new User();
    currentTenant:Tenant;

    listOfDevicesTypes: DeviceType[];
    errorMessage: string;
    
    // -- Inject HttpClient into your component or service
    constructor(private router: Router, private http: HttpClient, private authService:AuthService, private devicesService:DevicesService) {}
    
    
    ngOnInit(): void {
        window.dispatchEvent(new CustomEvent('table-manage-combine-ready'));



        if (!this.authService.isAuthenticated()) this.router.navigate(['dashboard']);
        
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
            let filters:string = '';
            if (this.currentUser.security_role == 'Super Admin') 
                this.getDeviceTypes(filters);

        });

        this.authService.currentUsersTenant.subscribe (tenant => {
            // we only get here if the user is not a 'Super Admin'
            if (this.currentUser.security_role != 'Super Admin')
            {
                let filters: string = '&name=tenant_id&value=' + tenant.id;
                this.getDeviceTypes(filters);    
            }
        });
    }
    
    

    getDeviceTypes(params:string) {
        this.devicesService.getDeviceTypes(params)
            .subscribe(data => {
                    this.listOfDevicesTypes = data['results'];
                    console.log('%j', this.listOfDevicesTypes);
                },
                error => this.errorMessage = <any>error);
        
    }
    /**
     * User-defined Methods
     ****************************/
    
    loadDeviceTypeDetailsPage(param:string)
    {
        this.router.navigate(['devicetypes/' + param]);
    }
    
    loadDeviceTypeNewPage() {
        this.router.navigate(['devicetypes/new']);
    }
    
    loadDeviceTypeImportPage() {
        this.router.navigate(['devicetypes/import']);
    }
    
}
