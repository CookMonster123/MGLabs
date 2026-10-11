export type PersonalSearchStatus='Planned'|'Active'|'Done'|'Paused';
export interface PersonalSearchRecord{id:string;title:string;detail:string;status:PersonalSearchStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface PersonalSearchSettings{enabled:boolean;compact:boolean;defaultStatus:PersonalSearchStatus;accent:string;}
