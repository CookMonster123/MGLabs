export type AdaptivePlannerStatus='Planned'|'Active'|'Done'|'Paused';
export interface AdaptivePlannerRecord{id:string;title:string;detail:string;status:AdaptivePlannerStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface AdaptivePlannerSettings{enabled:boolean;compact:boolean;defaultStatus:AdaptivePlannerStatus;accent:string;}
