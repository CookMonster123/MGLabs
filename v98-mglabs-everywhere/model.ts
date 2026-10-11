export type MGLabsEverywhereStatus='Planned'|'Active'|'Done'|'Paused';
export interface MGLabsEverywhereRecord{id:string;title:string;detail:string;status:MGLabsEverywhereStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface MGLabsEverywhereSettings{enabled:boolean;compact:boolean;defaultStatus:MGLabsEverywhereStatus;accent:string;}
