

export class Object  {
    _id: '9195b1e7-f6ca-4e33-b7a6-583732361be5';
    id: 'Dashboard';
    name: 'Dashoard';
    object_type: 'Dashboard';
    organization: 'HeroMotocorp';
    use_case: 'MotoSport'
    object_permissions: [
        
        { security_role:'IIRP Admin', actions:'C|R|U|D'},
        { security_role:'Tenant Admin', actions:'' },
        { security_role:'Business Manager', actions:''},
        { security_role:'Business User', actions:''}

    ];
    access: [
        { allow_import:boolean},
        { allow_export:boolean},
        { allow_scripted_changes_by_customer:boolean}
    ];

    actions:[
        { name:'Acutate (Turn On/Off', description:'Ability to turn the object on/off'},
        { name:'Control Velocity', description:'data'},
        { name:'data', description:'data'}
    ];

    time_created: '2017-08-05T02:59:27Z';
    time_updated: '2017-08-06T02:59:27Z'
};
