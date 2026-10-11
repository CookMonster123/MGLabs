export type KnowledgeGraphStatus='Planned'|'Active'|'Done'|'Paused';
export interface KnowledgeGraphRecord{id:string;title:string;detail:string;status:KnowledgeGraphStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface KnowledgeGraphSettings{enabled:boolean;compact:boolean;defaultStatus:KnowledgeGraphStatus;accent:string;}
