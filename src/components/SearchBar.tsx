import {useMemo,useState} from 'react';
import {searchAll} from '../search/search';

export default function SearchBar(){
  const [q,setQ]=useState('');
  const results=useMemo(()=>searchAll(q),[q]);
  return <div className="global-search">
    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search MGLabs..." />
    {q && <div className="search-results">
      {results.length ? results.slice(0,12).map(r=><div key={`${r.type}-${r.id}`} className="search-result">
        <strong>{r.title}</strong><span>{r.type} · {r.subtitle}</span>
      </div>) : <div className="search-result">No results</div>}
    </div>}
  </div>
}
