export type ContextMemoryStatus='Planned'|'Active'|'Done'|'Paused';
export interface ContextMemoryRecord{id:string;title:string;detail:string;status:ContextMemoryStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface ContextMemorySettings{enabled:boolean;compact:boolean;defaultStatus:ContextMemoryStatus;accent:string;}
