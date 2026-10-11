export type CollaborationSuiteStatus='Planned'|'Active'|'Done'|'Paused';
export interface CollaborationSuiteRecord{id:string;title:string;detail:string;status:CollaborationSuiteStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface CollaborationSuiteSettings{enabled:boolean;compact:boolean;defaultStatus:CollaborationSuiteStatus;accent:string;}
