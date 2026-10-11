export type PersonalIntelligenceStatus='Planned'|'Active'|'Done'|'Paused';
export interface PersonalIntelligenceRecord{id:string;title:string;detail:string;status:PersonalIntelligenceStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface PersonalIntelligenceSettings{enabled:boolean;compact:boolean;defaultStatus:PersonalIntelligenceStatus;accent:string;}
