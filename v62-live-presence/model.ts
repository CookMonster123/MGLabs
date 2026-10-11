export type LivePresenceStatus='Planned'|'Active'|'Done'|'Paused';
export interface LivePresenceRecord{id:string;title:string;detail:string;status:LivePresenceStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface LivePresenceSettings{enabled:boolean;compact:boolean;defaultStatus:LivePresenceStatus;accent:string;}
