import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent }  from '../app.component';
import { User } from '../data-models/user';
import { SecurityRoles } from '../data-models/security-role';
import { Countries, StatesOrProvincesPerCountry, UserPrefixes, UserSuffixes } from '../data-models/common';
import { UsersService } from '../core/users.service';

@Component({
    selector: 'users-new',
    templateUrl: './users-new.component.html',
    styleUrls: ['./users-new.component.css']
})

export class UsersNewComponent implements OnInit {
    
    @Input() user:User;
    jsonBody = {};
    
    //-- Reactive Form
    usersNewForm = new FormGroup({});

        //-- Lookups
    userPrefixes = UserPrefixes;
    userSuffixes = UserSuffixes;
    usersSecurityRoles = SecurityRoles;
    userStates = StatesOrProvincesPerCountry;
    userCountries = Countries;

    constructor(private app: AppComponent, private router: Router, private fb: FormBuilder, private http:HttpClient, private usersService:UsersService) {
        app.setPageContentFullWidth(false);
    }

    ngOnInit() {
        window.dispatchEvent(new CustomEvent('user-details-ready'));
        this.createForm();
    }
    
    /**
     * User Methods
     ****************/
    
    createForm() {
        
            //-- Reactive Form
            this.usersNewForm = this.fb.group({
                userPrefix:'',
                userSuffix:'',
                userFirst:'',
                userMiddle:'',
                userLast:'',
                userOrganization:'',
                userJobTitle:'',
                userEmail:'',
                userMainContact:'',
                userPhoneNumber:'',
                userMobile:'',
                userAddress1:'',
                userAddress2:'',
                userCity:'',
                userPostalCode:'',
                userState:'',
                userCountry:'',
                
                userSecurityRole:'',
                userGroup:'',
                userLinkedIn:''

            });
        }

    /*
     * POST USER
     ************************************/
    saveNewUser() {
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

        
        const newUser = this.usersNewForm.value;
        let userId = newUser.userEmail;
        if (userId) {
            let currentDate = new Date();
            console.log('Saving ' + userId);
            

            const body = {
                id: userId,
                name: newUser.userEmail,
                email: newUser.userEmail,
                first: newUser.userFirst,
                last: newUser.userLast,
                organization:newUser.userOrganization,
                job_title:newUser.userJobTitle,
                main_contact: newUser.userMainContact,
                phone_number: newUser.userPhoneNumber,
                mobile:newUser.userMobile,
                address: {
                    addressline1: newUser.userAddress1,
                    addressline2: newUser.userAddress2,
                    city: newUser.userCity,
                    state: {
                        code: '',
                        name: newUser.userState
                    },
                    country: {
                        code: '',
                        name: newUser.userCountries,
                    },
                    postal_code: newUser.userPostalCode,
                },
            
                group: newUser.userGroup,
                security_role: newUser.userSecurityRole,
                LinkedIn: newUser.userLinkedIn,
                time_created: currentDate,
                time_updated: currentDate,
                
                
            };
            
            const saveNewOrganizationEndpoint = 'https://api.iotworldlabs.io/iirp/?guid=d97a3ae7-8f2f-4789-9f61-62b5a2ef6ce5&a=add&ot=User';
            this.jsonBody = JSON.stringify(body);
            
            this.http
                .post(saveNewOrganizationEndpoint, this.jsonBody)
                .subscribe(data => {
                    if (data['nInserted'] && data['nInserted'] === 1) {
                        console.log('Successful User ID ' + userId);
                        this.router.navigate(['users']);
                    }
                    else {
                        console.log('Unable to save user ID ' + userId);
                    }
                })
        } else {
            alert('Cannot save an empty [User Name]');
        }
        
    }

    cancelNewUser() {
        this.router.navigate(['users']);
    }
}

