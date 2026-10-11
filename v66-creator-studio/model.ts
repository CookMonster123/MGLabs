export type CreatorStudioStatus='Planned'|'Active'|'Done'|'Paused';
export interface CreatorStudioRecord{id:string;title:string;detail:string;status:CreatorStudioStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface CreatorStudioSettings{enabled:boolean;compact:boolean;defaultStatus:CreatorStudioStatus;accent:string;}
