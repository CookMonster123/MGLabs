export type WorkloadBalancerStatus='Planned'|'Active'|'Done'|'Paused';
export interface WorkloadBalancerRecord{id:string;title:string;detail:string;status:WorkloadBalancerStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface WorkloadBalancerSettings{enabled:boolean;compact:boolean;defaultStatus:WorkloadBalancerStatus;accent:string;}
