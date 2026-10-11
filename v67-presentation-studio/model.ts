export type PresentationStudioStatus='Planned'|'Active'|'Done'|'Paused';
export interface PresentationStudioRecord{id:string;title:string;detail:string;status:PresentationStudioStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface PresentationStudioSettings{enabled:boolean;compact:boolean;defaultStatus:PresentationStudioStatus;accent:string;}
