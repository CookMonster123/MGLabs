export type DataConnectorsStatus='Planned'|'Active'|'Done'|'Paused';
export interface DataConnectorsRecord{id:string;title:string;detail:string;status:DataConnectorsStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface DataConnectorsSettings{enabled:boolean;compact:boolean;defaultStatus:DataConnectorsStatus;accent:string;}
