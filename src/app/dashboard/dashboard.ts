import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { AuthService} from '../core/auth.service';
import { User } from '../data-models/user';

@Component({
    selector: 'dashboard-v1',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css'],
    encapsulation: ViewEncapsulation.None
})

export class DashboardPage implements OnInit {
    currentUser:User;

    constructor(public  app: AppComponent, private authService:AuthService, private router: Router)
    {
        
       app.setPageFooter(false);
       app.setPageDashboard(true);
        
    }

    ngOnInit() {
        window.dispatchEvent(new CustomEvent('dashboard-ready'));

        if (this.authService.isAuthenticated())
        {
            this.authService.currentUser
                .subscribe(user => {
                this.currentUser = user;
                if (this.currentUser.security_role == 'Super Admin'){

                    this.router.navigate(['dashboard/organization-admin']);
                }
                else if (this.currentUser.security_role == 'Tenant Admin')
                {
                    this.router.navigate(['dashboard/tenant-admin']);
                }
                else{
                    //show login in the page
                }
        
            });
        }
        else
        {
            //just show the screen
        }

    }
}