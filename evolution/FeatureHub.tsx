import {useMemo,useState} from 'react';
import {featureRegistry, CURRENT_VERSION, CURRENT_NAME} from './registry';

export default function FeatureHub(){
 const [query,setQuery]=useState('');
 const [category,setCategory]=useState('All');
 const [selected,setSelected]=useState(featureRegistry[featureRegistry.length-1]?.id||'');
 const cats=['All',...Array.from(new Set(featureRegistry.map(x=>x.category)))];
 const list=useMemo(()=>featureRegistry.filter(x=>(category==='All'||x.category===category)&&(`${x.title} ${x.description}`.toLowerCase().includes(query.toLowerCase()))),[query,category]);
 const active=featureRegistry.find(x=>x.id===selected)||list[0]||featureRegistry[0];
 const Active=active?.component;
 return <div className="page evolution-hub">
  <section className="evo-hero"><div><span>MGLABS EVOLUTION</span><h1>v{CURRENT_VERSION} · {CURRENT_NAME}</h1><p>{featureRegistry.length} substantial cumulative feature modules installed since v31.</p></div><b>{featureRegistry.length}</b></section>
  <div className="evo-toolbar"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search features…"/><select value={category} onChange={e=>setCategory(e.target.value)}>{cats.map(x=><option key={x}>{x}</option>)}</select></div>
  <div className="evo-layout"><aside>{list.map(x=><button className={active?.id===x.id?'active':''} onClick={()=>setSelected(x.id)} key={x.id}><span>v{x.version}</span><b>{x.title}</b><small>{x.category}</small></button>)}</aside><main>{Active?<Active/>:<div className="evo-empty">No matching module.</div>}</main></div>
 </div>
}
