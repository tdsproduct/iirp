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
    selector: 'dashboard-powerbi',
    templateUrl: './dashboard-wyndes-powerbi.html',
    styleUrls: ['./dashboard-organization-admin.css'],
    encapsulation: ViewEncapsulation.None
})

export class WyndesPowerBi  {
}