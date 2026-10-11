export type CustomDashboardStatus='Planned'|'Active'|'Done'|'Paused';
export interface CustomDashboardRecord{id:string;title:string;detail:string;status:CustomDashboardStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface CustomDashboardSettings{enabled:boolean;compact:boolean;defaultStatus:CustomDashboardStatus;accent:string;}
