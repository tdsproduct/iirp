import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';

//-- Data Models
import { DeviceModel } from '../data-models/device';
import { User }        from '../data-models/user';
import { Usecase }      from '../data-models/usecase';
import { Tenant }       from '../data-models/tenant';

//-- Services
import { DevicesService } from '../core/devices.service';
import { AuthService } from '../core/auth.service';

@Component ({
    selector: 'devices-models',
    templateUrl: './device-models.component.html',
    styleUrls: ['./device-models.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class DeviceModelsComponent implements OnInit {
    @Input()
    currentUser:User = new User();
    currentTenant:Tenant;

    listOfDeviceModels: DeviceModel[];
    errorMessage: string;
    
    //-- Inject HttpClient into your component or service
    constructor(private router: Router, private devicesService: DevicesService, private authService:AuthService) {}

    ngOnInit() {
        window.dispatchEvent(new CustomEvent('table-manage-combine-ready'));


        if (!this.authService.isAuthenticated()) this.router.navigate(['dashboard']);
        
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
            let filters:string = '';
            if (this.currentUser.security_role == 'Super Admin') 
                this.getDeviceModels(filters);

        });

        this.authService.currentUsersTenant.subscribe (tenant => {
            // we only get here if the user is not a 'Super Admin'
            if (this.currentUser.security_role != 'Super Admin')
            {
                let filters: string = '&name=tenant_id&value=' + tenant.id;
                this.getDeviceModels(filters);    
            }
        });
    }

   
    getDeviceModels(params:string) {
        this.devicesService.getDeviceModels(params)
            .subscribe(data => {
                    let listOfDeviceModels = data['results'];
                    this.listOfDeviceModels = listOfDeviceModels
                },
                error => this.errorMessage = <any>error);
        
    }
    loadDeviceModelDetailsPage(param:string)
    {
        this.router.navigate(['devicemodels/' + param]);
    }
    
    loadDeviceNewPage() {
        this.router.navigate(['devicemodels/new']);
    }

    loadDeviceImportPage() {
        this.router.navigate(['devicemodels/import']);
    }

}