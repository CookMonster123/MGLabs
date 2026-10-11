export type NotesFilesStatus='Planned'|'Active'|'Done'|'Paused';
export interface NotesFilesRecord{id:string;title:string;detail:string;status:NotesFilesStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface NotesFilesSettings{enabled:boolean;compact:boolean;defaultStatus:NotesFilesStatus;accent:string;}
