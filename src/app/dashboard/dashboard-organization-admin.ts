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

export class DashboardOrganizationAdminPage  {

  
   
    chart: Chart;
    chartone:Chart;

    week(x){

        alert(x);

        let chart = new Chart({
            chart: {
              type: 'line'
            },
            title: {
              text: 'Week Wise Data'
            },
            credits: {
              enabled: false
            },
            
            series: [{
              name: 'amex',
              
            }]
          });
          let chartone = new Chart({
            chart: {
              type: 'column'
            },
            title: {
              text: 'Week Wise Net Cash Sales'
            },
            credits: {
              enabled: false
            },
            series: [{
              name: 'amex',
              
            }]
          });
          
          
          this.chart = chart;
          this.chartone = chartone;
          this.chartService.certainweek(x)
           .subscribe(dataa => {
                 for (let i = 0; i < 53; i++) {
                    let amexdata =  dataa[i]['amex'];
                    let netcashsales =  dataa[i]['netcashsales'];
                    
                    this.chart.addPoint(amexdata);
                    this.chartone.addPoint(netcashsales);
                    
                   } 
                })
    }
  init() {
/*
      let chart = new Chart({
        chart: {
          type: 'line'
        },
        title: {
          text: 'AMEX Data'
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'amex',
          color: "#ff0000",
          
        }]
      });*/


      let chart = new Chart({
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
            series:{events: {
              click: function(event) {
                
                  this.update({ color: '#fe5800' }, true, false);
                  }
          }}
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


      let chartone = new Chart({
        chart: {
          type: 'column'
        },
        title: {
          text: ' Net Cash Sales'
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'amex',
          color: "#ff0000",
          
        }]
      });
      
      
      this.chart = chart;
      this.chartone = chartone;
      
      this.chartService.dailyForecast()
       .subscribe(dataa => {
             for (let i = 0; i < 53; i++) {
                let amexdata =  dataa[i]['amex'];
                let netcashsales =  dataa[i]['netcashsales'];
                
                this.chart.addPoint(amexdata);
                this.chartone.addPoint(netcashsales);
               } 
            })
     
    }

    createRange(number){
        var items: number[] = [];
        for(var i = 1; i <= number; i++){
           items.push(i);
        }
        return items;
      }

      isValid:0;
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


        
        this.init();
        
       
        //this.getDashboardList();
    this.getDashboardDevicesbyRegion();
        this.getDummyDashboardDevicesbyRegion();

        this.getNumberOfTenants();
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



}












