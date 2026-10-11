import apps from '../apps/catalog/apps.json';

export type SearchResult = {
  type: 'App';
  id: string;
  title: string;
  subtitle: string;
  route?: string;
};

export function searchAll(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return (apps as any[])
    .filter(a => `${a.name} ${a.category} ${a.description}`.toLowerCase().includes(q))
    .map(a => ({type:'App' as const,id:a.id,title:a.name,subtitle:a.category,route:a.route}));
}
