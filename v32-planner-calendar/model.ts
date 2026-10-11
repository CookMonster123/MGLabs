export type PlannerCalendarStatus='Planned'|'Active'|'Done'|'Paused';
export interface PlannerCalendarRecord{id:string;title:string;detail:string;status:PlannerCalendarStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface PlannerCalendarSettings{enabled:boolean;compact:boolean;defaultStatus:PlannerCalendarStatus;accent:string;}
