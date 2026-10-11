export type CloudDriveIntegrationsStatus='Planned'|'Active'|'Done'|'Paused';
export interface CloudDriveIntegrationsRecord{id:string;title:string;detail:string;status:CloudDriveIntegrationsStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface CloudDriveIntegrationsSettings{enabled:boolean;compact:boolean;defaultStatus:CloudDriveIntegrationsStatus;accent:string;}
