export type CopilotOSStatus='Planned'|'Active'|'Done'|'Paused';
export interface CopilotOSRecord{id:string;title:string;detail:string;status:CopilotOSStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface CopilotOSSettings{enabled:boolean;compact:boolean;defaultStatus:CopilotOSStatus;accent:string;}
