export type MGLabsOSStatus='Planned'|'Active'|'Done'|'Paused';
export interface MGLabsOSRecord{id:string;title:string;detail:string;status:MGLabsOSStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface MGLabsOSSettings{enabled:boolean;compact:boolean;defaultStatus:MGLabsOSStatus;accent:string;}
