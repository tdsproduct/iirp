

export const DataInterfaces = ['Bluetooth', 'GSM', 'Wi-fi', 'Zeegby'];

export const DeviceDocuments = [
    {
        path: 'https://s3/iotwl/devices/documents/DataRetentionPolicy.pdf',
        filename: 'Data Retention Policy.pdf'
    },
    {
        path: 'https://s3/iotwl/devices/documents/PolicyNotes.xlsx',
        filename: 'Policy Notes.xlsx'
    },
    {
        path: 'https://s3/iotwl/devices/documents/AddendumtoDataPolicy.docx',
        filename: 'Addendum to Data Policy.docx'
    }
];

export class DeviceModel {
    id:                             '';
    tenant_id:                      '';
    device_type:                    '';
    details: {
        device_type_template:       '';
        number_of_devices:          '';
        industry:                   '';
        number_of_sensors_per_device:'';
        device_details:             '';
        device_protocol:            '';
        is_user_data_import:        '';
        is_device_data_import:      '';
        device_region:              '';
        raw_data_format:            '';
        
        interface_description:      '';
        data_interface:             '';
        max_allowed_tokens_per_user:'';
        notification_type_email:    '';
        notification_type_sms:      '';
        notification_type_mobile:   '';
        notification_type_other:    '';
        scheduled_actions_needed:   '';
        scheduling_will_be_managed_by: '';
        is_data_views_showing:      '';
        
        device_settings:            '';
        raw_data_policy:            '';
        processed_data_policy:      '';
        user_data_policy:           '';
        invite_note_mobile_app_features:        '';
        invite_note_mobile_app_permission_mgr:  '';
        invite_note_user_device_permissions:    '';
    };
    files: {
        device_image: {
            id: 'NUUID';
            path: '';
        },
        device_icon: {
            id: 'NUUID',
            path: '';
        }
    };
    
    device_documents:   '';
    
    /**
     * Begin: Temporarily hardcoded; should be coming from the Sensors table
     */
    device_tag_frequency: {
        value: '';
        unit: 'MINS' };
    device_packet_size: {
        value: '';
        unit: 'KB' };
    data_format: '';
    
    /**
     * End: Temporarily hardcoded; should be coming from the Sensors table
     */
    
};

export const DeviceModelSchema = {
    id: '',
    tenant_id: '',
    device_type: '',
    details: {
        device_type_template: '',
        number_of_devices: '',
        industry: '',
        number_of_sensors_per_device: '',
        device_details: '',
        device_protocol: '',
        is_user_data_import: '',
        is_device_data_import: '',
        device_region: '',
        raw_data_format: '',
    
        interface_description: '',
        data_interface: '',
        max_allowed_tokens_per_user: '',
        notification_type_email: '',
        notification_type_sms: '',
        notification_type_mobile: '',
        notification_type_other: '',
        scheduled_actions_needed: '',
        scheduling_will_be_managed_by: '',
        is_data_views_showing: '',
        
        device_settings: '',
        raw_data_policy: '',
        processed_data_policy: '',
        user_data_policy: '',
        invite_note_mobile_app_features: '',
        invite_note_mobile_app_permission_mgr: '',
        invite_note_user_device_permissions: '',
    },
    files: {
        device_image: {
            id: 'NUUID',
            path: ''
        },
        device_icon: {
            id: 'NUUID',
            path: ''
        }
    },
    device_documents:   '',

    /**
     * Begin: Temporarily hardcoded; should be coming from the Sensors table
     */
    device_tag_frequency: {
        value: '',
        unit: 'MINS' },
    device_packet_size: {
        value: '',
        unit: 'KB' },
    data_format: '',
    
    /**
     * End: Temporarily hardcoded; should be coming from the Sensors table
     */

}

export const DeviceTypeActions = [
    {   action: 'Actuate (Turn On/Off',
        description: 'Ability to turn the object on/off',
        scope: 'All' },
    {   action: 'Control Velocity',
        description: 'Data',
        scope: '' },
];

export class DeviceType {
    id: '';
    friendly_name: '';
    device_type_status: '';
    device_type_usecase: '';
    device_type_organization: '';
    details: {
        from_device_type: '';
        device_type_details: '';
        standard_settings: '';
        raw_data_policy: '';
        processed_data_policy: '';
        user_data_policy: '';
        device_type_protocol: '';
        user_data_import: '';
        device_data_import: '';
        device_type_region: '';
        raw_data_format: '';
        interface_description: '';
        paste_sample_data: '';
        data_interface: '';
        max_allowed_tokens_per_user: '';
        userData_policy: '';
        
        notification_type_email: '';
        notification_type_sms: '';
        notification_type_mobile: '';
        notification_type_other: '';
        scheduled_actions_needed: '';
        scheduling_will_be_managed_by: '';
        is_data_views_showing: '';
    };
    files: {
        device_image: {
            id: '';
            path: '';
        };
        device_icon: {
            id: '';
            path: '';
        };
        custom_actions_device_image: {
            id: '';
            path: '';
        };
        device_documents: [{
            id: ''; //-- Temporary; must be UUID.v4()
            filename: '';
            path: '';
        }]
    };
    mobile_app_details: {
        mobile_app_login_oauth_requirement_google: '';
        mobile_app_login_oauth_requirement_facebook: '';
        mobile_app_login_oauth_requirement_otp: '';
        mobile_app_login_oauth_requirement_multifactor: '';
        mobile_app_features: '';
        mobile_app_permission_mgr: '';
        user_device_permissions: '';
    };
    
};

export const DeviceTypeSchema = {
    id: '',
    friendly_name: '',
    device_type_status: '',
    device_type_usecase: '',
    device_type_organization: '',
    details: {
        from_device_type: '',
        device_type_details: '',
        standard_settings: '',
        raw_data_policy: '',
        processed_data_policy: '',
        user_data_policy: '',
        device_type_protocol: '',
        user_data_import: '',
        device_data_import: '',
        device_type_region: '',
        raw_data_format: '',
        interface_description: '',
        paste_sample_data: '',
        data_interface: '',
        max_allowed_tokens_per_user: '',
        userData_policy: '',
        
        notification_type_email: '',
        notification_type_sms: '',
        notification_type_mobile: '',
        notification_type_other: '',
        scheduled_actions_needed: '',
        scheduling_will_be_managed_by: '',
        is_data_views_showing: ''
    },
    files: {
        device_image: {
            id: '',
            path: '',
        },
        device_icon: {
            id: '',
            path: '',
        },
        custom_actions_device_image: {
            id: '',
            path: '',
        },
        device_documents: DeviceDocuments
    },
    mobile_app_details: {
        mobile_app_login_oauth_requirement_google: '',
        mobile_app_login_oauth_requirement_facebook: '',
        mobile_app_login_oauth_requirement_otp: '',
        mobile_app_login_oauth_requirement_multifactor: '',
        mobile_app_features: '',
        mobile_app_permission_mgr: '',
        user_device_permissions: '',
    }
    
};

export const DeviceTypes = ['Water Filter Premium II', 'Cylinder Block Machine', 'Water Filter Premium II', 'Water Purifier -Premium'];

export const DeviceTypeTemplates = ['Device Type Template 1', 'Device Type Template 2', 'Device Type Template 3', 'New Device Type Template'];

export const DeviceTypeUsecases = ['Bellevue IT Incubation', 'Smart Bikes', 'Add New'];

export const DeviceTypeStatuses = ['Draft', 'Published'];

export const DeviceTypeModelsAndSensors = [
    {
        device_model: 'WaterPro - 3dx',
        sensor_model: 'Honeywell A140-B',
        source_type: 'Location',
        source: 'GPS',
        data_frequency: {
            value: '.02',
            unit: 'min'
        },
        packet_size: {
            value: '5',
            unit: 'kb'
        },
        data_format: 'JSON',
        data_interface: 'Bluetooth'
    }, {
        device_model: 'WaterPro - 3dx',
        sensor_model: 'Honeywell A140-B',
        source_type: 'Maps',
        source: 'GPS',
        data_frequency: {
            value: '.02',
            unit: 'min'
        },
        packet_size: {
            value: '5',
            unit: 'kb'
        },
        data_format: 'JSON',
        data_interface: 'Bluetooth'
    }, {
        device_model: 'WaterPro - 3dx',
        sensor_model: 'Omron 5689',
        source_type: 'Flow',
        source: '',
        data_frequency: {
            value: '.02',
            unit: 'min'
        },
        packet_size: {
            value: '5',
            unit: 'kb'
        },
        data_format: 'JSON',
        data_interface: 'Bluetooth'
    }, {
        device_model: 'WaterPro - 3dx',
        sensor_model: 'Press-45',
        source_type: 'Pressure',
        source: '',
        data_frequency: {
            value: '.02',
            unit: 'min'
        },
        packet_size: {
            value: '5',
            unit: 'kb'
        },
        data_format: 'JSON',
        data_interface: 'Bluetooth'
    }, {
        device_model: 'WaterPro - 3dx',
        sensor_model: 'Honeywell A140-B',
        source_type: 'Location',
        source: '',
        data_frequency: {
            value: '.04',
            unit: 'min'
        },
        packet_size: {
            value: '8',
            unit: 'kb'
        },
        data_format: 'JSON',
        data_interface: 'Bluetooth'
    }, {
        device_model: 'WaterPro - 3dx',
        sensor_model: 'Honeywell C566',
        source_type: 'Location',
        source: '',
        data_frequency: {
            value: '.04',
            unit: 'min'
        },
        packet_size: {
            value: '8',
            unit: 'kb'
        },
        data_format: 'JSON',
        data_interface: 'Bluetooth'
    }, {
        device_model: 'EcoFlow - 55',
        sensor_model: 'Honeywell D897',
        source_type: 'Location',
        source: '',
        data_frequency: {
            value: '.04',
            unit: 'min'
        },
        packet_size: {
            value: '8',
            unit: 'kb'
        },
        data_format: 'JSON',
        data_interface: 'Bluetooth'
    }
];

export const ListOfDevices = [
    {   _id: 'sample_id',
        device_name: 'Water Filter',
        device_type: 'Water Filter - Premium',
        device_model: 'Model 56568 WaterPro - 3dx',
        sensors_per_device: 3,
        number_of_devices: 500,
        location: '',
        device_tag_frequency: {
            value: .02,
            unit: 'MINS'
        },
        device_packet_size: {
            value: 5,
            unit: 'KB'
        },
        data_format: 'JSON',
        data_interface: 'BLUETOOTH'
    }, {
        _id: '',
        device_name: 'Water Filter',
        device_type: 'Water Filter - Premium',
        device_model: 'WaterPro - 4sx',
        sensors_per_device: 3,
        number_of_devices: 423,
        location: '',
        device_tag_frequency: {
            value: .02,
            unit: 'MINS'
        },
        device_packet_size: {
            value: 11,
            unit: 'KB'
        },
        data_format: 'JSON',
        data_interface: 'BLUETOOTH'
    }, {
        _id: '',
        device_name: 'Water Filter',
        device_type: 'Water Filter - Economy',
        device_model: 'WaterPro - ecoSense',
        sensors_per_device: 3,
        number_of_devices: 652,
        location: '',
        device_tag_frequency: {
            value: .03,
            unit: 'MINS'
        },
        device_packet_size: {
            value: 12,
            unit: 'KB'
        },
        data_format: 'JSON',
        data_interface: 'BLUETOOTH'
    }, {
        _id: '',
        device_name: 'Water Pump',
        device_type: 'Water Pump',
        device_model: 'Master Pump X778c',
        sensors_per_device: 5,
        number_of_devices: 124,
        location: '',
        device_tag_frequency: {
            value: .05,
            unit: 'MINS'
        },
        device_packet_size: {
            value: 5,
            unit: 'KB'
        },
        data_format: 'JSON',
        data_interface: 'BLUETOOTH'
    }
];

export const ListOfDevicesTypes = [
    {   id: 'WaterFilter-Premium',
        device_name: 'Water Filter - Premium',
        tenants: 'Haveils',
        usecases: 'Use Case 1, Use Case 2',
        organization: 'Organization 1',
        number_of_devices: 500,
        location: '',
        device_tag_frequency: {
            value: .02,
            unit: 'MINS'
        },
        device_packet_size: {
            value: 5,
            unit: 'KB'
        },
        data_format: 'JSON',
        data_interface: 'BLUETOOTH'
    }, {
        id: 'WaterFilter-Premium',
        device_name: 'Water Pump - Xtreme',
        tenant: 'Xerox, Microsoft, Starbucks',
        usecases: 'Use Case31, Use Case 4',
        organization: 'Organization 3',
        number_of_devices: 423,
        location: '',
        device_tag_frequency: {
            value: .02,
            unit: 'MINS'
        },
        device_packet_size: {
            value: 11,
            unit: 'KB'
        },
        data_format: 'JSON',
        data_interface: 'BLUETOOTH'
    }
];

export const RawDataFormats = ['deviceid', 'timestamp', 'humidity', 'temperature', 'status'];
