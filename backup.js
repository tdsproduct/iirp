import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponent }  from '../app.component';
import { Router } from '@angular/router';
import { Dashboard } from '../data-models/dashboard';
import { DashboardService } from '../core/dashboard.service';
import { TenantsService } from '../core/tenants.service';
import { UsecasesService } from '../core/usecases.service';
import { DevicesService } from '../core/devices.service';
import { Chart } from 'angular-highcharts';
import { AuthService } from '../core/auth.service';
import { User } from '../data-models/user';
import { ChartsService } from '../core/charts.service';


@Component({
    selector: 'dashboard-organization-admin',
    templateUrl: './dashboard-organization-admin.html',
    styleUrls: ['./dashboard-organization-admin.css'],
    encapsulation: ViewEncapsulation.None
})

export class DashboardOrganizationAdminPage implements OnInit {


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
amexdata:any[];
    //chart = [];
    
    

    currentUser:User;



    charttwo = new Chart({
        chart:{
            type:'bar'
        },
        title:{ text:'vgr test data, 2017'},
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
                name:"India",
                data:[43934,52503,57177,69658,97031,119931,137133,154175,null]
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
        private authService: AuthService,
        private chartService: ChartsService,
    ) {
       
        app.setPageFooter(true);
        app.setPageIIRPAdmin(true);
    }
    
    
    ngOnInit(): void {
        window.dispatchEvent(new CustomEvent('dashboard-organization-admin-ready'));


        if (!this.authService.isAuthenticated()) this.router.navigate(['dashboard']);
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
            }
        );
       
        //this.getDashboardList();
    this.getDashboardDevicesbyRegion();
        this.getDummyDashboardDevicesbyRegion();

        this.getNumberOfTenants();
        this.getNumberOfUseCases();
        this.getNumberOfDeviceModels();
        this.getNumberOfDevices();
        this.getChartData();
        
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
            //console.log(JSON.stringify(this.options));
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

                //console.log(this.numberOfTenants);
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

    getChartData(){
       //let amexdata=[];
    this.chartService.dailyForecast()


    .subscribe(dataa => {
        let values  = [];
         for (let i = 0; i < 53; i++) {
            let amexdata =  dataa[i]['amex'];
            values.push(amexdata);
            //console.log(dataa[i]['amex']);
              //values.push(dataa[i]['amex']);
              
            }  
            console.log(values);
            let chartone = new Chart({
                chart:{
                    type:'line'
                },
                title:{ text:'chary'},
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
                        name:"India",
                        data:[43934,52503,57177,69658,97031,119931,137133,154175,null]
                    },
                    {
                        name:"US",
                        data:values
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

        })
   /* .subscribe(ress => {
      let am=[];
      for(let i=0;i<=52;i++){
      let amexdata =  ress[i]['amex'];
      am.push(amexdata);
     amexdata = am;
      //let alldates = ress[''].map(ress => ress[amex]);
      console.log(amexdata);
      
    }
   // console.log(amexdata);
      

    })*/
}


}












