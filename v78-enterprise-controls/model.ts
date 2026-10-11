export type EnterpriseControlsStatus='Planned'|'Active'|'Done'|'Paused';
export interface EnterpriseControlsRecord{id:string;title:string;detail:string;status:EnterpriseControlsStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface EnterpriseControlsSettings{enabled:boolean;compact:boolean;defaultStatus:EnterpriseControlsStatus;accent:string;}
