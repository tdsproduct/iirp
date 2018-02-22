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
declare var jquery:any;
declare var $ :any;


@Component({
    selector: 'dashboard-organization-admin',
    templateUrl: './dashboard-wyndes-dashboard.html',
    styleUrls: ['./dashboard-organization-admin.css'],
    encapsulation: ViewEncapsulation.None
})

export class WyndesDashboardPage  {

    toggleTitle(){
        $('.title').slideToggle(); 
        $(".calenderb").slideToggle("slow");
      }
   
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
          
          
        },
        
    
    
    ]
      });





      


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
          
          
        }
    ]
      });
      var coupons = [];
      
      this.chart = chart;
      this.chartone = chartone;
      
      this.chartService.dailyForecast()
       .subscribe(dataa => {
             for (let i = 0; i < 53; i++) {
                let amexdata =  dataa[i]['amex'];
                let netcashsales =  dataa[i]['netcashsales'];
                
                this.chart.addPoint(amexdata);
               coupons.push(netcashsales);
                this.chartone.addPoint(netcashsales);
               console.log(coupons);
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












