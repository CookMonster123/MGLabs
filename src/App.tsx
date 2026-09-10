
import {useState} from 'react';
import retroGames from './retro-public-games.json';
import publicGames from './public-games.json';
import MetroRush from './components/MetroRush';
import VoxelFrontier from './components/VoxelFrontier';
import appCatalog from './apps/catalog/apps.json';
import gameCatalog from './games/catalog/games.json';
import megaGames from './games/catalog/mega-games.json';
import multiplayerGames from './games/catalog/multiplayer-games.json';
import achievements from './achievements/achievements.json';
import flags from './system/feature-flags.json';

type Page =
  | 'Home' | 'Launchpad' | 'Apps' | 'Arcade' | 'Multiplayer' | 'Retro Vault' | 'Play'
  | 'BrightPath' | 'CodeCoach' | 'ProjectForge' | 'Device Lab'
  | 'Community' | 'CareerQuest' | 'Portfolio' | 'School Tools'
  | 'Creative Lab' | 'Labs Store' | 'Developer' | 'Settings';

type RecentItem={type:'App'|'Game'|'Tool';name:string;at:number};

const safeRead=<T,>(key:string,fallback:T):T=>{
  try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback}catch{return fallback}
};
const safeWrite=(key:string,value:any)=>localStorage.setItem(key,JSON.stringify(value));

function useLocalList(key:string){
  const [items,setItems]=useState<string[]>(()=>safeRead<string[]>(key,[]));
  const toggle=(value:string)=>{
    const next=items.includes(value)?items.filter(x=>x!==value):[...items,value];
    setItems(next);safeWrite(key,next);
  };
  return {items,toggle};
}

function Status({status}:{status:string}){return <span className={`status status-${status.toLowerCase().replaceAll('/','-').replaceAll(' ','-')}`}>{status}</span>}

function GlobalSearch({go}:{go:(p:Page)=>void}){
  const [q,setQ]=useState('');
  const all=[
    ...(appCatalog as any[]).map(a=>({type:'App',title:a.name,subtitle:a.category,page:(a.name==='BrightPath'?'BrightPath':a.name==='CodeCoach'?'CodeCoach':a.name==='ProjectForge'?'ProjectForge':a.name==='Device Lab'?'Device Lab':a.name==='Community'?'Community':a.name==='CareerQuest'?'CareerQuest':a.name==='PortfolioBuilder'?'Portfolio':a.name==='School Tools'?'School Tools':a.name==='Creative Lab'?'Creative Lab':a.name==='MGLabs Arcade'?'Arcade':a.name==='Retro Vault'?'Retro Vault':'Apps') as Page})),
    ...(gameCatalog as any[]).map(g=>({type:'Game',title:g.name,subtitle:g.category,page:(g.status==='Built'?'Play':'Arcade') as Page})),
    ...['Settings','Developer','Labs Store','Launchpad'].map(x=>({type:'Tool',title:x,subtitle:'MGLabs',page:x as Page}))
  ];
  const results=q.trim()?all.filter(x=>`${x.title} ${x.subtitle}`.toLowerCase().includes(q.toLowerCase())).slice(0,10):[];
  return <div className="global-search">
    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search MGLabs..." />
    {q&&<div className="search-results">
      {results.length?results.map(r=><button key={r.type+r.title} onClick={()=>{go(r.page);setQ('')}}><b>{r.title}</b><span>{r.type} · {r.subtitle}</span></button>):<div className="empty">No results</div>}
    </div>}
  </div>
}

function Home({go}:{go:(p:Page)=>void}){
  const recent=safeRead<RecentItem[]>('mg-recent',[]).slice(0,6);
  const favs=safeRead<string[]>('mg-favorites',[]);
  return <div className="page">
    <section className="hero">
      <div>
        <span>MASTER BUILD v13</span>
        <h1>MGLabs<br/><em>Learn. Build. Play.</em></h1>
        <p>A connected student platform with AI learning, coding, projects, hardware, games, career tools, portfolio tools, school tools and creative tools.</p>
        <div className="buttons">
          <button onClick={()=>go('Launchpad')}>Open Launchpad</button>
          <button onClick={()=>go('Arcade')}>Open Arcade</button>
          <button onClick={()=>go('BrightPath')}>Open BrightPath</button>
        </div>
      </div>
      <aside>
        <b>MG</b>
        <h2>{(appCatalog as any[]).length} major app areas</h2>
        <p>{(gameCatalog as any[]).length}+ curated game entries, plus Retro Vault libraries.</p>
        <div className="mini-stat"><strong>{favs.length}</strong><span>favorites</span></div>
      </aside>
    </section>
    <section className="section">
      <div className="section-head"><div><span>CONTINUE</span><h2>Recent activity</h2></div><button onClick={()=>safeWrite('mg-recent',[])}>Clear</button></div>
      <div className="grid">
        {recent.length?recent.map((r,i)=><article className="card" key={r.name+i}><span>{r.type}</span><h3>{r.name}</h3><p>{new Date(r.at).toLocaleString()}</p></article>):<article className="card"><h3>No activity yet</h3><p>Open an app or game and it will appear here.</p></article>}
      </div>
    </section>
  </div>
}

function Launchpad({go}:{go:(p:Page)=>void}){
  const sections:Page[]=['BrightPath','CodeCoach','ProjectForge','Device Lab','Arcade','CareerQuest','Portfolio','School Tools','Creative Lab','Community','Labs Store','Developer'];
  return <div className="page"><h1>Launchpad</h1><p>Jump straight into the main MGLabs workspaces.</p><div className="grid">{sections.map(x=><button className="card launch-card" onClick={()=>go(x)} key={x}><span>OPEN</span><h3>{x}</h3><p>Launch {x}.</p></button>)}</div></div>
}

function Apps(){
  const[q,setQ]=useState('');const[cat,setCat]=useState('All');
  const cats=['All',...Array.from(new Set((appCatalog as any[]).map(a=>a.category)))];
  const shown=(appCatalog as any[]).filter(a=>(cat==='All'||a.category===cat)&&`${a.name} ${a.description}`.toLowerCase().includes(q.toLowerCase()));
  const {items:favs,toggle}=useLocalList('mg-favorites');
  const open=(name:string)=>{const r=safeRead<RecentItem[]>('mg-recent',[]);safeWrite('mg-recent',[{type:'App',name,at:Date.now()},...r.filter(x=>x.name!==name)].slice(0,20))}
  return <div className="page"><h1>All MGLabs Apps</h1><p>Every major area is labeled by its current build status.</p><div className="tools"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search apps..."/><select value={cat} onChange={e=>setCat(e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</select></div><div className="grid">{shown.map(a=><article className="card" key={a.id}><div className="card-top"><span>{a.category}</span><Status status={a.status}/></div><h3>{a.name}</h3><p>{a.description}</p><div className="card-actions"><button onClick={()=>open(a.name)}>Mark opened</button><button className="secondary" onClick={()=>toggle(a.name)}>{favs.includes(a.name)?'★ Favorited':'☆ Favorite'}</button></div></article>)}</div></div>
}


function Arcade({go}:{go:(p:Page)=>void}){
  const {items:favs,toggle}=useLocalList('mg-favorites');
  const [q,setQ]=useState('');
  const [category,setCategory]=useState('All');
  const [status,setStatus]=useState('All');
  const [collection,setCollection]=useState('All');
  const [sort,setSort]=useState('A-Z');
  const games=[...(megaGames as any[])];
  const categories=['All',...Array.from(new Set(games.map(g=>g.category))).sort()];
  const statuses=['All',...Array.from(new Set(games.map(g=>g.status))).sort()];
  const collections=['All',...Array.from(new Set(games.map(g=>g.sourceCollection||'Other'))).sort()];
  const shown=games
    .filter(g=>(category==='All'||g.category===category))
    .filter(g=>(status==='All'||g.status===status))
    .filter(g=>(collection==='All'||(g.sourceCollection||'Other')===collection))
    .filter(g=>`${g.name} ${g.category} ${g.description||''} ${(g.tags||[]).join(' ')}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a,b)=>sort==='Z-A'?b.name.localeCompare(a.name):sort==='Category'?a.category.localeCompare(b.category)||a.name.localeCompare(b.name):a.name.localeCompare(b.name));
  const recent=safeRead<string[]>('mg-game-history',[]);
  return <div className="page">
    <h1>MGLabs Mega Arcade</h1>
    <p>{games.length} catalog entries across original, open-source, classic, retro, racing, sports, puzzle, voxel, action and browser collections.</p>

    <div className="feature-grid">
      <button className="feature-card" onClick={()=>go('Play')}><span>BUILT IN</span><h3>MGLabs Originals</h3><p>Play games that are directly included in the package.</p></button>
      <button className="feature-card" onClick={()=>go('Multiplayer')}><span>MULTIPLAYER</span><h3>2P / 3P / 4P+</h3><p>Sports, party, arena, racing and co-op games.</p></button><button className="feature-card" onClick={()=>go('Retro Vault')}><span>RETRO</span><h3>Retro Vault</h3><p>Classic browser-game projects and older web styles.</p></button>
      <article className="feature-card"><span>MEGA CATALOG</span><h3>{games.length} entries</h3><p>Filter the entire game library below.</p></article>
    </div>

    <div className="mega-filter-panel">
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search every game..." />
      <select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select>
      <select value={status} onChange={e=>setStatus(e.target.value)}>{statuses.map(s=><option key={s}>{s}</option>)}</select>
      <select value={collection} onChange={e=>setCollection(e.target.value)}>{collections.map(c=><option key={c}>{c}</option>)}</select>
      <select value={sort} onChange={e=>setSort(e.target.value)}><option>A-Z</option><option>Z-A</option><option>Category</option></select>
    </div>

    <div className="result-bar"><b>{shown.length}</b> results <button onClick={()=>{setQ('');setCategory('All');setStatus('All');setCollection('All');setSort('A-Z')}}>Reset filters</button></div>

    <div className="grid">
      {shown.map(g=><article className="card" key={g.id}>
        <div className="card-top"><span>{g.category}</span><Status status={g.status}/></div>
        <h3>{g.name}</h3>
        <p>{g.description}</p>
        <div className="support-row"><span>{g.sourceCollection||g.developer}</span>{g.license&&<span>{g.license}</span>}</div>
        <div className="card-actions">
          {g.playUrl&&<a href={g.playUrl} target="_blank" rel="noreferrer">Play</a>}
          {g.sourceUrl&&<a href={g.sourceUrl} target="_blank" rel="noreferrer">Source</a>}
          <button className="secondary" onClick={()=>toggle(g.name)}>{favs.includes(g.name)?'★':'☆'} Favorite</button>
        </div>
      </article>)}
    </div>

    <section className="section"><h2>Recently played</h2><div className="mini-list">{recent.length?recent.slice(0,10).map(x=><div key={x}><b>{x}</b></div>):<div><b>No games yet</b><p>Play something and it appears here.</p></div>}</div></section>
  </div>
}



function Multiplayer(){
  const [q,setQ]=useState('');
  const [players,setPlayers]=useState('All');
  const [mode,setMode]=useState('All');
  const [category,setCategory]=useState('All');
  const [status,setStatus]=useState('All');
  const {items:favs,toggle}=useLocalList('mg-favorites');
  const games=[...(multiplayerGames as any[])];
  const categories=['All',...Array.from(new Set(games.map(g=>g.category))).sort()];
  const statuses=['All',...Array.from(new Set(games.map(g=>g.status))).sort()];
  const modes=['All','Local','Online','Local + Online'];
  const shown=games
    .filter(g=>category==='All'||g.category===category)
    .filter(g=>status==='All'||g.status===status)
    .filter(g=>{
      if(players==='All')return true;
      const n=Number(players);
      return g.playersMin<=n&&g.playersMax>=n;
    })
    .filter(g=>{
      if(mode==='All')return true;
      if(mode==='Local')return !!g.local;
      if(mode==='Online')return !!g.online;
      return !!g.local&&!!g.online;
    })
    .filter(g=>`${g.name} ${g.category} ${g.description} ${(g.tags||[]).join(' ')}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a,b)=>a.name.localeCompare(b.name));
  return <div className="page">
    <h1>Multiplayer Hub</h1>
    <p>2-player, 3-player, 4-player, party, sports, arena, racing, board and co-op games.</p>
    <div className="feature-grid">
      <article className="feature-card"><span>REAL PROJECTS</span><h3>{games.filter(g=>g.status!=='Planned').length}</h3><p>Researched open-source/source-linked multiplayer projects.</p></article>
      <article className="feature-card"><span>CONCEPTS</span><h3>{games.filter(g=>g.status==='Planned').length}</h3><p>Future MGLabs multiplayer game ideas.</p></article>
      <article className="feature-card"><span>PLAYER MODES</span><h3>2P · 3P · 4P+</h3><p>Filter by number of players.</p></article>
    </div>
    <div className="mega-filter-panel">
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search multiplayer games..." />
      <select value={players} onChange={e=>setPlayers(e.target.value)}><option>All</option><option>2</option><option>3</option><option>4</option></select>
      <select value={mode} onChange={e=>setMode(e.target.value)}>{modes.map(x=><option key={x}>{x}</option>)}</select>
      <select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(x=><option key={x}>{x}</option>)}</select>
      <select value={status} onChange={e=>setStatus(e.target.value)}>{statuses.map(x=><option key={x}>{x}</option>)}</select>
    </div>
    <div className="result-bar"><b>{shown.length}</b> multiplayer results</div>
    <div className="grid">
      {shown.map(g=><article className="card" key={g.id}>
        <div className="card-top"><span>{g.category}</span><Status status={g.status}/></div>
        <h3>{g.name}</h3>
        <p>{g.description}</p>
        <div className="support-row">
          <span>{g.playersMin===g.playersMax?`${g.playersMin} players`:`${g.playersMin}-${g.playersMax} players`}</span>
          <span>{g.multiplayer}</span>
          {g.license&&<span>{g.license}</span>}
        </div>
        <div className="card-actions">
          {g.playUrl&&<a href={g.playUrl} target="_blank" rel="noreferrer">Play</a>}
          {g.sourceUrl&&<a href={g.sourceUrl} target="_blank" rel="noreferrer">Source</a>}
          <button className="secondary" onClick={()=>toggle(g.name)}>{favs.includes(g.name)?'★':'☆'} Favorite</button>
        </div>
      </article>)}
    </div>
  </div>
}


function RetroVault(){
  const[q,setQ]=useState('');const[cat,setCat]=useState('All');const {items:favs,toggle}=useLocalList('mg-favorites');
  const cats=['All',...Array.from(new Set((retroGames as any[]).map(g=>g.category)))];
  const shown=(retroGames as any[]).filter(g=>(cat==='All'||g.category===cat)&&`${g.name} ${g.category} ${g.era} ${g.note}`.toLowerCase().includes(q.toLowerCase()));
  const played=(name:string)=>{const h=safeRead<string[]>('mg-game-history',[]);safeWrite('mg-game-history',[name,...h.filter(x=>x!==name)].slice(0,25));const r=safeRead<RecentItem[]>('mg-recent',[]);safeWrite('mg-recent',[{type:'Game',name,at:Date.now()},...r.filter(x=>x.name!==name)].slice(0,20))}
  return <div className="page"><h1>Retro Vault</h1><p>Real public/open-source game projects and libraries organized by category.</p><div className="tools"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search Retro Vault..."/><select value={cat} onChange={e=>setCat(e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</select></div><div className="grid">{shown.map(g=><article className="card" key={g.name}><span>{g.category}</span><h3>{g.name}</h3><p>{g.era}</p><p>{g.note}</p><div className="license-pill">{g.license}</div><div className="card-actions">{g.play&&<a href={g.play} target="_blank" rel="noreferrer" onClick={()=>played(g.name)}>Play</a>}<a href={g.source} target="_blank" rel="noreferrer">Source</a><button className="secondary" onClick={()=>toggle(g.name)}>{favs.includes(g.name)?'★':'☆'} Favorite</button></div></article>)}</div></div>
}

function Play(){
  return <div className="page"><h1>MGLabs Originals</h1><p>Games directly included in the package.</p><MetroRush/><VoxelFrontier/></div>
}

function BrightPath(){
  const [mode,setMode]=useState('Explain');const [subject,setSubject]=useState('General');
  const [t,setT]=useState('');const [m,setM]=useState<string[]>(['BrightPath demo ready. Pick a mode and ask a question.']);
  const modes=['Explain','Teach from scratch','Socratic','Quiz me','Flashcards','Practice','Study guide','Exam review','Coding tutor'];
  const subjects=['General','Algebra 2','Chemistry','World History','AP Seminar','Computer Science','Java','Python','Web Development'];
  const send=()=>{if(!t.trim())return;const reply=`${mode} demo (${subject}): I would break "${t}" into clear steps, then give you a check-for-understanding question.`;setM([...m,t,reply]);setT('')};
  return <div className="page"><h1>BrightPath</h1><p>Expanded learning workspace demo with subject and tutor modes.</p><div className="tools"><select value={mode} onChange={e=>setMode(e.target.value)}>{modes.map(x=><option key={x}>{x}</option>)}</select><select value={subject} onChange={e=>setSubject(e.target.value)}>{subjects.map(x=><option key={x}>{x}</option>)}</select></div><div className="quick-row">{['Simplify','Give example','Make harder','Turn into notes','Create practice'].map(x=><button onClick={()=>setT(x+': ')} key={x}>{x}</button>)}</div><div className="chat">{m.map((x,i)=><div className={i%2?'user':'ai'} key={i}>{x}</div>)}</div><div className="compose"><input value={t} onChange={e=>setT(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask BrightPath..."/><button onClick={send}>Send</button></div></div>
}

function CodeCoach(){
  const [code,setCode]=useState('<h1>Hello MGLabs</h1>\n<p>Edit this HTML.</p>');
  const [out,setOut]=useState(code);
  const challenges=['Build a responsive card','Make a button counter','Create a quiz','Fix a broken loop','Build a navbar','Create a Java class'];
  return <div className="page"><h1>CodeCoach</h1><p>Frontend playground plus coding challenge workspace.</p><div className="split"><div><div className="section-head"><h2>HTML Playground</h2><button onClick={()=>setOut(code)}>Run</button></div><textarea className="code-editor" value={code} onChange={e=>setCode(e.target.value)}/></div><div><h2>Preview</h2><iframe className="preview-frame" srcDoc={out} title="preview"/></div></div><section className="section"><h2>Challenge ladder</h2><div className="grid">{challenges.map((x,i)=><article className="card" key={x}><span>LEVEL {i+1}</span><h3>{x}</h3><p>Open this as a guided coding task.</p><button>Start challenge</button></article>)}</div></section></div>
}

function ProjectForge(){
  const [projects,setProjects]=useState(()=>safeRead<any[]>('mg-projects',[]));const [name,setName]=useState('');
  const add=()=>{if(!name.trim())return;const next=[...projects,{id:Date.now(),name,status:'Planning',tasks:0}];setProjects(next);safeWrite('mg-projects',next);setName('')};
  const cols=['Backlog','In Progress','Testing','Done'];
  return <div className="page"><h1>ProjectForge</h1><p>Project planning, milestones, risk tracking and Kanban.</p><div className="compose"><input value={name} onChange={e=>setName(e.target.value)} placeholder="New project name"/><button onClick={add}>Create project</button></div><div className="grid">{projects.length?projects.map(p=><article className="card" key={p.id}><span>{p.status}</span><h3>{p.name}</h3><p>{p.tasks} tracked tasks</p></article>):<article className="card"><h3>No projects yet</h3><p>Create your first project above.</p></article>}</div><section className="section"><h2>Kanban</h2><div className="kanban">{cols.map(c=><div className="kanban-col" key={c}><h3>{c}</h3><div className="task-card">Sample task</div></div>)}</div></section></div>
}

function DeviceLab(){
  const [n,setN]=useState(0);const [history,setHistory]=useState<any[]>([]);
  const packet={temp:+(23+Math.sin(n)*3).toFixed(1),humidity:Math.round(50+Math.cos(n)*8),light:Math.round(500+Math.sin(n/2)*300),pressure:+(1012+Math.sin(n/3)*4).toFixed(1),co2:Math.round(550+Math.cos(n/2)*120)};
  const generate=()=>{setN(n+1);setHistory(h=>[{...packet,id:n+1},...h].slice(0,8))}
  return <div className="page"><h1>Device Lab</h1><p>Simulated telemetry only in this public package.</p><div className="buttons"><button onClick={generate}>Generate packet</button><button className="secondary" onClick={()=>setHistory([])}>Clear history</button></div><div className="metrics">{[['Temperature',packet.temp+'°C'],['Humidity',packet.humidity+'%'],['Light',packet.light],['Pressure',packet.pressure+' hPa'],['CO₂-equivalent',packet.co2+' ppm'],['Packets',n]].map(x=><article key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></article>)}</div><section className="section"><h2>Recent telemetry</h2><div className="table">{history.map(x=><div key={x.id}><b>Packet {x.id}</b><span>{x.temp}°C</span><span>{x.humidity}% RH</span><span>{x.co2} ppm</span></div>)}</div></section></div>
}

function Community(){
  const channels=['General','Coding','AI','Hardware','Game Development','School','Projects','Careers','Study Help'];
  const [channel,setChannel]=useState('General');const [msg,setMsg]=useState('');const [posts,setPosts]=useState(()=>safeRead<any[]>('mg-community-posts',[]));
  const add=()=>{if(!msg.trim())return;const next=[{id:Date.now(),channel,text:msg},...posts];setPosts(next);safeWrite('mg-community-posts',next);setMsg('')};
  return <div className="page"><h1>Community</h1><p>Local demo channels for project discussions. No real multi-user backend is connected in this package.</p><div className="idea-tabs">{channels.map(c=><button className={channel===c?'active':''} onClick={()=>setChannel(c)} key={c}>{c}</button>)}</div><div className="compose"><input value={msg} onChange={e=>setMsg(e.target.value)} placeholder={`Post in ${channel}`}/><button onClick={add}>Post</button></div><div className="feed">{posts.filter(p=>p.channel===channel).map(p=><article key={p.id}><span>{p.channel}</span><p>{p.text}</p></article>)}</div></div>
}

function CareerQuest(){
  const careers=['AI Engineer','Software Engineer','Cybersecurity Analyst','Robotics Engineer','Game Developer','Data Scientist','Product Designer','Biomedical Engineer'];
  const [saved,setSaved]=useState(()=>safeRead<string[]>('mg-careers',[]));
  const toggle=(x:string)=>{const n=saved.includes(x)?saved.filter(y=>y!==x):[...saved,x];setSaved(n);safeWrite('mg-careers',n)}
  return <div className="page"><h1>CareerQuest</h1><p>Explore careers, map skills and save paths you want to research.</p><div className="grid">{careers.map((x,i)=><article className="card" key={x}><span>PATH {i+1}</span><h3>{x}</h3><p>Explore skills, classes, projects and next steps for this career.</p><button onClick={()=>toggle(x)}>{saved.includes(x)?'Saved':'Save career'}</button></article>)}</div></div>
}

function Portfolio(){
  const [project,setProject]=useState(()=>safeRead('mg-portfolio-project',{title:'MGLabs',problem:'',built:'',tech:'React, TypeScript, Vite',learned:''}));
  const update=(k:string,v:string)=>{const n={...project,[k]:v};setProject(n);safeWrite('mg-portfolio-project',n)};
  return <div className="page"><h1>PortfolioBuilder</h1><p>Draft a project case study and keep it locally in your browser.</p><div className="form-grid">{['title','problem','built','tech','learned'].map(k=><label key={k}><span>{k.toUpperCase()}</span><textarea value={(project as any)[k]||''} onChange={e=>update(k,e.target.value)}/></label>)}</div><section className="section"><h2>Preview</h2><article className="portfolio-preview"><h3>{(project as any).title}</h3><h4>Problem</h4><p>{(project as any).problem||'Add the problem you wanted to solve.'}</p><h4>What I built</h4><p>{(project as any).built||'Describe the project.'}</p><h4>Technology</h4><p>{(project as any).tech}</p><h4>What I learned</h4><p>{(project as any).learned||'Add what you learned.'}</p></article></section></div>
}

function SchoolTools(){
  const [items,setItems]=useState(()=>safeRead<any[]>('mg-school-tasks',[]));const [text,setText]=useState('');
  const add=()=>{if(!text.trim())return;const n=[...items,{id:Date.now(),text,done:false}];setItems(n);safeWrite('mg-school-tasks',n);setText('')};
  const toggle=(id:number)=>{const n=items.map(x=>x.id===id?{...x,done:!x.done}:x);setItems(n);safeWrite('mg-school-tasks',n)};
  return <div className="page"><h1>School Tools</h1><p>Assignments, study planning and simple student organization.</p><div className="compose"><input value={text} onChange={e=>setText(e.target.value)} placeholder="Add assignment or deadline"/><button onClick={add}>Add</button></div><div className="task-list">{items.map(x=><button key={x.id} onClick={()=>toggle(x.id)} className={x.done?'done':''}><span>{x.done?'✓':'○'}</span>{x.text}</button>)}</div><div className="grid"><article className="card"><h3>Exam Calendar</h3><p>Plan upcoming tests and review sessions.</p></article><article className="card"><h3>Rubric Checklist</h3><p>Turn project rubrics into completion checklists.</p></article><article className="card"><h3>AP Review</h3><p>Organize review topics by course and unit.</p></article></div></div>
}

function CreativeLab(){
  const [name,setName]=useState('MGLabs');const [purpose,setPurpose]=useState('Student AI + technology platform');
  return <div className="page"><h1>Creative Lab</h1><p>Quick creative planning workspace.</p><div className="form-grid"><label><span>PROJECT NAME</span><input value={name} onChange={e=>setName(e.target.value)}/></label><label><span>PURPOSE</span><textarea value={purpose} onChange={e=>setPurpose(e.target.value)}/></label></div><article className="creative-preview"><span>BRAND CONCEPT</span><h2>{name}</h2><p>{purpose}</p><div className="buttons"><button>Poster plan</button><button>Video script</button><button>Thumbnail plan</button><button>UI wireframe</button></div></article></div>
}

function LabsStore(){
  return <div className="page"><h1>Labs Store</h1><p>App-store style catalog with build status, privacy notes and related areas.</p><div className="grid">{(appCatalog as any[]).map(a=><article className="store-card" key={a.id}><div className="app-icon">{a.name.slice(0,2).toUpperCase()}</div><div><div className="card-top"><span>{a.category}</span><Status status={a.status}/></div><h3>{a.name}</h3><p>{a.description}</p><small>Developer: MGLabs · Public package demo</small></div></article>)}</div></div>
}

function Developer(){
  return <div className="page"><h1>Developer Mode</h1><p>Technical overview of the public MGLabs package.</p><div className="grid"><article className="card"><span>CATALOG</span><h3>{(appCatalog as any[]).length} major apps</h3><p>{(gameCatalog as any[]).length} curated game entries in the structured catalog.</p></article><article className="card"><span>FLAGS</span><h3>{Object.keys(flags).length} feature flags</h3><p>{Object.entries(flags).filter(([,v])=>v).length} currently enabled in the scaffold.</p></article><article className="card"><span>ACHIEVEMENTS</span><h3>{(achievements as any[]).length} achievements</h3><p>Local-first achievement definitions.</p></article></div><section className="section"><h2>Feature flags</h2><div className="table">{Object.entries(flags).map(([k,v])=><div key={k}><b>{k}</b><span>{v?'ON':'OFF'}</span><span>Public config</span><span>{v?'Enabled':'Planned'}</span></div>)}</div></section></div>
}

function Settings(){
  const [theme,setTheme]=useState(()=>localStorage.getItem('mg-theme')||'Dark');
  const [compact,setCompact]=useState(()=>localStorage.getItem('mg-compact')==='1');
  const applyTheme=(v:string)=>{setTheme(v);localStorage.setItem('mg-theme',v);document.documentElement.dataset.theme=v.toLowerCase()};
  return <div className="page"><h1>Settings</h1><p>Local settings for this public package.</p><div className="settings-list"><label><span>Theme</span><select value={theme} onChange={e=>applyTheme(e.target.value)}><option>Dark</option><option>Light</option></select></label><label><span>Compact cards</span><input type="checkbox" checked={compact} onChange={e=>{setCompact(e.target.checked);localStorage.setItem('mg-compact',e.target.checked?'1':'0');document.body.classList.toggle('compact',e.target.checked)}}/></label><button onClick={()=>{if(confirm('Clear local MGLabs demo data?'))localStorage.clear()}}>Clear local demo data</button></div></div>
}

export default function App(){
  const [p,setP]=useState<Page>('Home');
  const go=(x:Page)=>{setP(x);scrollTo({top:0,behavior:'smooth'})};
  const nav:Page[]=['Home','Launchpad','Apps','Arcade','Multiplayer','Retro Vault','Play','BrightPath','CodeCoach','ProjectForge','Device Lab','Community','CareerQuest','Portfolio','School Tools','Creative Lab','Labs Store','Developer','Settings'];
  return <>
    <header>
      <button onClick={()=>go('Home')} className="brand">MG <span>MGLabs</span></button>
      <GlobalSearch go={go}/>
      <nav>{nav.map(x=><button className={p===x?'active':''} onClick={()=>go(x)} key={x}>{x}</button>)}</nav>
    </header>
    <main>
      {p==='Home'&&<Home go={go}/>}
      {p==='Launchpad'&&<Launchpad go={go}/>}
      {p==='Apps'&&<Apps/>}
      {p==='Arcade'&&<Arcade go={go}/>} {p==='Multiplayer'&&<Multiplayer/>}
      {p==='Retro Vault'&&<RetroVault/>}
      {p==='Play'&&<Play/>}
      {p==='BrightPath'&&<BrightPath/>}
      {p==='CodeCoach'&&<CodeCoach/>}
      {p==='ProjectForge'&&<ProjectForge/>}
      {p==='Device Lab'&&<DeviceLab/>}
      {p==='Community'&&<Community/>}
      {p==='CareerQuest'&&<CareerQuest/>}
      {p==='Portfolio'&&<Portfolio/>}
      {p==='School Tools'&&<SchoolTools/>}
      {p==='Creative Lab'&&<CreativeLab/>}
      {p==='Labs Store'&&<LabsStore/>}
      {p==='Developer'&&<Developer/>}
      {p==='Settings'&&<Settings/>}
    </main>
    <footer>MGLabs v13 Implemented Public Edition · Built / Prototype / Planned / External status system</footer>
  </>
}
