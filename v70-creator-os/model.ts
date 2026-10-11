export type CreatorOSStatus='Planned'|'Active'|'Done'|'Paused';
export interface CreatorOSRecord{id:string;title:string;detail:string;status:CreatorOSStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface CreatorOSSettings{enabled:boolean;compact:boolean;defaultStatus:CreatorOSStatus;accent:string;}
