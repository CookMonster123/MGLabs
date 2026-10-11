export type SchoolModeStatus='Planned'|'Active'|'Done'|'Paused';
export interface SchoolModeRecord{id:string;title:string;detail:string;status:SchoolModeStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface SchoolModeSettings{enabled:boolean;compact:boolean;defaultStatus:SchoolModeStatus;accent:string;}
