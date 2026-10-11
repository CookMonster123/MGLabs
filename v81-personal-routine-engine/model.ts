export type PersonalRoutineEngineStatus='Planned'|'Active'|'Done'|'Paused';
export interface PersonalRoutineEngineRecord{id:string;title:string;detail:string;status:PersonalRoutineEngineStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface PersonalRoutineEngineSettings{enabled:boolean;compact:boolean;defaultStatus:PersonalRoutineEngineStatus;accent:string;}
