export type PlatformMarketplaceStatus='Planned'|'Active'|'Done'|'Paused';
export interface PlatformMarketplaceRecord{id:string;title:string;detail:string;status:PlatformMarketplaceStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface PlatformMarketplaceSettings{enabled:boolean;compact:boolean;defaultStatus:PlatformMarketplaceStatus;accent:string;}
