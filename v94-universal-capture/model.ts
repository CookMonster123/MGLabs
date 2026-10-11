export type UniversalCaptureStatus='Planned'|'Active'|'Done'|'Paused';
export interface UniversalCaptureRecord{id:string;title:string;detail:string;status:UniversalCaptureStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface UniversalCaptureSettings{enabled:boolean;compact:boolean;defaultStatus:UniversalCaptureStatus;accent:string;}
