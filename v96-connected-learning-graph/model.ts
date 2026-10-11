export type ConnectedLearningGraphStatus='Planned'|'Active'|'Done'|'Paused';
export interface ConnectedLearningGraphRecord{id:string;title:string;detail:string;status:ConnectedLearningGraphStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface ConnectedLearningGraphSettings{enabled:boolean;compact:boolean;defaultStatus:ConnectedLearningGraphStatus;accent:string;}
