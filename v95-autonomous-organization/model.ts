export type AutonomousOrganizationStatus='Planned'|'Active'|'Done'|'Paused';
export interface AutonomousOrganizationRecord{id:string;title:string;detail:string;status:AutonomousOrganizationStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface AutonomousOrganizationSettings{enabled:boolean;compact:boolean;defaultStatus:AutonomousOrganizationStatus;accent:string;}
