export type CinematicThemes20Status='Planned'|'Active'|'Done'|'Paused';
export interface CinematicThemes20Record{id:string;title:string;detail:string;status:CinematicThemes20Status;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface CinematicThemes20Settings{enabled:boolean;compact:boolean;defaultStatus:CinematicThemes20Status;accent:string;}
