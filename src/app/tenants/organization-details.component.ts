import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Organization } from '../data-models/tenant';
import { Countries, StatesOrProvincesPerCountry, CommonLookups } from '../data-models/common';
import { OrganizationsService } from '../core/organizations.service';

@Component({
    selector: 'organization-details',
    templateUrl: './organization-details.component.html',
    styleUrls: ['./organization-details.component.css']
})

export class OrganizationDetailsComponent implements OnInit {
    organization: any;
    
    private organizationGetEndpoint = 'https://api.iotworldlabs.io/iirp/?guid=d97a3ae7-8f2f-4789-9f61-62b5a2ef6ce5&a=find&ot=Organization&name=id&value=';
    id: string;
    private sub: any;
    jsonBody: any;
    
    errorMessage: string;
    path: any;
    paramKey: any;
    currentDate = new Date();


    isReadOnly: boolean;

    organizationDetailsForm = new FormGroup({});
    organizationBrandingForm = new FormGroup({});

    //-- Lookups
    commonLookups = CommonLookups;
    countries = Countries;
    statesOrProvincesPerCountry = StatesOrProvincesPerCountry;

    listOfIndustries = this.commonLookups.results.industries;


    //-- Inject HttpClient into your component or service
    constructor(
            private app: AppComponent, 
            private router: Router, 
            private route: ActivatedRoute, 
            private fb: FormBuilder,
            private organizationsService: OrganizationsService) 
            {
        app.setPageContentFullWidth(false);
    }

    ngOnInit() {
        this.paramKey = this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log('id = ' + this.id);
        });
    
        this.path = this.route.snapshot.url[1]? this.route.snapshot.url[1].toString() : this.id;
        
        console.log('this.path is = ' + this.path);
        this.jsonBody = JSON.stringify({id: this.id});
        const params = '&name=id&value=' + this.id;
        
        //-- Make the HTTP request via User.Service and Organizations.Service
        if (this.id)
            this.getOrganizationById(params);
        this.createFormDefault();
    }


    createFormDefault() {
        
            this.organizationDetailsForm = this.fb.group({
                organizationName:       new FormControl(),
                organizationDomainName: new FormControl(),
                organizationIndustry:   new FormControl(),
                organizationUseCases: new FormControl(),
                organizationMainContact:new FormControl(),
                organizationAddress1:   new FormControl(),
                organizationAddress2:   new FormControl(),
                organizationCity:   new FormControl(),
                organizationState:  new FormControl(),
                organizationCountry:    new FormControl(),
                organizationPostalCode: new FormControl(),
            
            });

            this.organizationBrandingForm = this.fb.group({
                brandingLogo:   new FormControl()
            });
            
        }

    
        disableControlsForReadOnly() {
            
            
            this.isReadOnly = true;
            this.organizationDetailsForm.controls['organizationName'].disable();
            this.organizationDetailsForm.controls['organizationDomainName'].disable();
            this.organizationDetailsForm.controls['organizationIndustry'].disable();
            this.organizationDetailsForm.controls['organizationUseCases'].enable();
            this.organizationDetailsForm.controls['organizationMainContact'].disable();
            this.organizationDetailsForm.controls['organizationAddress1'].disable();
            this.organizationDetailsForm.controls['organizationAddress2'].disable();
            this.organizationDetailsForm.controls['organizationCity'].disable();
            this.organizationDetailsForm.controls['organizationState'].disable();
            this.organizationDetailsForm.controls['organizationCountry'].disable();
            this.organizationDetailsForm.controls['organizationPostalCode'].disable();

            this.organizationBrandingForm.controls['brandingLogo'].disable();          
        }

        enableFormControlsForEdit() {
            
                
                this.isReadOnly = false;
                this.organizationDetailsForm.controls['organizationName'].enable();
                this.organizationDetailsForm.controls['organizationDomainName'].enable();
                this.organizationDetailsForm.controls['organizationIndustry'].enable();    
                this.organizationDetailsForm.controls['organizationUseCases'].enable();
                this.organizationDetailsForm.controls['organizationMainContact'].enable();
                this.organizationDetailsForm.controls['organizationAddress1'].enable();
                this.organizationDetailsForm.controls['organizationAddress2'].enable();
                this.organizationDetailsForm.controls['organizationCity'].enable();
                this.organizationDetailsForm.controls['organizationState'].enable();
                this.organizationDetailsForm.controls['organizationCountry'].enable();
                this.organizationDetailsForm.controls['organizationPostalCode'].enable();

                this.organizationBrandingForm.controls['brandingLogo'].enable();            
                
            }

getOrganizationById(params: string) {
                
                this.organizationsService.getOrganizationById(params)
                    .subscribe(data => {
                        let results = data['results']
                        let organizationDocFromDB = results[results.length-1];
                        console.log('Result of GET Organization Details from Organization.Service %j', organizationDocFromDB);

                
                        
                        //-- Validate the `organizationDocFromDB` JSON form and fix any missing attributes
                        this.organization = this.organizationsService.validateOrganizationSchema(organizationDocFromDB);
                        
                        console.log('Result of ValidateUserSchema from Organization.Service %j', this.organization);
                        
                        console.log('Setting values...');
                        this.organizationDetailsForm.setValue({
                            organizationName:   this.organization.name,
                            organizationDomainName: this.organization.domain_name,
                            organizationIndustry: this.organization.industry,
                            organizationUseCases: this.organization.use_cases,
                            organizationMainContact:    this.organization.main_contact,
                            organizationAddress1:       this.organization.address.address1,
                            organizationAddress2:       this.organization.address.address2,
                            organizationCity:           this.organization.address.city,
                            organizationPostalCode:     this.organization.address.postal_code,
                            organizationState:          this.organization.address.state.name,
                            organizationCountry:        this.organization.address.country.name,
                           
                        });

                        this.organizationBrandingForm.setValue({
                            brandingLogo: this.organization.branding_logo.path.brandingLogoPath
                        });
                        
                        this.path === 'edit'? this.enableFormControlsForEdit() : this.disableControlsForReadOnly();
                        
                    })
            }
    loadEditOrganization() {
        this.router.navigate(['organizations/edit/'+ this.organization.id])
    }

    cancelEditOrganization() {
        this.router.navigate(['organizations/' + this.organization.id]);
    }

    saveEditOrganization() {
        const updatedOrganization = this.organizationDetailsForm.value;
        
        let organizationId =  updatedOrganization.organizationName.replace(/ /g, '');
        let currentDate = new Date();
        let createDate = new Date();
        
        //This is for update organization
        if (this.organization) 
        {   
            organizationId = this.organization.id;
            createDate = this.organization.time_created;
        }

        if (organizationId) {
            console.log('Updating ' + organizationId);
            const body = {
                id:                 organizationId,
                name:               updatedOrganization.organizationName,
                domain_name:        updatedOrganization.organizationDomainName,
                industry:           updatedOrganization.organizationIndustry,
                use_cases:          updatedOrganization.organizationUseCases,
                main_contact:       updatedOrganization.organizationMainContact,
                address: {
                    address1:       updatedOrganization.organizationAddress1,
                    address2:       updatedOrganization.organizationAddress2,
                    city:           updatedOrganization.organizationCity,
                    state: {
                        code:       '',
                        name:       updatedOrganization.organizationState
                    },
                    country: {
                        code:       '',
                        name:       updatedOrganization.organizationCountry
                    },
                    postal_code:    updatedOrganization.organizationPostalCode
                },
                branding_logo: {
                    id:'',
                    path:{
                        brandingLogoPath: updatedOrganization.organizationBrandingLogo
                    }
                },
                time_created: createDate,
                time_updated: this.currentDate                           
            };
        

            let saveDoc = {
                organizationId: organizationId,
                jsonBody: JSON.stringify(body)
            };
    
            //-- Save updated `Organization`
            console.log('Saves updated `Organization` %j', this.organizationsService.saveNewOrUpdatedOrganization(saveDoc));
    
            this.router.navigate(['organizations']);
            
        } else {
            alert('Cannot save an empty [Organization Name]');
        }
    }
}