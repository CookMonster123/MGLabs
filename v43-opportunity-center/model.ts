export type OpportunityCenterStatus='Planned'|'Active'|'Done'|'Paused';
export interface OpportunityCenterRecord{id:string;title:string;detail:string;status:OpportunityCenterStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface OpportunityCenterSettings{enabled:boolean;compact:boolean;defaultStatus:OpportunityCenterStatus;accent:string;}
