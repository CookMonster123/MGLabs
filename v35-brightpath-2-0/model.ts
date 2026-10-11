export type BrightPath20Status='Planned'|'Active'|'Done'|'Paused';
export interface BrightPath20Record{id:string;title:string;detail:string;status:BrightPath20Status;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface BrightPath20Settings{enabled:boolean;compact:boolean;defaultStatus:BrightPath20Status;accent:string;}
