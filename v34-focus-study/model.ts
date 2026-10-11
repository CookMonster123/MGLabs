export type FocusStudyStatus='Planned'|'Active'|'Done'|'Paused';
export interface FocusStudyRecord{id:string;title:string;detail:string;status:FocusStudyStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface FocusStudySettings{enabled:boolean;compact:boolean;defaultStatus:FocusStudyStatus;accent:string;}
