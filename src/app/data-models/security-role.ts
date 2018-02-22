
export const SecurityRoles = ['Select ...','Super Admin', 'Tenant Group Admin', 'Tenant Admin','Business Manager','Business User'];
export class SecurityRole
{
    _id: string;
    id: string;
    name:string;
    actions:string;
}

export const SUPER_ADMIN:string = 'Super Admin';
export const TENANT_ADMIN:string = 'Tenant Admin';
export const TENANT_ADMINS:string = 'Tenant Group Admin';