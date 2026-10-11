export type PredictivePlanningStatus='Planned'|'Active'|'Done'|'Paused';
export interface PredictivePlanningRecord{id:string;title:string;detail:string;status:PredictivePlanningStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface PredictivePlanningSettings{enabled:boolean;compact:boolean;defaultStatus:PredictivePlanningStatus;accent:string;}
