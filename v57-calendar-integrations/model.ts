export type CalendarIntegrationsStatus='Planned'|'Active'|'Done'|'Paused';
export interface CalendarIntegrationsRecord{id:string;title:string;detail:string;status:CalendarIntegrationsStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface CalendarIntegrationsSettings{enabled:boolean;compact:boolean;defaultStatus:CalendarIntegrationsStatus;accent:string;}
