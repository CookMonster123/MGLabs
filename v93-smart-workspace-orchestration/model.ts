export type SmartWorkspaceOrchestrationStatus='Planned'|'Active'|'Done'|'Paused';
export interface SmartWorkspaceOrchestrationRecord{id:string;title:string;detail:string;status:SmartWorkspaceOrchestrationStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface SmartWorkspaceOrchestrationSettings{enabled:boolean;compact:boolean;defaultStatus:SmartWorkspaceOrchestrationStatus;accent:string;}
