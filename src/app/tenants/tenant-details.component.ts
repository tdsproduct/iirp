import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AppComponent } from '../app.component';
import { TenantModule } from './tenant.module';
import { Organization, ObjectEmail, Permission } from '../data-models/tenant';
import { Countries, StatesOrProvincesPerCountry, FontFamilies, CommonLookups } from '../data-models/common';
import { OrganizationsService } from '../core/organizations.service';
import { TenantsService } from '../core/tenants.service';
import { CommonService } from '../core/common.service';
import { AuthService } from '../core/auth.service';
import { Group } from '../data-models/common';
import { User } from '../data-models/user';
import { Observable } from 'rxjs/Observable';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';



@Component({
    selector: 'tenant-details',
    templateUrl: './tenant-details.component.html',
    styleUrls: ['./tenant-details.component.css']
})

export class TenantDetailsComponent implements OnInit {
    @ViewChild('fileInput') private fileInput: any;


public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @ViewChild(DropzoneDirective) directiveRef: DropzoneDirective;
  

    currentUser: User= new User();
    currentUsersOrganization: Organization = new Organization();

    
    tenant: any;
    jsonBody: any;
    id: string;
    url: string;

    isReadOnly: boolean;
    
    errorMessage: string;
    formHeader: string;
    path: any;
    paramKey: any;
    


    currentDate = new Date();

    tenantDetailsForm = new FormGroup({});

    //-- Lookups
    commonLookups = CommonLookups;
    countries = Countries;
    statesOrProvincesPerCountry = StatesOrProvincesPerCountry;
    listOfFontFamilies = FontFamilies;
    listOfIndustries: Group[];
    listOfTenantTypes = this.commonLookups.results.tenant_types;
    listOfSubscriptions = this.commonLookups.results.subscriptions;
    listOfBillingFrequencies = this.commonLookups.results.billing_frequencies;
    listOfIndustryTemplates = this.commonLookups.results.industry_templates;
    
    listOfOrganizations: Organization[];
    billingContacts: ObjectEmail[];
    filteredListOfOrganizations: Organization[];
    filteredListOfIndustries:Group[];

    tenantAdmins: ObjectEmail[];
    permissions: Permission[];

    //-- Inject HttpClient into your component or service
    constructor(private router: Router, 
                private route: ActivatedRoute,
                private fb: FormBuilder,
                private tenantService: TenantsService,
                private organizationsService: OrganizationsService,
                private commonService: CommonService,
                private app: AppComponent,
                private authService:AuthService) 
                {}
    
    ngOnInit(): void {
    
        
        this.paramKey = this.route.params.subscribe(params => {
            this.id = params['id'];
        });
    
        this.path = this.route.snapshot.url[1]? this.route.snapshot.url[1].toString() : this.id;
    
       
        if (!this.authService.isAuthenticated()) this.router.navigate(['dashboard']);
        this.authService.currentUser.subscribe(
            user => {
            this.currentUser = user;
            let filters:string = '';

            if (user.security_role == 'Super Admin')
                filters = '';
            else 
                filters = '&name=name&value=' + user.organization;

            
            this.tenantAdmins = [{ email: this.currentUser.email_address}];
            this.billingContacts = [{ email: this.currentUser.email_address}];  

            this.getOrganizationsList(filters);    

            this.getIndustryList();

            this.createFormDefault();

                                
            this.jsonBody = JSON.stringify({id: this.id});
            const params = '&name=id&value=' + this.id;
            if (this.id)
            {
                this.getTenantById(params);
            }


        });
        
        this.authService.currentUsersOrganization.subscribe(org =>
           {
                this.currentUsersOrganization = org;
                let domain = (this.currentUsersOrganization.domain_name)? this.currentUsersOrganization.domain_name.replace('www.',''): '.';
                this.tenantDetailsForm.patchValue({
                    tenantIndustry: this.currentUsersOrganization.industry,
                    tenantFriendlyName:  domain.split('.')[0] +'-' + this.currentUsersOrganization.industry,
                    tenantDomain: domain
                });
           } );


        if (this.path === 'new') {
            this.formHeader = 'New Tenant';
        } else if (this.path === 'edit') {
            this.formHeader = 'Edit Tenant';
        } else {
            this.formHeader = 'Tenant Details';
        }
        
    }
    
    cancelEditTenant() {
        this.router.navigate(['tenants/' + this.tenant.id]);
    }
    
    createFormDefault() {
    
        this.tenantDetailsForm = this.fb.group({
            tenantFriendlyName:         new FormControl(),
            tenantType:                 new FormControl(),
            tenantIndustryTemplate:     new FormControl(),
            tenantOrganization:         new FormControl(),
            tenantIndustry:             new FormControl(),
            tenantDomain:               new FormControl(),
            tenantBillingFrequency:     new FormControl(),
            tenantSubscription:         new FormControl(),
            tenantBillingContacts:      new FormControl(),
            tenantAdmins:               new FormControl(),
        
            brandingLogo:               new FormControl(),
            brandingLoginPageLogo:      new FormControl(),
            brandingLandingPageLogo:    new FormControl(),
            brandingDashboardLogo:      new FormControl(),
            brandingLandingBackgroundLogo: new FormControl(),
            brandingThemeColor:         new FormControl(),
            brandingFontFamily:         new FormControl(),
            brandingNotes:              new FormControl(),
            brandingCopyrightMessage:   new FormControl()
        });

        
        

        this.tenantDetailsForm.patchValue(
            {
                tenantOrganization: this.currentUser.organization,
                tenantBillingFrequency: 'Monthly',
                tenantSubscription: 'Trial',
                tenantType: 'Standard',

                         
            }
        )
    
    }
    
    disableControlsForReadOnly() {
        
        this.isReadOnly = true;
        this.tenantDetailsForm.controls['tenantFriendlyName'].disable();
        this.tenantDetailsForm.controls['tenantType'].disable();
        this.tenantDetailsForm.controls['tenantIndustryTemplate'].disable();
        this.tenantDetailsForm.controls['tenantOrganization'].disable();
        this.tenantDetailsForm.controls['tenantIndustry'].disable();
        this.tenantDetailsForm.controls['tenantDomain'].disable();
        this.tenantDetailsForm.controls['tenantBillingFrequency'].disable();
        this.tenantDetailsForm.controls['tenantSubscription'].disable();
        this.tenantDetailsForm.controls['tenantBillingContacts'].disable();
        this.tenantDetailsForm.controls['tenantAdmins'].disable();
        
        this.tenantDetailsForm.controls['brandingLogo'].disable();
        this.tenantDetailsForm.controls['brandingLoginPageLogo'].disable();
        this.tenantDetailsForm.controls['brandingLandingPageLogo'].disable();
        this.tenantDetailsForm.controls['brandingDashboardLogo'].disable();
        this.tenantDetailsForm.controls['brandingLandingBackgroundLogo'].disable();
        this.tenantDetailsForm.controls['brandingThemeColor'].disable();
        this.tenantDetailsForm.controls['brandingFontFamily'].disable();
        this.tenantDetailsForm.controls['brandingNotes'].disable();
        this.tenantDetailsForm.controls['brandingCopyrightMessage'].disable();
        
    }
    
    enableFormControlsForEdit() {
        
        this.isReadOnly = false;
        this.tenantDetailsForm.controls['tenantFriendlyName'].enable();
        this.tenantDetailsForm.controls['tenantType'].enable();
        this.tenantDetailsForm.controls['tenantIndustryTemplate'].enable();
        this.tenantDetailsForm.controls['tenantOrganization'].enable();
        this.tenantDetailsForm.controls['tenantIndustry'].enable();
        this.tenantDetailsForm.controls['tenantDomain'].enable();
        this.tenantDetailsForm.controls['tenantBillingFrequency'].enable();
        this.tenantDetailsForm.controls['tenantSubscription'].enable();
        this.tenantDetailsForm.controls['tenantBillingContacts'].enable();
        this.tenantDetailsForm.controls['tenantAdmins'].enable();
        
        this.tenantDetailsForm.controls['brandingLogo'].enable();
        this.tenantDetailsForm.controls['brandingLoginPageLogo'].enable();
        this.tenantDetailsForm.controls['brandingLandingPageLogo'].enable();
        this.tenantDetailsForm.controls['brandingDashboardLogo'].enable();
        this.tenantDetailsForm.controls['brandingLandingBackgroundLogo'].enable();
        this.tenantDetailsForm.controls['brandingThemeColor'].enable();
        this.tenantDetailsForm.controls['brandingFontFamily'].enable();
        this.tenantDetailsForm.controls['brandingNotes'].enable();
        this.tenantDetailsForm.controls['brandingCopyrightMessage'].enable();
        
    }
    
    
    getIndustryList() {

   

        this.commonService.getIndustries()
            .subscribe( data => {
                this.listOfIndustries = data ["results"];
                    this.filteredListOfIndustries = this.listOfIndustries;
            },
        );
       

    }
    
    
    getOrganizationsList(params:string) {
        this.organizationsService.getOrganizations(params)
            .subscribe(data => {
                    this.listOfOrganizations = data['results'];
                    this.filteredListOfOrganizations = this.listOfOrganizations;
                    console.log("organizations:" + JSON.stringify(this.filteredListOfOrganizations));
                },
                error => this.errorMessage = <any>error);
        
    }

    
    getTenantById(params: string) {
        
        this.tenantService.getTenantById(params)
            .subscribe(data => {
                let results = data['results']
                let tenantDocFromDB = results[results.length-1];
                //console.log('Result of GET Tenant Details from Tenant.Service %j', tenantDocFromDB);

                //-- Validate the `tenantDocFromDB` JSON form and fix any missing attributes
                const defaultAdmins:any = [{ email: this.currentUser.email_address}];
                const defaultBillingContacts:any = [{ email: this.currentUser.email_address}];

                this.tenant = this.tenantService.validateTenantSchema(tenantDocFromDB);
                this.permissions = this.tenant.permissions;
                 this.billingContacts = this.tenant.details.billing_contacts || defaultBillingContacts;
                this.tenantAdmins = this.tenant.details.tenant_admins || defaultAdmins;

                //console.log('Result of ValidateTenantSchema from Tenant.Service %j', this.tenant);
                
                //console.log('Setting values...');
                this.tenantDetailsForm.setValue({
                    tenantFriendlyName:   this.tenant.friendly_name,
                    tenantType:   this.tenant.details.tenant_type,
                    tenantIndustryTemplate: this.tenant.details.industry_template,
                    tenantOrganization: this.tenant.details.organization,
                    tenantIndustry: this.tenant.details.industry,
                    tenantDomain: this.tenant.details.domain,
                    tenantBillingFrequency: this.tenant.details.billing_frequency,
                    tenantSubscription: this.tenant.details.subscription,
                    tenantBillingContacts: this.billingContacts,
                    tenantAdmins: this.tenantAdmins,

                    brandingLogo: this.tenant.branding.branding_logo.path,
                    brandingLoginPageLogo: this.tenant.branding.login_page_logo.path,
                    brandingLandingPageLogo: this.tenant.branding.landing_page_logo.path,
                    brandingDashboardLogo: this.tenant.branding.dashboard_logo.path,
                    brandingLandingBackgroundLogo: this.tenant.branding.landing_background_logo,
                    brandingThemeColor: this.tenant.branding.theme_color,
                    brandingFontFamily: this.tenant.branding.font_family,
                    brandingNotes: this.tenant.branding.notes,
                    brandingCopyrightMessage: this.tenant.branding.copyright_message,
                });
                
            if ((this.path === 'edit') || (this.path === 'new'))
                this.enableFormControlsForEdit()
            else
                this.disableControlsForReadOnly();
            })
    }

    loadEditTenant() {
        this.router.navigate(['tenants/edit/'+ this.tenant.id])
    }
    
    saveEditTenant() {
        const updatedTenant = this.tenantDetailsForm.value;
    
        let tenantId = updatedTenant.tenantFriendlyName.replace(/ /g, '');
        let currentDate = new Date();
        let createdDate = new Date();
        let createdBy = this.currentUser.email_address;
    
        //-- This is for update tenant
        if (this.tenant) {
            tenantId = this.tenant.id;
            createdDate = this.tenant.time_created;
            createdBy = this.tenant.created_by;
        }
    
        if (tenantId) {
            
            const body = {
                id: tenantId,
                name: tenantId,
                friendly_name: updatedTenant.tenantFriendlyName,
                details: {
                    tenant_type: updatedTenant.tenantType,
                    industry_template: updatedTenant.tenantIndustryTemplate,
                    organization: updatedTenant.tenantOrganization,
                    industry: updatedTenant.tenantIndustry,
                    domain: updatedTenant.tenantDomain,
                    billing_frequency: updatedTenant.tenantBillingFrequency,
                    subscription: updatedTenant.tenantSubscription,
                    billing_contacts: updatedTenant.tenantBillingContacts,
                    tenant_admins: updatedTenant.tenantAdmins,
                    device_models: updatedTenant.device_models,
                    use_cases: updatedTenant.use_cases,
                },
                branding: {
                    branding_logo: {
                        id: '',
                        path: updatedTenant.brandingLogo,
                    },
                    login_page_logo: {
                        id: '',
                        path: updatedTenant.brandingLoginPageLogo
                    },
                
                    landing_page_logo: {
                        id: '',
                        path: updatedTenant.brandingLandingPageLogo,
                    },
                    dashboard_logo: {
                        id: '',
                        path: updatedTenant.brandingDashboardLogo,
                    },
                    landing_background_logo: {
                        id: '',
                        path: updatedTenant.brandingLandingBackgroundLogo,
                        landing_page_logo: {
                            id: '',
                            path: updatedTenant.brandingLandingPageLogo,
                        },
                        dashboard_logo: {
                            id: '',
                            path: updatedTenant.brandingDashboardLogo,
                        },
                        landing_background_logo: {
                            id: '',
                            path: updatedTenant.brandingLandingBackgroundLogo,
                        
                        },
                        theme_color: updatedTenant.brandingThemeColor,
                        font_family: updatedTenant.brandingFontFamily,
                        notes: updatedTenant.brandingNotes,
                        copyright_message: updatedTenant.brandingCopyrightMessage
                    },
                
                    //Need to get the real permisison details here to save.
                    permissions: [{
                        'has_create': '',
                        'has_delete': '',
                        'has_export': '',
                        'has_import': '',
                        'has_read': '',
                        'has_update': '',
                        'item_name': 'Dashboard'
                    }, {
                        'has_create': '',
                        'has_delete': '',
                        'has_export': '',
                        'has_import': '',
                        'has_read': '',
                        'has_update': '',
                        'item_name': 'Organizations'
                    }, {
                        'has_create': '',
                        'has_delete': '',
                        'has_export': '',
                        'has_import': '',
                        'has_read': '',
                        'has_update': '',
                        'item_name': 'Tenants'
                    }, {
                        'has_create': '',
                        'has_delete': '',
                        'has_export': '',
                        'has_import': '',
                        'has_read': '',
                        'has_update': '',
                        'item_name': 'Use-Cases'
                    }, {
                        'has_create': '',
                        'has_delete': '',
                        'has_export': '',
                        'has_import': '',
                        'has_read': '',
                        'has_update': '',
                        'item_name': 'DeviceType'
                    }, {
                        'has_create': '',
                        'has_delete': '',
                        'has_export': '',
                        'has_import': '',
                        'has_read': '',
                        'has_update': '',
                        'item_name': 'Objects'
                    }, {
                        'has_create': '',
                        'has_delete': '',
                        'has_export': '',
                        'has_import': '',
                        'has_read': '',
                        'has_update': '',
                        'item_name': 'Roles'
                    }, {
                        'has_create': '',
                        'has_delete': '',
                        'has_export': '',
                        'has_import': '',
                        'has_read': '',
                        'has_update': '',
                        'item_name': 'Users'
                    }],
                    time_updated: this.currentDate,
                    time_created: createdDate,
                    updated_by: this.currentUser.email_address,
                    created_by: createdBy
                }
            };
        
            let saveDoc = {
                tenantId: tenantId,
                jsonBody: JSON.stringify(body)
            };
        
            //-- Save updated `Tenant`
            console.log('Saves updated `Tenant` %j', this.tenantService.saveNewOrUpdatedTenant(saveDoc));
        
            this.router.navigate(['tenants']);
        
        } else {
            alert('Cannot save an empty [Tenant Name]');
        }
    }
    
    saveImage(event: any) {
        //-- console.log('Log: File Drag & Drop');
        //-- console.log('this.tenantDetailsForm.controls[\'brandingLogo\'] = ' );
        //-- console.log(this.tenantDetailsForm.controls['brandingLogo']);
        //-- console.log(this.tenantDetailsForm.value.brandingLogo);
        
        let filePath = (<HTMLInputElement>document.getElementById('brandingLogo')).value;
        console.log('Saving ' + filePath);
    
        this.url = filePath;
        
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
        
            reader.onload = (event) => {
                //-- this.url = event.target.result;
            }
        
            reader.readAsDataURL(event.target.files[0]);
        }
        
        //-- s3://iirp-tenant-set1/d4dt-iirp/<files>
        
    }
    
    uploadImage() {}

    onUploadError(args: any) {
        console.log('onUploadError:', args);
      }
    
      onUploadSuccess(args: any) {
        console.log('onUploadSuccess:', args);
      }
    
}