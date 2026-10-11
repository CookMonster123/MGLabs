export type LearningProfileStatus='Planned'|'Active'|'Done'|'Paused';
export interface LearningProfileRecord{id:string;title:string;detail:string;status:LearningProfileStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface LearningProfileSettings{enabled:boolean;compact:boolean;defaultStatus:LearningProfileStatus;accent:string;}
