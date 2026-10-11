export type PersonalAgentHubStatus='Planned'|'Active'|'Done'|'Paused';
export interface PersonalAgentHubRecord{id:string;title:string;detail:string;status:PersonalAgentHubStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface PersonalAgentHubSettings{enabled:boolean;compact:boolean;defaultStatus:PersonalAgentHubStatus;accent:string;}
