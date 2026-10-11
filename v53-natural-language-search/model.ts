export type NaturalLanguageSearchStatus='Planned'|'Active'|'Done'|'Paused';
export interface NaturalLanguageSearchRecord{id:string;title:string;detail:string;status:NaturalLanguageSearchStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface NaturalLanguageSearchSettings{enabled:boolean;compact:boolean;defaultStatus:NaturalLanguageSearchStatus;accent:string;}
