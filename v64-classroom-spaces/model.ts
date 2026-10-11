export type ClassroomSpacesStatus='Planned'|'Active'|'Done'|'Paused';
export interface ClassroomSpacesRecord{id:string;title:string;detail:string;status:ClassroomSpacesStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface ClassroomSpacesSettings{enabled:boolean;compact:boolean;defaultStatus:ClassroomSpacesStatus;accent:string;}
