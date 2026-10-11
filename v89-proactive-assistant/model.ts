export type ProactiveAssistantStatus='Planned'|'Active'|'Done'|'Paused';
export interface ProactiveAssistantRecord{id:string;title:string;detail:string;status:ProactiveAssistantStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface ProactiveAssistantSettings{enabled:boolean;compact:boolean;defaultStatus:ProactiveAssistantStatus;accent:string;}
