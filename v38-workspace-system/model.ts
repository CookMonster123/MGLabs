export type WorkspaceSystemStatus='Planned'|'Active'|'Done'|'Paused';
export interface WorkspaceSystemRecord{id:string;title:string;detail:string;status:WorkspaceSystemStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface WorkspaceSystemSettings{enabled:boolean;compact:boolean;defaultStatus:WorkspaceSystemStatus;accent:string;}
