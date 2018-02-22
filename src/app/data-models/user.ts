
export class User {
    id: '';
    prefix: string;
    full_name: string;
    nick_name: string;
    suffix: '';
    
    organization: string;
    job_title: '';
    email_address: '';
    main_contact: '';
    phone_number: '';
    mobile_number: '';
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
        postal_code: '';
    };
    security_role: string;
    group: '';
    linkedin: '';
    time_created: '';
    time_updated: '';

    created_by: '';
    updated_by: '';
};

export const UserSchema = {
    id: '',
    prefix: '',
    full_name: '',
    nick_name: '',
    suffix: '',
    
    organization: '',
    job_title: '',
    email_address: '',
    main_contact: '',
    phone_number: '',
    mobile_number: '',
    address: {
        address1: '',
        address2: '',
        city: '',
        state: {
            code: '',
            name: '',
        },
        country: {
            code: '',
            name: '',
        },
        postal_code: '',
    },
    security_role: '',
    group: '',
    linkedin: '',
    time_created: '',
    time_updated: '',
    created_by: '',
    updated_by: ''
};

/*** DELETE this after fixing the SignIn page */
export const ListOfUsers = [
    {   _id: '59951f2b387b116a1734b8a8',
        id: 'JaideepSen',
        email: 'jaideep@iotworldlabs.com',
        name: 'jaideep@iotworldlabs.com',
        organization: 'IOT World Labs',
        group: 'CxO',
        first: 'Jaieep',
        last: 'Sen',
        phone_number: '(975) 120-1288'
    },
    {  _id: '59951f2b387b116a1734b8a9',
        id: 'AshishKhare',
        email: 'ashish@iotworldlabs.com',
        name: 'ashish@iotworldlabs.com',
        organization: 'IOT World Labs',
        group: 'CxO',
        first: 'Ashish',
        last: 'Khare',
        phone_number: '(735) 120-1288'
    },
    {  _id: '59951f2b387b116a1734b8aa',
        id: 'RoxyStimpson',
        email: 'roxy@iotworldlabs.com',
        name: 'roxy@iotworldlabs.com',
        organization: 'IOT World Labs',
        group: 'CxO',
        first: 'Roxy',
        last: 'Stimpson',
        phone_number: '(625) 120-1288'
    },
    {  _id: '59951f2b387b116a1734b8ab',
        id: 'VishalMishra',
        email: 'vishal@iotworldlabs.com',
        name: 'vishal@iotworldlabs.com',
        organization: 'IOT World Labs',
        group: 'CxO',
        first: 'Vishal',
        last: 'Mishra',
        phone_number: '(750) 120-1288'
    },
    {  _id: '59951f2b387b116a1734b8ac',
        id: 'ChoncholGupta',
        email: 'chonchol@iotworldlabs.com',
        name: 'chonchol@iotworldlabs.com',
        organization: 'IOT World Labs',
        group: 'CxO',
        first: 'Chonchol',
        last: 'Gupta',
        phone_number: '(675) 120-1288'
    }
];



export class UserGroup  {
    id: '59951f2b387b116a1734b8a8';
    name: 'VIPs';
    organization: 'D4DT';
    securityRole: 'Tenant Admin';

    time_created: '';
    time_updated: '';
    created_by: '';
    updated_by: ''
    
    
}

