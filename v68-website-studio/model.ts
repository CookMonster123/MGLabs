export type WebsiteStudioStatus='Planned'|'Active'|'Done'|'Paused';
export interface WebsiteStudioRecord{id:string;title:string;detail:string;status:WebsiteStudioStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface WebsiteStudioSettings{enabled:boolean;compact:boolean;defaultStatus:WebsiteStudioStatus;accent:string;}
