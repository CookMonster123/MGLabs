export type MGLabsStore20Status='Planned'|'Active'|'Done'|'Paused';
export interface MGLabsStore20Record{id:string;title:string;detail:string;status:MGLabsStore20Status;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface MGLabsStore20Settings{enabled:boolean;compact:boolean;defaultStatus:MGLabsStore20Status;accent:string;}
