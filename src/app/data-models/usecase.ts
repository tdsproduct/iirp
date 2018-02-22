
export class Usecase {
    id: string;
    friendly_name: string;
    usecase_status: string;
    industry: string;
    usecase_template: string;
    usecase_tenant: string;
    usecase_type: string;
    description: string;
    user_info: {
        user_hierarchy: string;
        change_role_functionality: string;
        user_unsubscribe:string;
        is_user_invite_feature_included: boolean;
    };
    collaborators: [{}];
    files: {
        usecase_icon: {
            id: string; //-- Temporary; must be UUID.v4()
            path: string;
        };
        usecase_documents: [{}]
    };
    created_time: string;
    created_by: string;
    time_updated: string;
    updated_by:string;
    
};

export const UsecaseSchema = {
    id: '',
    friendly_name: '',
    usecase_status: '',
    industry: '',
    usecase_template: '',
    usecase_tenant: '',
    usecase_type: '',
    description: '',
    user_info: {
        user_hierarchy: '',
        change_role_functionality: '',
        user_unsubscribe: '',
        is_user_invite_feature_included: true
    },
    collaborators: [{
        email: 'tom.bok@company.com',
        status: 'CONFIRMED',
        invite_note: ''
    }, {
        email: 'jean.ko@example.com',
        status: 'INVITED',
        invite_note: ''
    }],
    files: {
        usecase_icon: {
            id: '', //-- Temporary; must be UUID.v4()
            path: '',
        },
        usecase_documents: [
            {
                id: '7eea57b5-61a0-4efa-b9e3-26c652f8c821',
                filename: 'Water Filter Model 56568.pdf',
                path: 'https://iotworldlabs.s3.bucketname1/'
            }, {
                id: 'cfead218-c333-42ce-8188-51c34dae6e4b',
                filename: 'Water Filter Model 56568 MSDS.pdf',
                path: 'https://iotworldlabs.s3.bucketname1/'
            }
        ]
    },
    devices: [
        {'device_model_id':'D4DT-SG-000','device_model':'SmartGeyser-D4DT-Model2','device_type':'water-heater','sensors':'3','data_freq':'10','packet_size':'512','json_fields':'timeStamp deviceId field1 field2 field3','data_protocols':'HTTPS-POST-JSON'},
        {'device_model_id':'D4DT-WP-101','device_model':'WaterPurifier-D4DT-Model1','device_type':'water-filter','sensors':'3','data_freq':'12','packet_size':'256','json_fields':'timeStamp deviceId field1 field2 field3','data_protocols':'HTTPS-POST-JSON'},
        {'device_model_id':'D4DT-WP-102','device_model':'WaterPurifier-D4DT-Model1','device_type':'water-filter','sensors':'3','data_freq':'12','packet_size':'256','data_fields':'timeStamp deviceId field1 field2 field3','data_interface':'MQTT,HTTPS,POST,JSON'},
        {'device_model_id':'D4DT-WP-103','device_model':'WaterPurifier-D4DT-Model1','device_type':'water-filter','sensors':'3','data_freq_perhour':'12','packet_size':'256','data_fields':'timeStamp deviceId field1 field2 field3','data_interface':'MQTT,HTTPS,POST,JSON'},
        {'device_model_id':'D4DT-WP-104','device_model':'WaterPurifier-D4DT-Model1','device_type':'water-filter','sensors':'3','data_freq_perhour':'12','packet_size_bytes':'256','data_fields':'timeStamp deviceId field1 field2 field3','data_interface':'MQTT,HTTPS,POST,JSON'},
        {'device_model_id':'D4DT-WP-105','device_model':'TEST-WaterPurifier-D4DT-Model1','device_type':'water-filter','sensors':'3','data_freq_perhour':'12','packet_size_bytes':'256','data_fields':'timeStamp deviceId field1 field2 field3','data_interface':'MQTT,HTTPS,POST,JSON'}
    ],
    
    created_time: '',
    created_by: '',
    time_updated: '',
    updated_by: ''
    
};

export const UsecaseDocuments = [
    {
        id: '7eea57b5-61a0-4efa-b9e3-26c652f8c821',
        filename: 'Water Filter Model 56568.pdf',
        path: 'https://iotworldlabs.s3.bucketname1/'
    }, {
        id: 'cfead218-c333-42ce-8188-51c34dae6e4b',
        filename: 'Water Filter Model 56568 MSDS.pdf',
        path: 'https://iotworldlabs.s3.bucketname1/'
    }
];

export const UsecaseIcons = ['List of Icons'];

export const UsecaseStatuses = ['Draft', 'Published'];

export const UsecaseTemplates = ['Smart-Device-Manufacturing', 'Other-Devices'];

export const UsecaseTenants = ['T2-D4DT', 'D4DT-Automotive', 'Other-Tenant'];

export const UsecaseTypes = ['CNC', 'Assembly Line'];

export const ListOfUseCases = [
    {   _id: 'usecase-detail',
        usecase_name: 'Hero Labs',
        industry: 'Manufacturing',
        item1: 'Data 1',
        item2: 'Data 2',
        item3: 'Data 3',
        item4: 'Data 4'},
    {   _id: '',
        usecase_name: 'Petronas',
        industry: 'Liquified Petroleum Gas',
        item1: 'Data 1',
        item2: 'Data 2',
        item3: 'Data 3',
        item4: 'Data 4'},
    {   _id: '',
        usecase_name: 'McDonalds',
        industry: 'Food',
        item1: 'Data 1',
        item2: 'Data 2',
        item3: 'Data 3',
        item4: 'Data 4'},
    {   _id: '',
        usecase_name: 'Smart Bikes',
        industry: 'Manufacturing',
        item1: 'Data 1',
        item2: 'Data 2',
        item3: 'Data 3',
        item4: 'Data 4'},
    {   _id: '',
        usecase_name: 'Tesla',
        industry: 'Motor Vehicles',
        item1: 'Data 1',
        item2: 'Data 2',
        item3: 'Data 3',
        item4: 'Data 4'}
];