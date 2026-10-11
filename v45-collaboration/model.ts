export type CollaborationStatus='Planned'|'Active'|'Done'|'Paused';
export interface CollaborationRecord{id:string;title:string;detail:string;status:CollaborationStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface CollaborationSettings{enabled:boolean;compact:boolean;defaultStatus:CollaborationStatus;accent:string;}
