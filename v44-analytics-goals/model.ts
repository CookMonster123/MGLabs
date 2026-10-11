export type AnalyticsGoalsStatus='Planned'|'Active'|'Done'|'Paused';
export interface AnalyticsGoalsRecord{id:string;title:string;detail:string;status:AnalyticsGoalsStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface AnalyticsGoalsSettings{enabled:boolean;compact:boolean;defaultStatus:AnalyticsGoalsStatus;accent:string;}
