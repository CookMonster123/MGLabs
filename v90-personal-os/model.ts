export type PersonalOSStatus='Planned'|'Active'|'Done'|'Paused';
export interface PersonalOSRecord{id:string;title:string;detail:string;status:PersonalOSStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface PersonalOSSettings{enabled:boolean;compact:boolean;defaultStatus:PersonalOSStatus;accent:string;}
