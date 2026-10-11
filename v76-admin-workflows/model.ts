export type AdminWorkflowsStatus='Planned'|'Active'|'Done'|'Paused';
export interface AdminWorkflowsRecord{id:string;title:string;detail:string;status:AdminWorkflowsStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface AdminWorkflowsSettings{enabled:boolean;compact:boolean;defaultStatus:AdminWorkflowsStatus;accent:string;}
