export type AdaptiveScheduleStatus='Planned'|'Active'|'Done'|'Paused';
export interface AdaptiveScheduleRecord{id:string;title:string;detail:string;status:AdaptiveScheduleStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface AdaptiveScheduleSettings{enabled:boolean;compact:boolean;defaultStatus:AdaptiveScheduleStatus;accent:string;}
