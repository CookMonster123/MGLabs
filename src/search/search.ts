import apps from '../apps/catalog/apps.json';
import games from '../games/catalog/games.json';

export type SearchResult = {
  type: 'App' | 'Game';
  id: string;
  title: string;
  subtitle: string;
  route?: string;
};

export function searchAll(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const appResults = (apps as any[])
    .filter(a => `${a.name} ${a.category} ${a.description}`.toLowerCase().includes(q))
    .map(a => ({type:'App' as const,id:a.id,title:a.name,subtitle:a.category,route:a.route}));
  const gameResults = (games as any[])
    .filter(g => `${g.name} ${g.category} ${g.description} ${(g.tags||[]).join(' ')}`.toLowerCase().includes(q))
    .map(g => ({type:'Game' as const,id:g.id,title:g.name,subtitle:g.category,route:'/arcade'}));
  return [...appResults, ...gameResults];
}
