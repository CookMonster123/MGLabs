export type OrganizationConsoleStatus='Planned'|'Active'|'Done'|'Paused';
export interface OrganizationConsoleRecord{id:string;title:string;detail:string;status:OrganizationConsoleStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface OrganizationConsoleSettings{enabled:boolean;compact:boolean;defaultStatus:OrganizationConsoleStatus;accent:string;}
