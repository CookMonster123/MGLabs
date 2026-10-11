export type MobileEditionStatus='Planned'|'Active'|'Done'|'Paused';
export interface MobileEditionRecord{id:string;title:string;detail:string;status:MobileEditionStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface MobileEditionSettings{enabled:boolean;compact:boolean;defaultStatus:MobileEditionStatus;accent:string;}
