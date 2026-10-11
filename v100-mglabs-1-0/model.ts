export type MGLabs10Status='Planned'|'Active'|'Done'|'Paused';
export interface MGLabs10Record{id:string;title:string;detail:string;status:MGLabs10Status;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface MGLabs10Settings{enabled:boolean;compact:boolean;defaultStatus:MGLabs10Status;accent:string;}
