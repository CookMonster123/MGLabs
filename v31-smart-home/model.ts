export type SmartHomeStatus='Planned'|'Active'|'Done'|'Paused';
export interface SmartHomeRecord{id:string;title:string;detail:string;status:SmartHomeStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface SmartHomeSettings{enabled:boolean;compact:boolean;defaultStatus:SmartHomeStatus;accent:string;}
