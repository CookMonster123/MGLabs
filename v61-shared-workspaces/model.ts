export type SharedWorkspacesStatus='Planned'|'Active'|'Done'|'Paused';
export interface SharedWorkspacesRecord{id:string;title:string;detail:string;status:SharedWorkspacesStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface SharedWorkspacesSettings{enabled:boolean;compact:boolean;defaultStatus:SharedWorkspacesStatus;accent:string;}
