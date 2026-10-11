export type AdvancedAnalyticsStatus='Planned'|'Active'|'Done'|'Paused';
export interface AdvancedAnalyticsRecord{id:string;title:string;detail:string;status:AdvancedAnalyticsStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface AdvancedAnalyticsSettings{enabled:boolean;compact:boolean;defaultStatus:AdvancedAnalyticsStatus;accent:string;}
