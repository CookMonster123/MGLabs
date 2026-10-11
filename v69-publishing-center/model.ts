export type PublishingCenterStatus='Planned'|'Active'|'Done'|'Paused';
export interface PublishingCenterRecord{id:string;title:string;detail:string;status:PublishingCenterStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface PublishingCenterSettings{enabled:boolean;compact:boolean;defaultStatus:PublishingCenterStatus;accent:string;}
