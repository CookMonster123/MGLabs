export type AIDailyCoachStatus='Planned'|'Active'|'Done'|'Paused';
export interface AIDailyCoachRecord{id:string;title:string;detail:string;status:AIDailyCoachStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface AIDailyCoachSettings{enabled:boolean;compact:boolean;defaultStatus:AIDailyCoachStatus;accent:string;}
