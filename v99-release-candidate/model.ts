export type ReleaseCandidateStatus='Planned'|'Active'|'Done'|'Paused';
export interface ReleaseCandidateRecord{id:string;title:string;detail:string;status:ReleaseCandidateStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface ReleaseCandidateSettings{enabled:boolean;compact:boolean;defaultStatus:ReleaseCandidateStatus;accent:string;}
