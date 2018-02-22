import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

import { NgForm, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../data-models/user';
import { AppComponent } from '../../app.component';

import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
    @Input() page_with_two_sidebar : boolean;
    @Input() page_with_mega_menu : boolean;
    
    company_logo_path: string; 
    currentUser: User;
    currentProfile: any;
    userHeaderForm = new FormGroup({});

    constructor( 
        private router: Router,
        private authService:AuthService
    ) 
    {
        this.currentProfile = {
            email: '', picture: 'javascript:;'
        }

    }

   

    ngOnInit() {

        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
            
        });
        
        this.authService.currentProfile.subscribe(profile =>{
            this.currentProfile = profile;
        })
        
        this.company_logo_path = '/assets/img/d4dt-logo.png';
    }

   
    loadUserDetailsPage(params:string)
    {
        this.router.navigate(['users/'+params])
    }
}