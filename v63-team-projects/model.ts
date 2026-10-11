export type TeamProjectsStatus='Planned'|'Active'|'Done'|'Paused';
export interface TeamProjectsRecord{id:string;title:string;detail:string;status:TeamProjectsStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface TeamProjectsSettings{enabled:boolean;compact:boolean;defaultStatus:TeamProjectsStatus;accent:string;}
