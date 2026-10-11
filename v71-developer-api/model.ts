export type DeveloperAPIStatus='Planned'|'Active'|'Done'|'Paused';
export interface DeveloperAPIRecord{id:string;title:string;detail:string;status:DeveloperAPIStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface DeveloperAPISettings{enabled:boolean;compact:boolean;defaultStatus:DeveloperAPIStatus;accent:string;}
