export type PortfolioCareerStatus='Planned'|'Active'|'Done'|'Paused';
export interface PortfolioCareerRecord{id:string;title:string;detail:string;status:PortfolioCareerStatus;priority:number;createdAt:string;updatedAt:string;tags:string[];metric:number;}
export interface PortfolioCareerSettings{enabled:boolean;compact:boolean;defaultStatus:PortfolioCareerStatus;accent:string;}
