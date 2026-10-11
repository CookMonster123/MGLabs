export type ProjectForge20Status='Planned'|'Active'|'Done'|'Paused';
export interface ProjectForge20Record{id:string;title:string;detail:string;status:ProjectForge20Status;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface ProjectForge20Settings{enabled:boolean;compact:boolean;defaultStatus:ProjectForge20Status;accent:string;}
