export type PluginSDKStatus='Planned'|'Active'|'Done'|'Paused';
export interface PluginSDKRecord{id:string;title:string;detail:string;status:PluginSDKStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface PluginSDKSettings{enabled:boolean;compact:boolean;defaultStatus:PluginSDKStatus;accent:string;}
