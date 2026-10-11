export type AutomationStatus='Planned'|'Active'|'Done'|'Paused';
export interface AutomationRecord{id:string;title:string;detail:string;status:AutomationStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface AutomationSettings{enabled:boolean;compact:boolean;defaultStatus:AutomationStatus;accent:string;}
