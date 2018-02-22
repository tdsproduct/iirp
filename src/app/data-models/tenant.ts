
export const BillingContacts = [
    {email: 'iirp-billing@iotworldlabs.com'},
    {email: 'iirp-billing-enterprise@iotworldlabs.com'}
];

export const BillingPlans = ['Daily', 'Weekly', 'Per GigaBytes Usage', 'Per TeraBytes Usage', 'Monthly'];

export const DefaultTenantAdmins = [
    {email: ''}
];

export const ListOfOrganizations = [
    {   _id: '9195b1e7-f6ca-4e33-b7a6-583732361be5',
        id: 'OnAssignment',
        name: 'On Assignment',
        industry: 'IT Outsourcing',
        use_cases: 12,
        main_contact: 'Data',
        domain_name: 'www.cybercoder.com',}
];

export const ListOfTenantsNames = ['IOTWL - Tenant (Default)',];

export class ObjectEmail {
    email: '';
};

export class ObjectImage {
    id = '';
    path = '';
};


export class Organization  {
    id: '';
    name: string;
    domain_name: string;
    industry: string;
    use_cases: number;
    main_contact: string;
    address: {
        address1: '';
        address2: '';
        city: '';
        state: {
            code: '';
            name: '';
        },
        country: {
            code: '';
            name: '';
        },
        postal_code: string;
        coordinates: {
            lat: '';
            lng: '';
        }
    };
    branding_logo: {
        id: '';
        path: '';
    };
    time_created: '2017-08-05T02:59:27Z';
    time_updated: '2017-08-06T02:59:27Z'
};

export const Organizations = ['IOTWL'];

export class Permission {
    item_name = '';
    has_create = false;
    has_read = false;
    has_update = false;
    has_delete = false;
    has_import = false;
    has_export = false;
};

export class Tenant {
    id: string;
    name: string;
    friendly_name: string;
    details:
        {
        tenant_type: string,
        industry_template: string,
        organization: string,
        industry: string,
        domain : string,
        billing_frequency: string,
        subscription: string, 
        billing_contacts: ObjectEmail[],
        tenant_admins: ObjectEmail[],
        device_models: string,
        use_cases: string,
        };
    branding : {
        branding_logo: ObjectImage,
        login_page_logo: ObjectImage,
        dashboard_logo: ObjectImage,
        landing_page_logo: ObjectImage,
        landing_background_logo: ObjectImage,
        theme_color: string,
        font_family: string,
        notes: string,
        copyright_message: string,
    };
    permissions: Permission[];
    time_created: string;
    time_updated: string;
    created_by : string;
    updated_by : string;
};

export const TenantSchema = {
    id: '',
    name: '',
    friendly_name: '',
    details:
    {
        tenant_type:'',
        industry_template: '',
        organization: '',
        industry: '',
        sub_domain:'',
        tenant_admin:'',
        billing_plan: '',
        billing_contacts: ObjectEmail[''],
        default_tenant_admins: ObjectEmail[''],
        device_models:'',
        use_cases:'',
    },
    branding: {
        branding_logo: ObjectImage,
        landing_page_logo: ObjectImage,
        dashboard_logo: ObjectImage,
        landing_background_logo: ObjectImage,
        theme_color: '',
        font_family: '',
        notes: '',
        copyright_message: ''
    },
    permissions: Permission[''],
    time_updated:'',
    time_created: '',
    created_by: '',
    updated_by: ''
};

export const TenantDetails = {
    _id: 'tenant-detail-tenant_id_0001',
    details: {
        tenant_template: '',
        organization: '',
        tenant_name: '',
        industry: '',
        tenant_type: '',
        sub_domain: '',
        tenant_admin: '',
        billing_plan: '',
        billing_contacts: BillingContacts,
        default_tenant_admins: [
            {email: ''}
        ],
        
    },
    
    branding: {
        branding_logo: {
            id: '3a4b43db-a9cf-4b88-bd66-74319503d239',
            path: 'https://placeimg.com/300/200/arch/grayscale'
        },
        landing_page_logo: {
            id: '3a4b43db-a9cf-4b88-bd66-74319503d239',
            path: 'https://placeimg.com/300/200/people'
        },
        dashboard_logo: {
            id: '3a4b43db-a9cf-4b88-bd66-74319503d239',
            path: 'https://placeimg.com/300/200/nature'
        },
        landing_background_logo: {
            id: '3a4b43db-a9cf-4b88-bd66-74319503d239',
            path: 'https://placeimg.com/300/200/nature/grayscale'
        },
        theme_color: 'rgb(0,0,0)',
        font_family: 'Open Sans',
        notes: 'Any branding notes',
        copyright_message: 'This is a sample Copyright message!'
    },
    
    permissions:
        [
            {
                item_name: 'Dashboard',
                has_create: false,
                has_read: false,
                has_update: true,
                has_delete: false,
                has_import: true,
                has_export: false
            },
            {
                item_name: 'Organizations',
                has_create: false,
                has_read: true,
                has_update: true,
                has_delete: false,
                has_import: false,
                has_export: true
            },
            {
                item_name: 'Tenants',
                has_create: true,
                has_read: true,
                has_update: true,
                has_delete: false,
                has_import: false,
                has_export: false
            },
            {
                item_name: 'Use-Cases',
                has_create: true,
                has_read: true,
                has_update: true,
                has_delete: false,
                has_import: false,
                has_export: true
            },
            {
                item_name: 'Device Type',
                has_create: true,
                has_read: true,
                has_update: true,
                has_delete: false,
                has_import: false,
                has_export: true
            },
            {
                item_name: 'Objects',
                has_create: false,
                has_read: true,
                has_update: false,
                has_delete: false,
                has_import: true,
                has_export: false
            },
            {
                item_name: 'Roles',
                has_create: false,
                has_read: false,
                has_update: true,
                has_delete: false,
                has_import: true,
                has_export: false
            },
            {
                item_name: 'Users',
                has_create: true,
                has_read: false,
                has_update: true,
                has_delete: false,
                has_import: true,
                has_export: false
            }
        ],
    
    permission: {
        //-- Permissions - Dashboard
        dashboardHasCreate: '',
        dashboardHasRead: '',
        dashboardHasUpdate: '',
        dashboardHasDelete: '',
        dashboardHasImport: '',
        dashboardHasExport: '',
        //-- Permissions - Organization
        organizationHasCreate: '',
        organizationHasRead: '',
        organizationHasUpdate: '',
        organizationHasDelete: '',
        organizationHasImport: '',
        organizationHasExport: '',
        //-- Permissions - Tenant
        tenantHasCreate: '',
        tenantHasRead: '',
        tenantHasUpdate: '',
        tenantHasDelete: '',
        tenantHasImport: '',
        tenantHasExport: '',
        //-- Permissions - Use Cases
        useCaseHasCreate: '',
        useCaseHasRead: '',
        useCaseHasUpdate: '',
        useCaseHasDelete: '',
        useCaseHasImport: '',
        useCaseHasExport: '',
        //-- Permissions - Device Types
        deviceTypeHasCreate: '',
        deviceTypeHasRead: '',
        deviceTypeHasUpdate: '',
        deviceTypeHasDelete: '',
        deviceTypeHasImport: '',
        deviceTypeHasExport: '',
        //-- Permissions - Objects
        objectHasCreate: '',
        objectHasRead: '',
        objectHasUpdate: '',
        objectHasDelete: '',
        objectHasImport: '',
        objectHasExport: '',
        //-- Permissions - Roles
        roleHasCreate: '',
        roleHasRead: '',
        roleHasUpdate: '',
        roleHasDelete: '',
        roleHasImport: '',
        roleHasExport: '',
        //-- Permissions - Users
        userHasCreate: '',
        userHasRead: '',
        userHasUpdate: '',
        userHasDelete: '',
        userHasImport: '',
        userHasExport: ''
    },
    
    time_created: '2017-08-03T02:59:27Z',
    time_updated: '2017-08-03T02:59:27Z'
};

/*** copy from Industries */
export const IndustryTemplates = ['Automotive','E-commerce','Energy', 'FinTech', 'FMCG','Manufacturing', 'Oil & Gas', 'Smart Initiative/City', 'Software','Retail','Transportation', 'Other'];

export const TenantTypes = ['Standard', 'Partner'];
