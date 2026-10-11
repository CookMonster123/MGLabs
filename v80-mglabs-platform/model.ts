export type MGLabsPlatformStatus='Planned'|'Active'|'Done'|'Paused';
export interface MGLabsPlatformRecord{id:string;title:string;detail:string;status:MGLabsPlatformStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface MGLabsPlatformSettings{enabled:boolean;compact:boolean;defaultStatus:MGLabsPlatformStatus;accent:string;}
