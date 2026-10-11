import {useMemo,useState} from 'react';
import {useNotesFilesRecords} from './hooks';
import {createRecord,exportFeatureData} from './service';
import {metadata} from './metadata';
import './styles.css';
const helper='Use detail for note text, file names, folders, or tags.';
const nextStatus=(s:string)=>s==='Planned'?'Active':s==='Active'?'Done':s==='Done'?'Paused':'Planned';
export default function NotesFilesFeature(){
 const {records,setRecords,stats}=useNotesFilesRecords(); const [title,setTitle]=useState(''); const [detail,setDetail]=useState(''); const [query,setQuery]=useState('');
 const visible=useMemo(()=>records.filter(x=>(x.title+' '+x.detail+' '+x.tags.join(' ')).toLowerCase().includes(query.toLowerCase())),[records,query]);
 const add=()=>{if(!title.trim())return;setRecords([createRecord(title.trim(),detail.trim()),...records]);setTitle('');setDetail('')};
 return <section className="feature-module v33-notes-files"><div className="fm-head"><div><span>VERSION 33 · {metadata.category.toUpperCase()}</span><h2>{metadata.title}</h2><p>{metadata.description}</p></div><div className="fm-badge">{metadata.kind}</div></div><p className="fm-helper">{helper}</p>
 <div className="fm-form"><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New Notes & Files item…"/><input value={detail} onChange={e=>setDetail(e.target.value)} placeholder="Details / notes…"/><button onClick={add}>Create</button></div>
 <div className="fm-stats"><div><b>{stats.total}</b><span>Total records</span></div><div><b>{stats.active}</b><span>Active</span></div><div><b>{stats.done}</b><span>Done</span></div></div>
 <input className="fm-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Filter this module…"/>
 {visible.length?<div className="fm-list">{visible.map(x=><article className="fm-item" key={x.id}><div><b>{x.title}</b><small>{x.detail||'No details yet'} · {x.status}</small><div className="fm-progress"><i style={{width:`${Math.max(4,Math.min(100,x.metric||(33%101)))}%`}}/></div></div><div className="fm-actions"><button onClick={()=>setRecords(records.map(r=>r.id===x.id?{...r,status:nextStatus(r.status) as any,updatedAt:new Date().toISOString()}:r))}>Status</button><button onClick={()=>setRecords(records.filter(r=>r.id!==x.id))}>Delete</button></div></article>)}</div>:<div className="fm-empty">No Notes & Files records yet. Create the first one above.</div>}
 <div className="fm-actions fm-bottom"><button onClick={exportFeatureData}>Export module data</button><button onClick={()=>{if(confirm('Clear this module?'))setRecords([])}}>Clear</button></div></section>
}
