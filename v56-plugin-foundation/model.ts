export type PluginFoundationStatus='Planned'|'Active'|'Done'|'Paused';
export interface PluginFoundationRecord{id:string;title:string;detail:string;status:PluginFoundationStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface PluginFoundationSettings{enabled:boolean;compact:boolean;defaultStatus:PluginFoundationStatus;accent:string;}
