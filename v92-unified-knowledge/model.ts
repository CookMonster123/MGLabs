export type UnifiedKnowledgeStatus='Planned'|'Active'|'Done'|'Paused';
export interface UnifiedKnowledgeRecord{id:string;title:string;detail:string;status:UnifiedKnowledgeStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface UnifiedKnowledgeSettings{enabled:boolean;compact:boolean;defaultStatus:UnifiedKnowledgeStatus;accent:string;}
