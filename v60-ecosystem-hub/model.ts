export type EcosystemHubStatus='Planned'|'Active'|'Done'|'Paused';
export interface EcosystemHubRecord{id:string;title:string;detail:string;status:EcosystemHubStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface EcosystemHubSettings{enabled:boolean;compact:boolean;defaultStatus:EcosystemHubStatus;accent:string;}
