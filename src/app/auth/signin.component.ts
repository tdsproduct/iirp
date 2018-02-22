import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../core/auth.service';
import { User } from '../data-models/user';

@Component({
    selector: 'login',
    templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit {
    
    displayEmailNotFound: any;
    displayIncorrectPassword = false;
    
    signinForm = new FormGroup({});

    currentUser: User;
    currentProfile: any;
    
    submitForm(form: any):boolean {
        this.router.navigate(['dashboard']);
        return false;
    }
    constructor(private fb: FormBuilder,
                private router: Router,
                private authService: AuthService) {
       
             
        
    }
    
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('login-ready'));
    
    }
    
    /**
     * User-defined Methods
     ****************************/
    
    signMeIn() {
        const form = this.signinForm.value;
        const loginInfo = {
            email: form.emailAddress,
            password: form.password
        };
        if (loginInfo.email !== '' && loginInfo.password !== '') {
            this.authService.login();
            }
        }
    }