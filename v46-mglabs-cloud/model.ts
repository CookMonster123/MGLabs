export type MGLabsCloudStatus='Planned'|'Active'|'Done'|'Paused';
export interface MGLabsCloudRecord{id:string;title:string;detail:string;status:MGLabsCloudStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface MGLabsCloudSettings{enabled:boolean;compact:boolean;defaultStatus:MGLabsCloudStatus;accent:string;}
