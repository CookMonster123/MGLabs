export type PlatformAutomationsStatus='Planned'|'Active'|'Done'|'Paused';
export interface PlatformAutomationsRecord{id:string;title:string;detail:string;status:PlatformAutomationsStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface PlatformAutomationsSettings{enabled:boolean;compact:boolean;defaultStatus:PlatformAutomationsStatus;accent:string;}
