export type GoalIntelligenceStatus='Planned'|'Active'|'Done'|'Paused';
export interface GoalIntelligenceRecord{id:string;title:string;detail:string;status:GoalIntelligenceStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface GoalIntelligenceSettings{enabled:boolean;compact:boolean;defaultStatus:GoalIntelligenceStatus;accent:string;}
