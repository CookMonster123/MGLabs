export type ExtensionGalleryStatus='Planned'|'Active'|'Done'|'Paused';
export interface ExtensionGalleryRecord{id:string;title:string;detail:string;status:ExtensionGalleryStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface ExtensionGallerySettings{enabled:boolean;compact:boolean;defaultStatus:ExtensionGalleryStatus;accent:string;}
