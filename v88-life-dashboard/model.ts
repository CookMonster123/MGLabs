export type LifeDashboardStatus='Planned'|'Active'|'Done'|'Paused';
export interface LifeDashboardRecord{id:string;title:string;detail:string;status:LifeDashboardStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface LifeDashboardSettings{enabled:boolean;compact:boolean;defaultStatus:LifeDashboardStatus;accent:string;}
