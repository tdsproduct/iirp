import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent }  from '../app.component';
import { SharedModule } from '../shared/shared.module';
import { Dashboard } from '../data-models/dashboard';
import { DashboardService } from '../core/dashboard.service';
import { TenantsService } from '../core/tenants.service';
import { UsecasesService } from '../core/usecases.service';
import { DevicesService } from '../core/devices.service';
import { AuthService }  from '../core/auth.service';
import { Chart } from 'angular-highcharts';
import { User } from '../data-models/user';


@Component({
    selector: 'dashboard-tenant-admin',
    templateUrl: './dashboard-tenant-admin.html',
    styleUrls: ['./dashboard-tenant-admin.css'],
    encapsulation: ViewEncapsulation.None
})

export class DashboardTenantAdminPage implements OnInit {

    listOfDashboards: Dashboard[];
    dashboards: Dashboard[];
    options:Object;
    chartData:Dashboard[];
    errorMessage:string;
    numberOfTenants:number;
    numberOfUseCases:number;
    numberOfDeviceTypes:number;
    numberOfDevices:number;
    numberOfDeviceModels: number;

    currentUser: User;

    chart = new Chart({
        chart:{
            type:'line'
        },
        title:{ text:'IIRP Platform Devices by Region, 2017'},
        /* source for internal only, if we decide to allow user to download, the uri should be visible! */
        //subtitle:{text:'Source: d4dt.io/dashboards/devices-by-region'},
        yAxis:
        {
            title:{
                text:"Number of Smart Machines & Devices"
            }
        },
        legend:{
            layout:"vertical",
            align:"right",
            verticalAlign:"middle"
        },
        plotOptions:{
            series:{"pointStart":Date.UTC(2017, 0, 1),
            pointIntervalUnit:"month"}
        },
        xAxis:{
            type:"datetime"
        },
        
        series:[
            {
                name:"vgr",
                data:[ 12,23,34,45]
            },
            {
                name:"US",
                data:[24916,25064,40742,55851,66490,80282,98121,100434]
            },
            {
                name:"Japan",
                data:[11744,19722,25005,30771,43185,58377,66147,75387]
            },
            {
                name:"Europe",
                data:[null,null,7988,12169,15112,22452,34400,34227]
            },
            {
                name:"Other",
                data:[12908,5948,8105,11248,8989,11816,18274,18111]
            }]
    })


    //-- Inject HttpClient into your component or service
    constructor(private app:AppComponent, private router: Router, 
        private dashboardService: DashboardService,
        private tenantsService: TenantsService,
        private useCasesService: UsecasesService,
        private devicesService: DevicesService,
        private authService:AuthService
    ) {
        app.setPageFooter(true);
        app.setPageTenantAdminSidebar(true);
        this.currentUser = new User();

    }
    
    ngOnInit(): void {

        window.dispatchEvent(new CustomEvent('dashboard-tenant-admin-ready'));

        if (!this.authService.isAuthenticated()) this.router.navigate(['dashboard']);
        
        this.authService.currentUser.subscribe(user => {
                this.currentUser = user;
                }
            );
    
        //this.getDashboardList();
        //this.getDashboardDevicesbyRegion();
        this.getDummyDashboardDevicesbyRegion();

        //this.getNumberOfTenants();
        this.getNumberOfDeviceTypes()
        this.getNumberOfUseCases();
        this.getNumberOfDeviceModels();
        this.getNumberOfDevices();
    }
    
    
    getDashboardList() {
        this.dashboardService.getDashboards()
            .subscribe(data => {
                    this.listOfDashboards = data['results'];
                    this.dashboards = this.listOfDashboards;
                },
                error => this.errorMessage = <any>error);
        
    }
    
    getDashboardDevicesbyRegion(){
        this.dashboardService.getDashboardDevicesbyRegion()
        .subscribe(data=>{
            this.chartData = data['results'];
            this.options = this.chartData[0].highcharts;
        },
        error => this.errorMessage = <any>Error);
    }
    
    getDummyDashboardDevicesbyRegion(){
        
    }
   
    getNumberOfTenants(){
        this.tenantsService.getCountWithParams("")
        .subscribe(data => {
                let tenantCounts = data['count'];
                this.numberOfTenants = tenantCounts;
            },
            error => this.errorMessage = <any>error);
    }
    getNumberOfUseCases(){
        this.useCasesService.getCountWithParams("")
        .subscribe(data => {
                let useCaseCount = data['count'];
                this.numberOfUseCases = useCaseCount;
            },
            error => this.errorMessage = <any>error);
    }

    getNumberOfDeviceTypes(){
        this.devicesService.getDeviceTypeCountWithParams("")
        .subscribe(data => {
                let deviceTypeCount = data['count'];
                this.numberOfDeviceTypes = deviceTypeCount;
            },
            error => this.errorMessage = <any>error);
    }


    getNumberOfDeviceModels(){
        this.devicesService.getDeviceModelCountWithParams("")
        .subscribe(data => {
                let deviceModelCount = data['count'];
                this.numberOfDeviceModels = deviceModelCount;
            },
            error => this.errorMessage = <any>error);
    }

    getNumberOfDevices(){
        this.devicesService.getDeviceCountWithParams("")
        .subscribe(data => {
                let deviceCount = data['count'];
                this.numberOfDevices = deviceCount;
                
            },
            error => this.errorMessage = <any>error);
    }
}