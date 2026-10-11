import {useEffect,useMemo,useState} from 'react';
import retroGames from './retro-public-games.json';
import MetroRush from './components/MetroRush';
import VoxelFrontier from './components/VoxelFrontier';
import {ReactionGrid,NumberSprint,MemoryMatch} from './components/QuickGames';
import {TapRush,PatternRecall,ColorRush} from './components/ExtraGames';
import GameBoundary from './components/GameBoundary';
import appCatalog from './apps/catalog/apps.json';
import gameCatalog from './games/catalog/games.json';
import achievements from './achievements/achievements.json';
import flags from './system/feature-flags.json';
import Top30Update from './components/common/Top30Update';
import FourthAndPixel from './components/FourthAndPixel';
import LifePath from './components/LifePath';
import RemixVault from './components/RemixVault';

type Page =
  | 'Home' | 'Launchpad' | 'Apps' | 'Arcade' | 'Multiplayer' | 'Retro Vault' | 'Play'
  | 'BrightPath' | 'CodeCoach' | 'ProjectForge' | 'Device Lab'
  | 'Community' | 'Eaglercraft' | 'Gridiron' | 'LifeSim' | 'Remix Vault' | 'CareerQuest' | 'Portfolio' | 'School Tools'
  | 'Creative Lab' | 'Labs Store' | 'Developer' | 'Settings';

type RecentItem={type:'App'|'Game'|'Tool';name:string;at:number};
type ProjectTask={id:number;text:string,status:'Backlog'|'To Do'|'In Progress'|'Review'|'Done'};
type Project={id:number;name:string;description:string;template:string;priority:string;due:string;tasks:ProjectTask[]};

type BuiltGame={
  id:string;name:string;category:string;difficulty:string;time:string;players:string;description:string;component:any
};

const pagePath:Record<Page,string>={
  Home:'/',Launchpad:'/launchpad',Apps:'/apps',Arcade:'/games',Multiplayer:'/multiplayer','Retro Vault':'/retro-vault',Play:'/play',
  BrightPath:'/brightpath',CodeCoach:'/codecoach',ProjectForge:'/projectforge','Device Lab':'/device-lab',Community:'/community',Eaglercraft:'/eaglercraft',Gridiron:'/gridiron',LifeSim:'/life-sim','Remix Vault':'/remix-vault',
  CareerQuest:'/careerquest',Portfolio:'/portfolio','School Tools':'/school-tools','Creative Lab':'/creative-lab','Labs Store':'/store',Developer:'/developer',Settings:'/settings'
};
const pathPage=new Map(Object.entries(pagePath).map(([page,path])=>[path,page as Page]));
const pageFromPath=():Page=>pathPage.get(window.location.pathname.replace(/\/$/,'')||'/')||'Home';

const MEGA_COUNT=1457;
const themes=['Dark','Light','Neon','Ocean','Sunset','Forest','Cyberpunk','Galaxy','Midnight','Aurora','Arctic','Volcano','Retro Arcade','Matrix','Purple Storm','Emerald','Synthwave','Blackout','Cherry Blossom','Sakura Night','Bamboo Garden','Rainy City','Mountain Dawn','Golden Autumn','Winter Snow','Spring Bloom','Summer Glow','Moonlight Garden','Lavender Sky','Desert Wind','Tropical Night','Storm Horizon','Emerald Forest','Waterfall Mist','Purple Dream','Ice Blue','Crimson Night','Electric Lime','Solar Flare','Obsidian Gold','Space Dust','Skyline','Silver Tech','Holographic','Deep Sea','Frosted Glass','Royal Blue','Fire and Ice','Halloween','Christmas','New Year','Valentine','Back to School','Spring Festival','Summer Break','Fall Campus','Sakura Sunrise','Northern Lights','Moonlit Snow','Digital Rain','Ember Night','Cloud Nine','Cosmic Garden','Blue Hour','Cafe Night','Circuit Rose','Deep Space','Neon Tokyo'];
const seasonalThemes:{months:number[],theme:string}[]=[
  {months:[9,10],theme:'Golden Autumn'},
  {months:[11,0],theme:'Winter Snow'},
  {months:[1],theme:'Valentine'},
  {months:[2,3],theme:'Cherry Blossom'},
  {months:[4],theme:'Spring Bloom'},
  {months:[5,6,7],theme:'Summer Glow'},
  {months:[8],theme:'Back to School'}
];


const themeMoods:Record<string,string>={
  'Dark':'Classic / Focused','Light':'Clean / Bright','Neon':'Electric / Bold','Ocean':'Calm / Deep','Sunset':'Warm / Creative','Forest':'Natural / Focused','Cyberpunk':'Electric / Futuristic','Galaxy':'Cosmic / Dreamy','Midnight':'Quiet / Deep','Aurora':'Luminous / Dreamy','Arctic':'Cold / Crisp','Volcano':'Hot / Intense','Retro Arcade':'Playful / Neon','Matrix':'Digital / Hacker','Purple Storm':'Moody / Electric','Emerald':'Fresh / Tech','Synthwave':'Retro / Cinematic','Blackout':'Minimal / Focused','Cherry Blossom':'Calm / Cinematic','Sakura Night':'Dreamy / Night','Bamboo Garden':'Natural / Zen','Rainy City':'Moody / Urban','Mountain Dawn':'Fresh / Cinematic','Golden Autumn':'Warm / Seasonal','Winter Snow':'Cool / Seasonal','Spring Bloom':'Fresh / Colorful','Summer Glow':'Bright / Energetic','Moonlight Garden':'Quiet / Cinematic','Lavender Sky':'Soft / Dreamy','Desert Wind':'Warm / Minimal','Tropical Night':'Vibrant / Deep','Storm Horizon':'Dramatic / Moody','Emerald Forest':'Natural / Deep','Waterfall Mist':'Calm / Atmospheric','Purple Dream':'Dreamy / Soft','Ice Blue':'Crisp / Clean','Crimson Night':'Bold / Dark','Electric Lime':'Bright / Tech','Solar Flare':'Hot / Energetic','Obsidian Gold':'Premium / Dark','Space Dust':'Cosmic / Subtle','Skyline':'Urban / Modern','Silver Tech':'Clean / Futuristic','Holographic':'Iridescent / Modern','Deep Sea':'Dark / Calm','Frosted Glass':'Clean / Soft','Royal Blue':'Premium / Bold','Fire and Ice':'Contrast / Dramatic','Halloween':'Spooky / Seasonal','Christmas':'Festive / Winter','New Year':'Celebration / Glow','Valentine':'Warm / Romantic','Back to School':'Fresh / Academic','Spring Festival':'Bright / Seasonal','Summer Break':'Fun / Sunny','Fall Campus':'Warm / Academic','Sakura Sunrise':'Soft / Hopeful','Northern Lights':'Luminous / Epic','Moonlit Snow':'Quiet / Cinematic','Digital Rain':'Tech / Focused','Ember Night':'Warm / Dramatic','Cloud Nine':'Airy / Calm','Cosmic Garden':'Dreamy / Cosmic','Blue Hour':'Modern / Cinematic','Cafe Night':'Cozy / Focused','Circuit Rose':'Tech / Elegant','Deep Space':'Minimal / Cosmic','Neon Tokyo':'Urban / Electric'
};

function CinematicBackground(){
  const particles=Array.from({length:20},(_,i)=>i);
  return <div className="cinematic-bg" aria-hidden="true"><div className="scene-sky"></div><div className="scene-orb orb-a"></div><div className="scene-orb orb-b"></div><div className="scene-moon"></div><div className="scene-clouds"></div><div className="scene-silhouette"></div><div className="scene-grid"></div><div className="scene-particles">{particles.map(i=><i key={i} style={{'--i':i} as any}></i>)}</div><div className="scene-vignette"></div></div>
}

const builtGames:BuiltGame[]=[
  {id:'metro-rush',name:'Metro Rush',category:'Runner',difficulty:'Medium',time:'5–15 min',players:'1 Player',description:'Original three-lane neon runner with keyboard and swipe controls.',component:MetroRush},
  {id:'voxel-frontier',name:'Voxel Frontier',category:'Builder',difficulty:'Easy',time:'5–15 min',players:'1 Player',description:'Original lightweight block building and mining sandbox.',component:VoxelFrontier},
  {id:'reaction-grid',name:'Reaction Grid',category:'Reaction',difficulty:'Medium',time:'Under 2 min',players:'1 Player',description:'Tap the glowing square and chase a new personal best.',component:ReactionGrid},
  {id:'number-sprint',name:'Number Sprint',category:'Educational',difficulty:'Easy',time:'2–5 min',players:'1 Player',description:'Fast arithmetic rounds built for a quick study break.',component:NumberSprint},
  {id:'memory-match',name:'Memory Match',category:'Puzzle',difficulty:'Easy',time:'2–5 min',players:'1 Player',description:'Match all MGLabs pairs in as few moves as possible.',component:MemoryMatch},
  {id:'tap-rush',name:'Tap Rush',category:'Skill',difficulty:'Easy',time:'Under 2 min',players:'1 Player',description:'A 15-second speed challenge with a saved personal best.',component:TapRush},
  {id:'pattern-recall',name:'Pattern Recall',category:'Puzzle',difficulty:'Hard',time:'2–5 min',players:'1 Player',description:'Memorize growing symbol patterns and repeat them correctly.',component:PatternRecall},
  {id:'color-rush',name:'Color Rush',category:'Reaction',difficulty:'Medium',time:'Under 2 min',players:'1 Player',description:'Pick the matching color tile and build a streak.',component:ColorRush}
];

const appPage:Record<string,Page>={
  BrightPath:'BrightPath',CodeCoach:'CodeCoach',ProjectForge:'ProjectForge','Device Lab':'Device Lab',Community:'Community',CareerQuest:'CareerQuest',PortfolioBuilder:'Portfolio','School Tools':'School Tools','Creative Lab':'Creative Lab','MGLabs Arcade':'Arcade','Retro Vault':'Retro Vault','Labs Store':'Labs Store','Fourth & Pixel':'Gridiron','LifePath':'LifeSim',Developer:'Developer'
};

const safeRead=<T,>(key:string,fallback:T):T=>{try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback}catch{return fallback}};
const safeWrite=(key:string,value:any)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
const useJsonCatalog=(url:string)=>{const [data,setData]=useState<any[]>([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('');useEffect(()=>{let alive=true;fetch(url).then(r=>{if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json()}).then(d=>{if(alive)setData(Array.isArray(d)?d:[])}).catch(e=>{if(alive)setError(String(e?.message||e))}).finally(()=>{if(alive)setLoading(false)});return()=>{alive=false}},[url]);return {data,loading,error}};
const recordRecent=(type:RecentItem['type'],name:string)=>{
  const r=safeRead<RecentItem[]>('mg-recent',[]);
  safeWrite('mg-recent',[{type,name,at:Date.now()},...r.filter(x=>x.name!==name)].slice(0,30));
};
const recordGame=(name:string)=>{
  const h=safeRead<string[]>('mg-game-history',[]);
  safeWrite('mg-game-history',[name,...h.filter(x=>x!==name)].slice(0,40));
  recordRecent('Game',name);
};

async function askMGLabsAI(message:string,system:string){
  const res=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,system})});
  const data=await res.json().catch(()=>({}));
  if(!res.ok)throw new Error(data?.error||'AI service is unavailable.');
  return String(data?.reply||'');
}

function useLocalList(key:string){
  const [items,setItems]=useState<string[]>(()=>safeRead<string[]>(key,[]));
  const toggle=(value:string)=>{const next=items.includes(value)?items.filter(x=>x!==value):[...items,value];setItems(next);safeWrite(key,next)};
  return {items,toggle,setItems};
}

function Status({status}:{status:string}){return <span className={`status status-${status.toLowerCase().replaceAll('/','-').replaceAll(' ','-')}`}>{status}</span>}

function CommandPalette({open,onClose,go}:{open:boolean,onClose:()=>void,go:(p:Page)=>void}){
  const [q,setQ]=useState('');
  useEffect(()=>{if(open)setQ('')},[open]);
  if(!open)return null;
  const commands:[string,Page][]=[['Open Home','Home'],['Open Games','Arcade'],['Play MGLabs Originals','Play'],['Open BrightPath','BrightPath'],['Open CodeCoach','CodeCoach'],['Open ProjectForge','ProjectForge'],['Open School Tools','School Tools'],['Open Settings','Settings'],['Open Themes','Settings']];
  const shown=commands.filter(x=>x[0].toLowerCase().includes(q.toLowerCase()));
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="command-palette" onMouseDown={e=>e.stopPropagation()}><div className="command-head"><b>Quick Command</b><span>ESC</span></div><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Type a command…" onKeyDown={e=>e.key==='Escape'&&onClose()}/><div className="command-list">{shown.map(([name,page])=><button key={name} onClick={()=>{go(page);onClose()}}><b>{name}</b><span>{page}</span></button>)}</div></div></div>
}

function GlobalSearch({go}:{go:(p:Page)=>void}){
  const [q,setQ]=useState('');
  const all=[
    ...(appCatalog as any[]).map(a=>({type:'App',title:a.name,subtitle:a.category,page:appPage[a.name]||'Apps' as Page})),
    ...builtGames.map(g=>({type:'Game',title:g.name,subtitle:g.category,page:'Play' as Page,id:g.id})),
    ...themes.map(t=>({type:'Theme',title:t,subtitle:'Theme',page:'Settings' as Page})),
    ...['Settings','Developer','Labs Store','Launchpad','School Tools','CareerQuest'].map(x=>({type:'Tool',title:x,subtitle:'MGLabs',page:x as Page}))
  ];
  const results=q.trim()?all.filter(x=>`${x.title} ${x.subtitle}`.toLowerCase().includes(q.toLowerCase())).slice(0,12):[];
  const open=(r:any)=>{if(r.type==='Game'){safeWrite('mg-selected-game',r.id);recordGame(r.title)}go(r.page);setQ('')};
  return <div className="global-search"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search apps, games, themes…" />{q&&<div className="search-results">{results.length?results.map((r:any)=><button key={r.type+r.title} onClick={()=>open(r)}><b>{r.title}</b><span>{r.type} · {r.subtitle}</span></button>):<div className="empty">No results</div>}</div>}</div>
}

function ExperiencePanel({go}:{go:(p:Page)=>void}){
  const theme=(localStorage.getItem('mg-theme')||'Dark');
  const projects=safeRead<Project[]>('mg-projects',[]);
  const history=safeRead<string[]>('mg-game-history',[]);
  const tasks=safeRead<any[]>('mg-school-tasks',[]);
  const favorites=safeRead<string[]>('mg-favorites',[]);
  const openTasks=tasks.filter(x=>!x.done).length;
  return <section className="experience-grid">
    <article className="experience-card experience-primary"><span>YOUR MGLABS</span><h2>Everything in one place.</h2><p>Pick up school, projects, games and creative work without digging through menus.</p><div className="experience-actions"><button onClick={()=>go('Launchpad')}>Open Launchpad</button><button className="secondary" onClick={()=>go('Settings')}>Customize</button></div></article>
    <button className="experience-card" onClick={()=>go('ProjectForge')}><span>PROJECTS</span><strong>{projects.length}</strong><p>{projects.length?'Keep building what you started.':'Start your first project.'}</p></button>
    <button className="experience-card" onClick={()=>go('School Tools')}><span>SCHOOL</span><strong>{openTasks}</strong><p>{openTasks===1?'open task':'open tasks'}</p></button>
    <button className="experience-card" onClick={()=>go('Arcade')}><span>GAME HISTORY</span><strong>{history.length}</strong><p>recently played</p></button>
    <button className="experience-card" onClick={()=>go('Apps')}><span>FAVORITES</span><strong>{favorites.length}</strong><p>saved apps & games</p></button>
    <button className="experience-card theme-now" onClick={()=>go('Settings')}><span>ATMOSPHERE</span><strong>{theme}</strong><p>tap to change the world</p></button>
  </section>
}

function Home({go}:{go:(p:Page)=>void}){
  const [recent,setRecent]=useState<RecentItem[]>(()=>safeRead<RecentItem[]>('mg-recent',[]).slice(0,6));
  const favs=safeRead<string[]>('mg-favorites',[]);
  const history=safeRead<string[]>('mg-game-history',[]);
  const day=Math.floor(Date.now()/86400000);
  const gameOfDay=builtGames[day%builtGames.length];
  const apps=appCatalog as any[];
  const appOfDay=apps[day%apps.length];
  const projects=safeRead<Project[]>('mg-projects',[]);
  const tasks=safeRead<any[]>('mg-school-tasks',[]);
  const surprise=()=>{const g=builtGames[Math.floor(Math.random()*builtGames.length)];safeWrite('mg-selected-game',g.id);recordGame(g.name);go('Play')};
  return <div className="page">
    <section className="hero">
      <div><span>VERSION 26 · LIFEPATH</span><h1>MGLabs<br/><em>Play. Build. Learn. Together.</em></h1><p>A connected student platform for games, projects, coding, school tools, creativity, careers, hardware simulation and learning.</p><div className="buttons"><button onClick={()=>go('Launchpad')}>Open Launchpad</button><button onClick={()=>go('Arcade')}>Explore Games</button><button className="secondary" onClick={surprise}>Surprise Me</button></div></div>
      <aside><b>MG</b><h2>One connected student workspace</h2><p>{apps.length} major app areas · {builtGames.length} built-in games · {MEGA_COUNT} catalog entries.</p><div className="hero-stats"><div><strong>{favs.length}</strong><span>favorites</span></div><div><strong>{projects.length}</strong><span>projects</span></div><div><strong>{history.length}</strong><span>recent games</span></div></div></aside>
    </section>
    <ExperiencePanel go={go}/>
    <section className="section cinematic-spotlight"><div className="section-head"><div><span>TODAY</span><h2>Daily mix</h2></div><button className="secondary" onClick={()=>go('Settings')}>Change atmosphere</button></div><div className="feature-grid"><button className="feature-card accent-cyan" onClick={()=>{safeWrite('mg-selected-game',gameOfDay.id);recordGame(gameOfDay.name);go('Play')}}><span>GAME OF THE DAY</span><h3>{gameOfDay.name}</h3><p>{gameOfDay.description}</p></button><button className="feature-card accent-blue" onClick={()=>go(appPage[appOfDay.name]||'Apps')}><span>APP OF THE DAY</span><h3>{appOfDay.name}</h3><p>{appOfDay.description}</p></button><button className="feature-card accent-green" onClick={()=>go('School Tools')}><span>DAILY CHALLENGE</span><h3>Finish one important task</h3><p>{tasks.filter(x=>!x.done).length?`${tasks.filter(x=>!x.done).length} school tasks are still open.`:'Add a school task and start a streak.'}</p></button></div></section>
    <section className="section"><div className="section-head"><div><span>CONTINUE</span><h2>Recent activity</h2></div><button className="secondary" onClick={()=>{safeWrite('mg-recent',[]);setRecent([])}}>Clear</button></div><div className="grid">{recent.length?recent.map((r,i)=><article className="card" key={r.name+i}><span>{r.type}</span><h3>{r.name}</h3><p>{new Date(r.at).toLocaleString()}</p></article>):<article className="card empty-card"><h3>No activity yet</h3><p>Open an app or game and it will appear here.</p><button onClick={()=>go('Launchpad')}>Explore MGLabs</button></article>}</div></section>
    <section className="section"><div className="section-head"><div><span>QUICK ACCESS</span><h2>Jump back in</h2></div></div><div className="grid">{['BrightPath','CodeCoach','ProjectForge','School Tools','Creative Lab','CareerQuest'].map(x=><button className="card launch-card" key={x} onClick={()=>go(x as Page)}><span>OPEN</span><h3>{x}</h3><p>Continue in {x}.</p></button>)}</div></section>
    <Top30Update />
  </div>
}

function Launchpad({go}:{go:(p:Page)=>void}){
  const sections:Page[]=['BrightPath','CodeCoach','ProjectForge','Device Lab','Arcade','CareerQuest','Portfolio','School Tools','Creative Lab','Community','Eaglercraft','Gridiron','LifeSim','Remix Vault','Labs Store','Developer'];
  const {items:pins,toggle}=useLocalList('mg-launchpad-pins');
  const sorted=[...sections].sort((a,b)=>Number(pins.includes(b))-Number(pins.includes(a)));
  return <div className="page"><div className="page-title"><div><span>APP LAUNCHER</span><h1>Launchpad</h1><p>Pin the tools you use most and jump straight into them.</p></div></div><div className="grid">{sorted.map(x=><article className="card launch-tile" key={x}><button className="pin" onClick={()=>toggle(x)} aria-label={`Pin ${x}`}>{pins.includes(x)?'★':'☆'}</button><span>{pins.includes(x)?'PINNED':'APP'}</span><h3>{x}</h3><p>Launch {x}.</p><button onClick={()=>{recordRecent('App',x);go(x)}}>Open</button></article>)}</div></div>
}

function Apps({go}:{go:(p:Page)=>void}){
  const[q,setQ]=useState('');const[cat,setCat]=useState('All');
  const cats=['All',...Array.from(new Set((appCatalog as any[]).map(a=>a.category)))];
  const shown=(appCatalog as any[]).filter(a=>(cat==='All'||a.category===cat)&&`${a.name} ${a.description}`.toLowerCase().includes(q.toLowerCase()));
  const {items:favs,toggle}=useLocalList('mg-favorites');
  const open=(a:any)=>{recordRecent('App',a.name);go(appPage[a.name]||'Apps')};
  return <div className="page"><h1>All MGLabs Apps</h1><p>Every major area is labeled honestly by its current build status.</p><div className="tools"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search apps…"/><select value={cat} onChange={e=>setCat(e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</select></div><div className="grid">{shown.map(a=><article className={`card app-card app-${a.id}`} key={a.id}><div className="card-top"><span>{a.category}</span><Status status={a.status}/></div><div className="app-glyph">{a.name.slice(0,2).toUpperCase()}</div><h3>{a.name}</h3><p>{a.description}</p><div className="card-actions"><button onClick={()=>open(a)}>Open</button><button className="secondary" onClick={()=>toggle(a.name)}>{favs.includes(a.name)?'★ Favorited':'☆ Favorite'}</button></div></article>)}</div></div>
}

function Arcade({go}:{go:(p:Page)=>void}){
  const {items:favs,toggle}=useLocalList('mg-favorites');
  const [q,setQ]=useState('');const [category,setCategory]=useState('All');const [status,setStatus]=useState('All');const [collection,setCollection]=useState('All');const [sort,setSort]=useState('A-Z');const [limit,setLimit]=useState(90);
  const {data:games,loading,error}=useJsonCatalog('/data/mega-games.json');
  const categories=['All',...Array.from(new Set(games.map(g=>g.category))).sort()];
  const statuses=['All',...Array.from(new Set(games.map(g=>g.status))).sort()];
  const collections=['All',...Array.from(new Set(games.map(g=>g.sourceCollection||'Other'))).sort()];
  const shown=games.filter(g=>category==='All'||g.category===category).filter(g=>status==='All'||g.status===status).filter(g=>collection==='All'||(g.sourceCollection||'Other')===collection).filter(g=>`${g.name} ${g.category} ${g.description||''} ${(g.tags||[]).join(' ')}`.toLowerCase().includes(q.toLowerCase())).sort((a,b)=>sort==='Z-A'?b.name.localeCompare(a.name):sort==='Category'?a.category.localeCompare(b.category)||a.name.localeCompare(b.name):a.name.localeCompare(b.name));
  const history=safeRead<string[]>('mg-game-history',[]);
  const randomBuilt=()=>{const g=builtGames[Math.floor(Math.random()*builtGames.length)];safeWrite('mg-selected-game',g.id);recordGame(g.name);go('Play')};
  const playBuilt=(id:string,name:string)=>{safeWrite('mg-selected-game',id);recordGame(name);go('Play')};
  return <div className="page"><div className="page-title"><div><span>MEGA ARCADE</span><h1>Games</h1><p>{loading?'Loading the game catalog…':`${games.length} catalog entries`} plus {builtGames.length} playable MGLabs originals.</p></div><button onClick={randomBuilt}>Random Built Game</button></div>{error&&<article className="error-banner">Catalog error: {error}. Built-in games are still available.</article>}
    <section className="section no-top"><div className="section-head"><div><span>PLAY NOW</span><h2>MGLabs Originals</h2></div></div><div className="game-shelf">{builtGames.map(g=><article className="game-card" key={g.id}><div className="game-art"><span>{g.category}</span><b>{g.name.slice(0,1)}</b></div><div><div className="card-top"><span>{g.difficulty}</span><Status status="Built"/></div><h3>{g.name}</h3><p>{g.description}</p><div className="support-row"><span>{g.players}</span><span>{g.time}</span></div><div className="card-actions"><button onClick={()=>playBuilt(g.id,g.name)}>Play</button><button className="secondary" onClick={()=>toggle(g.name)}>{favs.includes(g.name)?'★':'☆'} Favorite</button></div></div></article>)}</div></section>
    <div className="feature-grid"><button className="feature-card" onClick={()=>go('Multiplayer')}><span>MULTIPLAYER</span><h3>2P / 3P / 4P+</h3><p>Browse local, online and planned multiplayer games.</p></button><button className="feature-card" onClick={()=>go('Retro Vault')}><span>RETRO</span><h3>Retro Vault</h3><p>Open-source and classic browser projects with source links.</p></button><button className="feature-card" onClick={randomBuilt}><span>SURPRISE ME</span><h3>Random Game</h3><p>Jump straight into one of the games that is actually built in.</p></button></div>
    <div className="mega-filter-panel"><input value={q} onChange={e=>{setQ(e.target.value);setLimit(90)}} placeholder="Search every game…"/><select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select><select value={status} onChange={e=>setStatus(e.target.value)}>{statuses.map(s=><option key={s}>{s}</option>)}</select><select value={collection} onChange={e=>setCollection(e.target.value)}>{collections.map(c=><option key={c}>{c}</option>)}</select><select value={sort} onChange={e=>setSort(e.target.value)}><option>A-Z</option><option>Z-A</option><option>Category</option></select></div>
    <div className="result-bar"><b>{shown.length}</b> catalog results <button onClick={()=>{setQ('');setCategory('All');setStatus('All');setCollection('All');setSort('A-Z')}}>Reset</button></div>
    <div className="grid">{shown.slice(0,limit).map(g=><article className="card" key={g.id}><div className="card-top"><span>{g.category}</span><Status status={g.status}/></div><h3>{g.name}</h3><p>{g.description}</p><div className="support-row"><span>{g.sourceCollection||g.developer||'Catalog'}</span>{g.license&&<span>{g.license}</span>}</div><div className="card-actions">{g.status==='Built'&&builtGames.some(x=>x.id===g.id)&&<button onClick={()=>playBuilt(g.id,g.name)}>Play</button>}{g.playUrl&&<a href={g.playUrl} target="_blank" rel="noreferrer" onClick={()=>recordGame(g.name)}>Open</a>}{g.sourceUrl&&<a href={g.sourceUrl} target="_blank" rel="noreferrer">Source</a>}{g.status==='Planned'&&<span className="planned-note">Planned</span>}<button className="secondary" onClick={()=>toggle(g.name)}>{favs.includes(g.name)?'★':'☆'}</button></div></article>)}</div>
    {shown.length>limit&&<div className="load-more"><button onClick={()=>setLimit(x=>x+90)}>Load more</button></div>}
    <section className="section"><h2>Recently played</h2><div className="mini-list">{history.length?history.slice(0,10).map(x=><div key={x}><b>{x}</b></div>):<div><b>No games yet</b><p>Play something and it appears here.</p></div>}</div></section>
  </div>
}

function Multiplayer(){
  const [q,setQ]=useState('');const [players,setPlayers]=useState('All');const [mode,setMode]=useState('All');const [category,setCategory]=useState('All');const [status,setStatus]=useState('All');const {items:favs,toggle}=useLocalList('mg-favorites');
  const {data:games,loading,error}=useJsonCatalog('/data/multiplayer-games.json');const categories=['All',...Array.from(new Set(games.map(g=>g.category))).sort()];const statuses=['All',...Array.from(new Set(games.map(g=>g.status))).sort()];const modes=['All','Local','Online','Local + Online'];
  const shown=games.filter(g=>category==='All'||g.category===category).filter(g=>status==='All'||g.status===status).filter(g=>players==='All'||(g.playersMin<=Number(players)&&g.playersMax>=Number(players))).filter(g=>mode==='All'||(mode==='Local'?!!g.local:mode==='Online'?!!g.online:!!g.local&&!!g.online)).filter(g=>`${g.name} ${g.category} ${g.description} ${(g.tags||[]).join(' ')}`.toLowerCase().includes(q.toLowerCase())).sort((a,b)=>a.name.localeCompare(b.name));
  return <div className="page"><h1>Multiplayer Hub</h1><p>{loading?'Loading multiplayer catalog…':'Browse real linked projects and clearly labeled future concepts.'} MGLabs does not fake rooms or active players.</p>{error&&<article className="error-banner">Multiplayer catalog error: {error}</article>}<div className="feature-grid"><article className="feature-card"><span>AVAILABLE / LINKED</span><h3>{games.filter(g=>g.status!=='Planned').length}</h3><p>Source-linked multiplayer projects.</p></article><article className="feature-card"><span>PLANNED</span><h3>{games.filter(g=>g.status==='Planned').length}</h3><p>Future MGLabs ideas, not fake live rooms.</p></article><article className="feature-card"><span>PLAYER MODES</span><h3>2P · 3P · 4P+</h3><p>Filter by player count and local/online capability.</p></article></div><div className="mega-filter-panel"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search multiplayer…"/><select value={players} onChange={e=>setPlayers(e.target.value)}><option>All</option><option>2</option><option>3</option><option>4</option></select><select value={mode} onChange={e=>setMode(e.target.value)}>{modes.map(x=><option key={x}>{x}</option>)}</select><select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(x=><option key={x}>{x}</option>)}</select><select value={status} onChange={e=>setStatus(e.target.value)}>{statuses.map(x=><option key={x}>{x}</option>)}</select></div><div className="result-bar"><b>{shown.length}</b> multiplayer results</div><div className="grid">{shown.slice(0,120).map(g=><article className="card" key={g.id}><div className="card-top"><span>{g.category}</span><Status status={g.status}/></div><h3>{g.name}</h3><p>{g.description}</p><div className="support-row"><span>{g.playersMin===g.playersMax?`${g.playersMin} players`:`${g.playersMin}-${g.playersMax} players`}</span><span>{g.multiplayer}</span>{g.license&&<span>{g.license}</span>}</div><div className="card-actions">{g.playUrl&&<a href={g.playUrl} target="_blank" rel="noreferrer">Open</a>}{g.sourceUrl&&<a href={g.sourceUrl} target="_blank" rel="noreferrer">Source</a>}<button className="secondary" onClick={()=>toggle(g.name)}>{favs.includes(g.name)?'★':'☆'} Favorite</button></div></article>)}</div></div>
}

function RetroVault(){
  const[q,setQ]=useState('');const[cat,setCat]=useState('All');const {items:favs,toggle}=useLocalList('mg-favorites');const cats=['All',...Array.from(new Set((retroGames as any[]).map(g=>g.category)))];const shown=(retroGames as any[]).filter(g=>(cat==='All'||g.category===cat)&&`${g.name} ${g.category} ${g.era} ${g.note}`.toLowerCase().includes(q.toLowerCase()));
  return <div className="page"><h1>Retro Vault</h1><p>Public/open-source projects organized with source and license context where available.</p><div className="tools"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search Retro Vault…"/><select value={cat} onChange={e=>setCat(e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</select></div><div className="grid">{shown.map((g:any)=><article className="card" key={g.name}><span>{g.category}</span><h3>{g.name}</h3><p>{g.note}</p><div className="support-row"><span>{g.era}</span>{g.license&&<span>{g.license}</span>}</div><div className="card-actions">{g.playUrl&&<a href={g.playUrl} target="_blank" rel="noreferrer" onClick={()=>recordGame(g.name)}>Open</a>}{g.sourceUrl&&<a href={g.sourceUrl} target="_blank" rel="noreferrer">Source</a>}<button className="secondary" onClick={()=>toggle(g.name)}>{favs.includes(g.name)?'★':'☆'}</button></div></article>)}</div></div>
}

function Play({go}:{go:(p:Page)=>void}){
  const [selected,setSelected]=useState(()=>safeRead<string>('mg-selected-game',builtGames[0].id));
  const game=builtGames.find(x=>x.id===selected)||builtGames[0];
  const Component=game.component;
  const choose=(id:string)=>{const g=builtGames.find(x=>x.id===id)!;setSelected(id);safeWrite('mg-selected-game',id);recordGame(g.name)};
  return <div className="page"><div className="game-shell-head"><button className="secondary" onClick={()=>go('Arcade')}>← Back to Games</button><div><span>PLAYING</span><h1>{game.name}</h1><p>{game.description}</p></div><select value={selected} onChange={e=>choose(e.target.value)}>{builtGames.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}</select></div><div className="game-meta"><span>{game.category}</span><span>{game.difficulty}</span><span>{game.time}</span><span>{game.players}</span></div><GameBoundary onBack={()=>go('Arcade')}><Component/></GameBoundary><section className="section"><h2>More built games</h2><div className="mini-list">{builtGames.filter(x=>x.id!==selected).map(g=><button key={g.id} onClick={()=>choose(g.id)}><b>{g.name}</b><span>{g.category}</span></button>)}</div></section></div>
}

function BrightPath(){
  const [messages,setMessages]=useState<{role:'user'|'ai',text:string}[]>([{role:'ai',text:'What are you working on today? I can help explain a concept, make a study plan, create practice questions, or help with code.'}]);const [msg,setMsg]=useState('');const [loading,setLoading]=useState(false);const [mode,setMode]=useState('Concept Help');
  const send=async()=>{const text=msg.trim();if(!text||loading)return;setMessages(m=>[...m,{role:'user',text}]);setMsg('');setLoading(true);try{const reply=await askMGLabsAI(text,`You are BrightPath, a student learning assistant. Current mode: ${mode}. Be clear, age-appropriate and useful. Do not pretend you accessed files unless content was provided.`);setMessages(m=>[...m,{role:'ai',text:reply}])}catch(e:any){setMessages(m=>[...m,{role:'ai',text:`AI unavailable: ${e.message}`}])}finally{setLoading(false)}};
  return <div className="page"><div className="page-title"><div><span>LEARNING WORKSPACE</span><h1>BrightPath</h1><p>Concept help, study planning, practice and coding support using the real server AI endpoint when configured.</p></div><Status status="Prototype"/></div><div className="idea-tabs">{['Concept Help','Study Plan','Quiz Generator','Coding Help','Career Connection'].map(x=><button className={mode===x?'active':''} key={x} onClick={()=>setMode(x)}>{x}</button>)}</div><div className="chat">{messages.map((m,i)=><div className={m.role==='ai'?'ai':'user'} key={i}>{m.text}</div>)}{loading&&<div className="ai thinking"><i></i><i></i><i></i> Thinking…</div>}</div><div className="compose"><input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder={`Ask BrightPath · ${mode}`}/><button disabled={loading} onClick={send}>Send</button></div></div>
}

function CodeCoach(){
  const starter='<!doctype html>\n<html>\n  <body>\n    <h1>Hello MGLabs</h1>\n    <button onclick="document.body.classList.toggle(\'active\')">Try me</button>\n  </body>\n</html>';
  const [code,setCode]=useState(()=>localStorage.getItem('mg-code')||starter);const [help,setHelp]=useState('');const [loading,setLoading]=useState(false);const challenge=['Create a button that changes the page','Build a responsive card','Make a score counter','Create a dark/light toggle'][Math.floor(Date.now()/86400000)%4];
  useEffect(()=>localStorage.setItem('mg-code',code),[code]);
  const ask=async()=>{setLoading(true);try{setHelp(await askMGLabsAI(`Review this HTML/CSS/JS code and give beginner-friendly debugging help. Do not execute unsafe code.\n\n${code}`,'You are CodeCoach, a concise coding tutor. Focus on HTML, CSS and JavaScript.'))}catch(e:any){setHelp(`AI unavailable: ${e.message}`)}finally{setLoading(false)}};
  return <div className="page"><h1>CodeCoach</h1><p>Safe browser playground plus a daily coding challenge.</p><article className="challenge-card"><span>DAILY CODING CHALLENGE</span><h3>{challenge}</h3><p>Edit the playground, test it in the preview, then improve it.</p></article><div className="split"><div><div className="section-head"><h2>Editor</h2><button className="secondary" onClick={()=>setCode(starter)}>Reset</button></div><textarea className="code-editor" value={code} onChange={e=>setCode(e.target.value)}/><div className="buttons"><button disabled={loading} onClick={ask}>{loading?'Checking…':'Ask CodeCoach'}</button></div>{help&&<div className="ai-help">{help}</div>}</div><div><h2>Preview</h2><iframe className="preview-frame" title="Code preview" sandbox="allow-scripts" srcDoc={code}/></div></div></div>
}

function ProjectForge(){
  const templates=['Science Fair','Coding Project','School Assignment','Presentation','Website','App','Research Project','Personal Project'];
  const [projects,setProjects]=useState<Project[]>(()=>safeRead<Project[]>('mg-projects',[]));const [active,setActive]=useState<number|null>(()=>projects[0]?.id||null);const [name,setName]=useState('');const [template,setTemplate]=useState(templates[0]);const [task,setTask]=useState('');
  const save=(next:Project[])=>{setProjects(next);safeWrite('mg-projects',next)};
  const create=()=>{if(!name.trim())return;const p:Project={id:Date.now(),name:name.trim(),description:`${template} project`,template,priority:'Medium',due:'',tasks:[]};save([p,...projects]);setActive(p.id);setName('')};
  const project=projects.find(p=>p.id===active)||null;
  const addTask=()=>{if(!project||!task.trim())return;save(projects.map(p=>p.id===project.id?{...p,tasks:[...p.tasks,{id:Date.now(),text:task,status:'To Do'}]}:p));setTask('')};
  const moveTask=(id:number,status:ProjectTask['status'])=>{if(!project)return;save(projects.map(p=>p.id===project.id?{...p,tasks:p.tasks.map(t=>t.id===id?{...t,status}:t)}:p))};
  const cols:ProjectTask['status'][]=['Backlog','To Do','In Progress','Review','Done'];
  const done=project?project.tasks.filter(t=>t.status==='Done').length:0;const progress=project?.tasks.length?Math.round(done/project.tasks.length*100):0;
  return <div className="page"><h1>ProjectForge</h1><p>Create real local projects, use templates, and move tasks through a Kanban board.</p><div className="project-create"><input value={name} onChange={e=>setName(e.target.value)} placeholder="Project name"/><select value={template} onChange={e=>setTemplate(e.target.value)}>{templates.map(x=><option key={x}>{x}</option>)}</select><button onClick={create}>Create Project</button></div>{projects.length>0&&<div className="project-tabs">{projects.map(p=><button className={active===p.id?'active':''} key={p.id} onClick={()=>setActive(p.id)}>{p.name}</button>)}</div>}{project?<><section className="project-overview"><div><span>{project.template}</span><h2>{project.name}</h2><p>{project.description}</p></div><div className="progress-ring"><b>{progress}%</b><span>complete</span></div></section><div className="compose"><input value={task} onChange={e=>setTask(e.target.value)} placeholder="Add a task"/><button onClick={addTask}>Add Task</button></div><section className="section no-top"><h2>Kanban</h2><div className="kanban five">{cols.map(c=><div className="kanban-col" key={c}><h3>{c}</h3>{project.tasks.filter(t=>t.status===c).map(t=><article className="task-card" key={t.id}><b>{t.text}</b><select value={t.status} onChange={e=>moveTask(t.id,e.target.value as ProjectTask['status'])}>{cols.map(x=><option key={x}>{x}</option>)}</select></article>)}{!project.tasks.some(t=>t.status===c)&&<div className="task-card empty">No tasks yet</div>}</div>)}</div></section></>:<article className="empty-state"><h2>No projects yet</h2><p>Choose a template and create your first ProjectForge project.</p></article>}</div>
}

function DeviceLab(){
  const [n,setN]=useState(0);const [history,setHistory]=useState<any[]>([]);const packet={temp:+(23+Math.sin(n)*3).toFixed(1),humidity:Math.round(50+Math.cos(n)*8),light:Math.round(500+Math.sin(n/2)*300),pressure:+(1012+Math.sin(n/3)*4).toFixed(1),co2:Math.round(550+Math.cos(n/2)*120)};
  const generate=()=>{setN(n+1);setHistory(h=>[{...packet,id:n+1,time:new Date().toLocaleTimeString()},...h].slice(0,50))};
  const exportCsv=()=>{if(!history.length)return;const rows=['packet,time,temp_c,humidity_percent,light,pressure_hpa,co2_ppm',...history.map(x=>[x.id,x.time,x.temp,x.humidity,x.light,x.pressure,x.co2].join(','))];const blob=new Blob([rows.join('\n')],{type:'text/csv'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='mglabs-device-lab.csv';a.click();URL.revokeObjectURL(url)};
  return <div className="page device-page"><div className="page-title"><div><span>ENGINEERING DASHBOARD</span><h1>Device Lab</h1><p><b>SIMULATION MODE.</b> Values are generated locally and do not claim a real hardware connection.</p></div><Status status="Prototype"/></div><div className="buttons"><button onClick={generate}>Generate Packet</button><button className="secondary" disabled={!history.length} onClick={exportCsv}>Export CSV</button><button className="secondary" onClick={()=>setHistory([])}>Clear</button></div><div className="metrics"><article><span>TEMPERATURE</span><b>{packet.temp}°C</b></article><article><span>HUMIDITY</span><b>{packet.humidity}%</b></article><article><span>LIGHT</span><b>{packet.light}</b></article><article><span>PRESSURE</span><b>{packet.pressure}</b></article><article><span>CO₂</span><b>{packet.co2} ppm</b></article><article><span>PACKETS</span><b>{history.length}</b></article></div><section className="section"><h2>Engineering missions</h2><div className="grid"><article className="card"><h3>Heat Watch</h3><p>Generate readings and identify when temperature becomes unusually high.</p></article><article className="card"><h3>Air Quality</h3><p>Track CO₂ changes and compare them to your simulated baseline.</p></article><article className="card"><h3>Signal Log</h3><p>Export your packets to CSV and inspect changes over time.</p></article></div></section>{history.length>0&&<section className="section"><h2>Recent telemetry</h2><div className="table telemetry">{history.slice(0,12).map(x=><div key={x.id}><b>#{x.id}</b><span>{x.time}</span><span>{x.temp}°C</span><span>{x.co2} ppm</span></div>)}</div></section>}</div>
}

function Community(){
  const channels=['General','Coding','AI','Hardware','Game Development','School','Projects','Careers','Study Help'];const [channel,setChannel]=useState('General');const [msg,setMsg]=useState('');const [posts,setPosts]=useState(()=>safeRead<any[]>('mg-community-posts',[]));
  const add=()=>{if(!msg.trim())return;const next=[{id:Date.now(),channel,text:msg,likes:0},...posts];setPosts(next);safeWrite('mg-community-posts',next);setMsg('')};const like=(id:number)=>{const next=posts.map(p=>p.id===id?{...p,likes:p.likes+1}:p);setPosts(next);safeWrite('mg-community-posts',next)};
  return <div className="page"><h1>Community Demo</h1><p>Local-only showcase channels. There is no fake multi-user backend or fabricated member count.</p><div className="idea-tabs">{channels.map(c=><button className={channel===c?'active':''} onClick={()=>setChannel(c)} key={c}>{c}</button>)}</div><div className="compose"><input value={msg} onChange={e=>setMsg(e.target.value)} placeholder={`Post in ${channel}`}/><button onClick={add}>Post</button></div><div className="feed">{posts.filter(p=>p.channel===channel).map(p=><article key={p.id}><span>{p.channel}</span><p>{p.text}</p><button className="secondary" onClick={()=>like(p.id)}>♡ {p.likes}</button></article>)}{!posts.some(p=>p.channel===channel)&&<article><b>No posts yet</b><p>Create the first local demo post in this channel.</p></article>}</div></div>
}

const careerData=[
  ['AI Engineer','Programming, math, data','Computer Science, Statistics','Build a small classifier or study assistant'],
  ['Software Engineer','Programming, systems, debugging','Computer Science, Math','Build a useful web app'],
  ['Cybersecurity Analyst','Networking, security, investigation','Computer Science, Cybersecurity','Create a safe security checklist tool'],
  ['Robotics Engineer','Programming, electronics, mechanics','Physics, CS, Engineering','Build a simulated robot controller'],
  ['Game Developer','Programming, design, math','CS, Art, Math','Build a browser game'],
  ['Data Scientist','Statistics, Python, visualization','Statistics, CS, Math','Analyze a public dataset'],
  ['UX Designer','Research, interface design, accessibility','Art, CS, Psychology','Redesign a student tool'],
  ['Cloud Engineer','Linux, networking, deployment','CS, Networking','Deploy a small web service'],
  ['Hardware Engineer','Electronics, circuits, testing','Physics, Engineering','Prototype a sensor dashboard'],
  ['Web Developer','HTML, CSS, JavaScript','CS, Design','Build a responsive website']
];

function LifeSimHub(){
  return <div className="page lifesim-page">
    <section className="lifesim-hero">
      <div><span className="eyebrow">MGLABS ORIGINAL LIFE SIMULATOR</span><h1>LifePath</h1><p>Build a life one choice at a time. Grow up, study, work, manage money, build relationships, chase opportunities and see how your decisions shape the story.</p><div className="buttons"><a className="gridiron-download" href="/lifepath-offline.html" target="_blank" rel="noreferrer">Open Offline Edition</a></div></div>
      <aside><span>CHOICE-DRIVEN</span><b>∞</b><p>Different decisions, different outcomes, different lives.</p></aside>
    </section>
    <section className="lifesim-research"><div><span>DESIGN DIRECTION</span><h2>Two ways to play</h2><p>LifePath is the original MGLabs life simulator. I also added the MIT-licensed BitLife Clone in JavaScript project you provided as a separate playable community project so the two stay clearly distinguished.</p></div><div className="gridiron-feature-list"><span>✓ Original MGLabs LifePath</span><span>✓ MIT-licensed community clone</span><span>✓ Age-by-age progression</span><span>✓ Stats and choices</span><span>✓ Education paths</span><span>✓ Careers</span><span>✓ Relationships</span><span>✓ Random events</span><span>✓ Local browser play</span><span>✓ Source license preserved</span></div></section>
    <section className="bitlife-clone-feature">
      <div><span className="eyebrow">COMMUNITY PROJECT · MIT LICENSE</span><h2>BitLife Clone in JavaScript</h2><p>A simplified, web-based BitLife recreation built with Vanilla JavaScript, HTML and CSS by AaronGulman. It is a separate community project, not the official BitLife game.</p><div className="buttons"><a className="bitlife-clone-play" href="/bitlife-clone/index.html" target="_blank" rel="noreferrer">Open BitLife Clone</a><a className="secondary-link" href="https://github.com/AaronGulman/BitLife-Clone-in-JavaScript" target="_blank" rel="noreferrer">View Source</a></div></div>
      <aside><span>WHAT'S INCLUDED</span><b>MIT</b><p>Character setup, country selection, aging, stats, activities, relationships, assets and early life events. The original LICENSE and README are included with the bundled project.</p></aside>
    </section>
    <LifePath/>
    <section className="retro-bowl-note"><b>Keep the projects separate</b><p>LifePath is an original MGLabs project. The BitLife Clone in JavaScript is an independent open-source recreation by AaronGulman and is not the official BitLife game. MGLabs preserves the included MIT license and attribution.</p></section>
  </div>
}

function CareerQuest(){
  const [saved,setSaved]=useState(()=>safeRead<string[]>('mg-careers',[]));const [compare,setCompare]=useState<string[]>(()=>safeRead<string[]>('mg-career-compare',[]));
  const toggle=(x:string)=>{const n=saved.includes(x)?saved.filter(y=>y!==x):[...saved,x];setSaved(n);safeWrite('mg-careers',n)};const toggleCompare=(x:string)=>{let n=compare.includes(x)?compare.filter(y=>y!==x):[...compare,x].slice(-2);setCompare(n);safeWrite('mg-career-compare',n)};
  return <div className="page"><h1>CareerQuest</h1><p>Explore skills, classes, and beginner projects. Save or compare paths without fabricated salary data.</p><div className="grid">{careerData.map(([name,skills,classes,project])=><article className="card" key={name}><span>CAREER PATH</span><h3>{name}</h3><p><b>Skills:</b> {skills}</p><p><b>Useful classes:</b> {classes}</p><p><b>Starter project:</b> {project}</p><div className="card-actions"><button onClick={()=>toggle(name)}>{saved.includes(name)?'Saved':'Save career'}</button><button className="secondary" onClick={()=>toggleCompare(name)}>{compare.includes(name)?'✓ Compare':'Compare'}</button></div></article>)}</div>{compare.length>0&&<section className="section"><h2>Compare careers</h2><div className="split">{compare.map(name=>{const c=careerData.find(x=>x[0]===name)!;return <article className="portfolio-preview" key={name}><h3>{c[0]}</h3><p><b>Skills:</b> {c[1]}</p><p><b>Classes:</b> {c[2]}</p><p><b>Starter project:</b> {c[3]}</p></article>})}</div></section>}</div>
}

function Portfolio(){
  const [project,setProject]=useState(()=>safeRead<any>('mg-portfolio-project',{title:'MGLabs',headline:'Student developer and builder',problem:'',built:'',tech:'React, TypeScript, Vite',learned:'',award:'',link:''}));
  const update=(k:string,v:string)=>{const n={...project,[k]:v};setProject(n);safeWrite('mg-portfolio-project',n)};
  return <div className="page"><h1>PortfolioBuilder</h1><p>Build a clean project case study and preview it locally.</p><div className="form-grid">{['title','headline','problem','built','tech','learned','award','link'].map(k=><label key={k}><span>{k.toUpperCase()}</span><textarea value={project[k]||''} onChange={e=>update(k,e.target.value)}/></label>)}</div><section className="section"><div className="section-head"><h2>Preview</h2><button className="secondary" onClick={()=>window.print()}>Print / Save PDF</button></div><article className="portfolio-preview print-card"><span>PROJECT CASE STUDY</span><h3>{project.title}</h3><p className="lead">{project.headline}</p><h4>Problem</h4><p>{project.problem||'Add the problem you wanted to solve.'}</p><h4>What I built</h4><p>{project.built||'Describe the project.'}</p><h4>Technology</h4><p>{project.tech}</p><h4>What I learned</h4><p>{project.learned||'Add what you learned.'}</p>{project.award&&<><h4>Award / Achievement</h4><p>{project.award}</p></>}{project.link&&<p><b>Link:</b> {project.link}</p>}</article></section></div>
}

function SchoolTools(){
  const [items,setItems]=useState(()=>safeRead<any[]>('mg-school-tasks',[]));const [text,setText]=useState('');const [notes,setNotes]=useState(()=>localStorage.getItem('mg-school-notes')||'');const [minutes,setMinutes]=useState(25);const [seconds,setSeconds]=useState(0);const [running,setRunning]=useState(false);const [grade,setGrade]=useState({earned:'',possible:''});
  useEffect(()=>{if(!running)return;const t=setInterval(()=>{setSeconds(s=>{if(s>0)return s-1;setMinutes(m=>{if(m<=0){setRunning(false);return 0}return m-1});return 59})},1000);return()=>clearInterval(t)},[running]);
  const add=()=>{if(!text.trim())return;const n=[...items,{id:Date.now(),text,done:false}];setItems(n);safeWrite('mg-school-tasks',n);setText('')};const toggle=(id:number)=>{const n=items.map(x=>x.id===id?{...x,done:!x.done}:x);setItems(n);safeWrite('mg-school-tasks',n)};
  const pct=Number(grade.possible)>0?Math.round(Number(grade.earned)/Number(grade.possible)*1000)/10:null;
  return <div className="page"><h1>School Tools</h1><p>Assignments, study timer, quick notes and a simple grade calculator.</p><div className="school-grid"><section className="tool-panel"><span>HOMEWORK TRACKER</span><div className="compose"><input value={text} onChange={e=>setText(e.target.value)} placeholder="Add assignment or deadline"/><button onClick={add}>Add</button></div><div className="task-list">{items.map(x=><button key={x.id} onClick={()=>toggle(x.id)} className={x.done?'done':''}><span>{x.done?'✓':'○'}</span>{x.text}</button>)}{!items.length&&<p className="muted">No assignments yet.</p>}</div></section><section className="tool-panel"><span>STUDY TIMER</span><div className="timer">{String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}</div><div className="buttons"><button onClick={()=>setRunning(x=>!x)}>{running?'Pause':'Start'}</button><button className="secondary" onClick={()=>{setRunning(false);setMinutes(25);setSeconds(0)}}>Reset</button></div></section><section className="tool-panel"><span>GRADE CALCULATOR</span><div className="form-stack"><input inputMode="decimal" placeholder="Points earned" value={grade.earned} onChange={e=>setGrade({...grade,earned:e.target.value})}/><input inputMode="decimal" placeholder="Points possible" value={grade.possible} onChange={e=>setGrade({...grade,possible:e.target.value})}/></div><div className="grade-result">{pct===null?'—':`${pct}%`}</div></section><section className="tool-panel"><span>QUICK NOTES</span><textarea value={notes} onChange={e=>{setNotes(e.target.value);localStorage.setItem('mg-school-notes',e.target.value)}} placeholder="Write study notes…"/></section></div></div>
}

function CreativeLab(){
  const [name,setName]=useState('MGLabs');const [purpose,setPurpose]=useState('Student technology platform');const [output,setOutput]=useState('');
  const make=(kind:string)=>{const ideas:Record<string,string>={
    'Poster Plan':`${name} poster: bold title, one-sentence purpose, 3 feature cards, one strong screenshot, a short proof point, and a clear call-to-action.`,
    'Presentation Plan':`Slide 1: ${name}. Slide 2: problem. Slide 3: why it matters. Slide 4: demo ${purpose}. Slide 5: features. Slide 6: what changed. Slide 7: next steps.`,
    'Video Script':`Hook: Meet ${name}. Explain the problem in one sentence. Show ${purpose}. Demo three features quickly. End with the biggest benefit and website address.`,
    'Thumbnail Plan':`${name} thumbnail: large readable title, one product screenshot, one strong symbol, very little text, and strong foreground/background contrast.`,
    'Brand Plan':`${name}: define one primary accent, one supporting accent, 2 font weights, 3 card styles, icon rules, and a single short tagline.`,
    'Color Palette':`Use a deep navy base, teal primary accent, electric blue secondary accent, soft green success color, and muted gray-blue text.`,
    'UI Wireframe':`${name} wireframe: header + universal search, hero, quick actions, featured apps, recent activity, primary content grid, status footer.`,
    'Social Post':`I’ve been building ${name}, ${purpose}. The newest update focuses on reliability, games, themes, and making every part actually usable.`,
    'Name Ideas':`${name} Labs · ${name} Studio · ${name} Hub · ${name} Forge · ${name} Nexus`
  };setOutput(ideas[kind]||'')};
  const tools=['Poster Plan','Presentation Plan','Video Script','Thumbnail Plan','Brand Plan','Color Palette','UI Wireframe','Social Post','Name Ideas'];
  return <div className="page"><h1>Creative Lab</h1><p>Functional local planning tools for visuals, presentations, branding and content.</p><div className="form-grid"><label><span>PROJECT NAME</span><input value={name} onChange={e=>setName(e.target.value)}/></label><label><span>PURPOSE</span><textarea value={purpose} onChange={e=>setPurpose(e.target.value)}/></label></div><div className="creative-tools">{tools.map(x=><button key={x} onClick={()=>make(x)}>{x}</button>)}</div><article className="creative-preview"><span>OUTPUT</span><h2>{name}</h2><p>{output||'Choose a tool above to generate a local planning output.'}</p></article></div>
}

function EaglercraftHub(){
  const versions=[
    {id:'1.8.8',kicker:'STABLE / WIDELY DEPLOYED',title:'EaglercraftX 1.8.8 Offline',maker:'lax1dude',accent:'emerald',description:'The 1.8.8 version of Eaglercraft, made by lax1dude. This is currently the most stable and widely deployed version of Eaglercraft.',note:'Keep your offline copy in a safe location, such as a USB drive or a dedicated folder.',downloads:['JavaScript build (ZIP)','WASM-GC build (ZIP)']},
    {id:'1.12.2',kicker:'NEW / IN DEVELOPMENT',title:'Eaglercraft 1.12.2 Offline',maker:'PeytonPlayz585',accent:'violet',description:'The 1.12.2 version of Eaglercraft, made by PeytonPlayz585. This version is new and still under development.',note:'The JavaScript version can be more demanding; the WASM-GC build is the better-performance option described in the source material.',downloads:['JavaScript build (ZIP)','WASM-GC build (ZIP)']},
    {id:'1.5.2',kicker:'ORIGINAL / CLASSIC',title:'Original Eaglercraft 1.5.2 Offline',maker:'lax1dude',accent:'amber',description:'The original 1.5.2 version of Eaglercraft, made by lax1dude. It is known for stability and is still common, but it is much older than the newer versions.',note:'It does not have the same graphics, features, or overall experience as 1.8.8 or 1.12.2. Expect a more classic, older-style version.',downloads:['Offline build (ZIP)']}
  ];
  return <div className="page eagler-page">
    <section className="eagler-hero">
      <div><span className="eyebrow">MGLABS BROWSER MINECRAFT HUB</span><h1>Eaglercraft</h1><p>Organized reference hub for the offline versions you supplied, plus EaglerXServer information. MGLabs keeps each version separate so the older 1.5.2 experience is not presented as if it looks or behaves like 1.8.8 or 1.12.2.</p></div>
      <aside className="eagler-status"><b>3</b><span>offline client versions</span><b>1</b><span>server integration project</span></aside>
    </section>
    <div className="eagler-grid">
      {versions.map(v=><article className={`eagler-card ${v.accent}`} key={v.id}><div className="eagler-card-top"><span>{v.kicker}</span><strong>{v.id}</strong></div><h2>{v.title}</h2><p className="eagler-maker">Made by {v.maker}</p><p>{v.description}</p><div className="eagler-note">{v.note}</div><div className="eagler-downloads">{v.downloads.map(d=><button key={d} disabled title="Offline client files are not bundled into the public MGLabs package.">{d}</button>)}</div><small>Offline client files are kept separate from the public MGLabs package.</small></article>)}
      <article className="eagler-card server"><div className="eagler-card-top"><span>SERVER INTEGRATION</span><strong>SERVER</strong></div><h2>EaglerXServer</h2><p>A Spigot, BungeeCord, and Velocity plugin that allows Eaglercraft 1.5.2, EaglercraftX 1.8, and Eaglercraft 1.12.2 players to join a compatible Java Edition server.</p><div className="eagler-note">The provided description recommends EaglerXServer for server owners currently using EaglerXBungee or EaglerXVelocity.</div><div className="server-tags"><span>Spigot</span><span>BungeeCord</span><span>Velocity</span></div><button className="eagler-source" disabled title="Add the official project URL before publishing.">GitHub source link</button></article>
    </div>
    <section className="eagler-compare"><div><span>1.5.2</span><b>Classic</b><p>Older visuals and fewer modern features.</p></div><div><span>1.8.8</span><b>Stable</b><p>The most established version in the provided description.</p></div><div><span>1.12.2</span><b>Newest</b><p>Newer and still under development.</p></div></section>
    <section className="eagler-legal"><b>Eaglercraft 2023–2026</b><span>Terms of Service · Privacy Policy · DMCA</span><p>This website is not affiliated with Mojang. MGLabs does not bundle the offline client archives in this public package.</p></section>
  </div>
}


function GridironHub(){
  const retroDescription="Retro Bowl is an American style football game created by New Star Games. Are you ready to manage your dream team into victory? Be the boss of your NFL franchise, expand your roster, take care of your press duties to keep your team and fans happy.";
  return <div className="page gridiron-page">
    <section className="retro-bowl-feature">
      <div>
        <span className="eyebrow">CLASSIC FOOTBALL GAME</span>
        <h1>Retro Bowl</h1>
        <p>{retroDescription}</p>
        <div className="buttons">
          <a className="retro-bowl-play" href="/retro-bowl/index.html" target="_blank" rel="noreferrer">Open Retro Bowl</a>
          <a className="secondary gridiron-link" href="/retro-bowl/README.md" target="_blank" rel="noreferrer">Read Source Notes</a>
        </div>
      </div>
      <aside>
        <span>UPLOADED WEB PACKAGE</span>
        <b>RB</b>
        <p>The package you supplied is preserved inside MGLabs with its original LICENSE and README.</p>
        <div className="server-tags"><span>American Football</span><span>Management</span><span>Retro</span></div>
      </aside>
    </section>
    <section className="retro-bowl-note"><b>About this copy</b><p>This entry uses the description included in the Retro Bowl package you supplied. Retro Bowl is created by New Star Games. MGLabs is presenting the uploaded web package as a separate game entry and is not claiming ownership of Retro Bowl.</p></section>
    <section className="gridiron-hero">
      <div><span className="eyebrow">MGLABS ORIGINAL FOOTBALL PROJECT</span><h1>Fourth & Pixel</h1><p>A completely original retro-style American football game for the browser. The idea borrows only broad genre concepts—quick games, play calling, team progression and season management—while using original code, fictional teams, original UI and no Retro Bowl assets or code.</p><div className="buttons"><a className="gridiron-download" href="/fourth-and-pixel-offline.html" download>Download Offline HTML</a><a className="secondary gridiron-link" href="/fourth-and-pixel-offline.html" target="_blank" rel="noreferrer">Open Offline Edition</a></div></div>
      <aside><span>ORIGINAL BUILD</span><b>1.0</b><p>Playable in MGLabs and as one self-contained offline HTML file.</p><div className="server-tags"><span>Career</span><span>Play Calling</span><span>Local Save</span><span>Offline</span></div></aside>
    </section>
    <section className="gridiron-research"><div><span>DESIGN DIRECTION</span><h2>Retro sports-RPG energy, original game</h2><p>Retro Bowl's official description emphasizes retro presentation, roster management, morale/press duties and calling the shots on the field. Fourth & Pixel keeps that general fast-management-plus-football rhythm but uses a different interface, fictional league, different play model, different progression and original code.</p></div><div className="gridiron-feature-list"><span>✓ 4-down drive system</span><span>✓ Run / quick pass / deep pass</span><span>✓ Field goals and punts</span><span>✓ CPU possessions</span><span>✓ 4 quarters</span><span>✓ Season record</span><span>✓ Fan support</span><span>✓ Energy system</span><span>✓ Difficulty selector</span><span>✓ Local browser save</span></div></section>
    <FourthAndPixel/>
    <section className="gridiron-editions">
      <article><span>BUILT IN</span><h3>MGLabs Edition</h3><p>The full playable version above, integrated into the MGLabs cinematic interface.</p><b>Playable now</b></article>
      <article><span>OFFLINE</span><h3>Single-File Edition</h3><p>A self-contained HTML version that can be kept in a folder or USB drive and opened without installing anything.</p><a href="/fourth-and-pixel-offline.html" download>Download HTML</a></article>
      <article><span>CAREER</span><h3>Local Dynasty Save</h3><p>Your weekly record, team energy, support and game state stay in your browser. No fake online account or server required.</p><b>Local only</b></article>
    </section>
    <section className="eagler-legal"><b>Fourth & Pixel © MGLabs</b><span>Original browser game · Fictional teams · No licensed league branding</span><p>Fourth & Pixel is not Retro Bowl and is not affiliated with New Star Games, the NFL, NFLPA, or any professional football team.</p></section>
  </div>
}
function LabsStore({go}:{go:(p:Page)=>void}){
  return <div className="page"><h1>Labs Store</h1><p>App-store style catalog with build status and one-click launch.</p><div className="grid">{(appCatalog as any[]).map(a=><article className="store-card" key={a.id}><div className="app-icon">{a.name.slice(0,2).toUpperCase()}</div><div><div className="card-top"><span>{a.category}</span><Status status={a.status}/></div><h3>{a.name}</h3><p>{a.description}</p><small>Developer: MGLabs · Version 26</small><div className="card-actions"><button onClick={()=>go(appPage[a.name]||'Apps')}>Open</button></div></div></article>)}</div></div>
}

function Developer(){
  return <div className="page"><h1>Developer Mode</h1><p>Technical overview of the current MGLabs Version 26 package.</p><div className="grid"><article className="card"><span>CATALOG</span><h3>{(appCatalog as any[]).length} major apps</h3><p>{(gameCatalog as any[]).length} curated core game records and {MEGA_COUNT} mega-catalog entries.</p></article><article className="card"><span>BUILT GAMES</span><h3>{builtGames.length}</h3><p>Playable local games wired into the game shell.</p></article><article className="card"><span>FLAGS</span><h3>{Object.keys(flags).length}</h3><p>{Object.entries(flags).filter(([,v])=>v).length} currently enabled.</p></article><article className="card"><span>ACHIEVEMENTS</span><h3>{(achievements as any[]).length}</h3><p>Achievement definitions included in the project.</p></article></div><section className="section"><h2>Feature flags</h2><div className="table">{Object.entries(flags).map(([k,v])=><div key={k}><b>{k}</b><span>{v?'ON':'OFF'}</span><span>Public config</span><span>{v?'Enabled':'Planned'}</span></div>)}</div></section></div>
}

function Settings(){
  const [theme,setTheme]=useState(()=>localStorage.getItem('mg-theme')||'Dark');
  const [compact,setCompact]=useState(()=>localStorage.getItem('mg-compact')==='1');
  const [reduced,setReduced]=useState(()=>localStorage.getItem('mg-reduced')==='1');
  const [seasonal,setSeasonal]=useState(()=>localStorage.getItem('mg-seasonal')==='1');
  const [scenes,setScenes]=useState(()=>localStorage.getItem('mg-scenes')!=='0');
  const [intensity,setIntensity]=useState(()=>Number(localStorage.getItem('mg-cinematic-intensity')||'85'));
  const [themeSearch,setThemeSearch]=useState('');
  const [themeGroup,setThemeGroup]=useState('All');
  const {items:favThemes,toggle:toggleTheme}=useLocalList('mg-theme-favorites');
  const applyTheme=(v:string)=>{setTheme(v);localStorage.setItem('mg-theme',v);document.documentElement.dataset.theme=v.toLowerCase().replaceAll(' ','-')};
  const applyExperience=(sceneValue:boolean,intensityValue:number)=>{document.body.classList.toggle('scene-disabled',!sceneValue);document.documentElement.style.setProperty('--cinematic',String(intensityValue/100))};
  useEffect(()=>{let initial=theme;if(seasonal){const m=new Date().getMonth();const hit=seasonalThemes.find(x=>x.months.includes(m));if(hit&&themes.includes(hit.theme))initial=hit.theme}applyTheme(initial);document.body.classList.toggle('compact',compact);document.body.classList.toggle('reduced-motion',reduced);applyExperience(scenes,intensity)},[]);
  const random=()=>applyTheme(themes[Math.floor(Math.random()*themes.length)]);
  const groups:Record<string,string[]>={
    'Cinematic':['Cherry Blossom','Sakura Night','Sakura Sunrise','Rainy City','Mountain Dawn','Moonlight Garden','Northern Lights','Moonlit Snow','Blue Hour','Cafe Night'],
    'Nature':['Ocean','Forest','Bamboo Garden','Golden Autumn','Winter Snow','Spring Bloom','Summer Glow','Emerald Forest','Waterfall Mist','Cloud Nine'],
    'Tech':['Neon','Cyberpunk','Matrix','Silver Tech','Holographic','Digital Rain','Circuit Rose','Neon Tokyo','Electric Lime','Blackout'],
    'Space':['Galaxy','Aurora','Space Dust','Deep Space','Cosmic Garden','Midnight'],
    'Seasonal':['Halloween','Christmas','New Year','Valentine','Back to School','Spring Festival','Summer Break','Fall Campus']
  };
  const visible=themes.filter(x=>(themeGroup==='All'||groups[themeGroup]?.includes(x))&&`${x} ${themeMoods[x]||''}`.toLowerCase().includes(themeSearch.toLowerCase()));
  return <div className="page settings-page"><div className="page-title"><div><span>PERSONALIZE THE WORLD</span><h1>Theme Studio</h1><p>Choose a full atmosphere, control cinematic motion, and save your favorites.</p></div><button onClick={random}>Surprise Me</button></div>
    <section className="theme-hero"><div><span>LIVE ATMOSPHERE</span><h2>{theme}</h2><p>{themeMoods[theme]||'MGLabs Theme'} · {themes.length} total themes</p></div><div className="theme-hero-orb"></div></section>
    <section className="section no-top"><div className="theme-toolbar"><input value={themeSearch} onChange={e=>setThemeSearch(e.target.value)} placeholder="Search themes…"/><select value={themeGroup} onChange={e=>setThemeGroup(e.target.value)}><option>All</option>{Object.keys(groups).map(x=><option key={x}>{x}</option>)}</select><button className="secondary" onClick={()=>setThemeGroup('All')}>Show All</button></div><div className="theme-grid">{visible.map(x=><button key={x} className={`theme-card theme-${x.toLowerCase().replaceAll(' ','-')} ${theme===x?'selected':''}`} onClick={()=>applyTheme(x)}><div className="theme-preview"><i></i><i></i><i></i></div><b>{x}</b><small>{themeMoods[x]||'MGLabs Theme'}</small><span onClick={e=>{e.stopPropagation();toggleTheme(x)}}>{favThemes.includes(x)?'★':'☆'}</span></button>)}</div></section>
    <section className="section"><div className="section-head"><div><span>ATMOSPHERE ENGINE</span><h2>Cinematic controls</h2></div></div><div className="settings-list"><label><span>Current theme</span><select value={theme} onChange={e=>applyTheme(e.target.value)}>{themes.map(x=><option key={x}>{x}</option>)}</select></label><label><span>Animated scenery</span><input type="checkbox" checked={scenes} onChange={e=>{setScenes(e.target.checked);localStorage.setItem('mg-scenes',e.target.checked?'1':'0');applyExperience(e.target.checked,intensity)}}/></label><label className="range-setting"><span>Cinematic intensity <b>{intensity}%</b></span><input type="range" min="20" max="100" value={intensity} onChange={e=>{const v=Number(e.target.value);setIntensity(v);localStorage.setItem('mg-cinematic-intensity',String(v));applyExperience(scenes,v)}}/></label><label><span>Compact cards</span><input type="checkbox" checked={compact} onChange={e=>{setCompact(e.target.checked);localStorage.setItem('mg-compact',e.target.checked?'1':'0');document.body.classList.toggle('compact',e.target.checked)}}/></label><label><span>Reduced motion</span><input type="checkbox" checked={reduced} onChange={e=>{setReduced(e.target.checked);localStorage.setItem('mg-reduced',e.target.checked?'1':'0');document.body.classList.toggle('reduced-motion',e.target.checked)}}/></label><label><span>Auto seasonal theme</span><input type="checkbox" checked={seasonal} onChange={e=>{setSeasonal(e.target.checked);localStorage.setItem('mg-seasonal',e.target.checked?'1':'0')}}/></label><button className="danger" onClick={()=>{if(confirm('Clear all local MGLabs data? This removes projects, scores, favorites and settings.')){localStorage.clear();location.reload()}}}>Clear local data</button></div></section>
  </div>
}

export default function App(){
  const [p,setP]=useState<Page>(()=>pageFromPath());const [palette,setPalette]=useState(false);
  const go=(x:Page)=>{setP(x);recordRecent('Tool',x);const path=pagePath[x];if(window.location.pathname!==path)window.history.pushState({},'',path);scrollTo({top:0,behavior:'smooth'})};
  useEffect(()=>{const onPop=()=>setP(pageFromPath());const onKey=(e:KeyboardEvent)=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setPalette(true)}if(e.key==='Escape')setPalette(false)};window.addEventListener('popstate',onPop);window.addEventListener('keydown',onKey);const theme=localStorage.getItem('mg-theme')||'Dark';document.documentElement.dataset.theme=theme.toLowerCase().replaceAll(' ','-');document.body.classList.toggle('compact',localStorage.getItem('mg-compact')==='1');document.body.classList.toggle('reduced-motion',localStorage.getItem('mg-reduced')==='1');document.body.classList.toggle('scene-disabled',localStorage.getItem('mg-scenes')==='0');document.documentElement.style.setProperty('--cinematic',String(Number(localStorage.getItem('mg-cinematic-intensity')||'85')/100));return()=>{window.removeEventListener('popstate',onPop);window.removeEventListener('keydown',onKey)}},[]);
  const nav:Page[]=['Home','Launchpad','Apps','Arcade','Multiplayer','Retro Vault','Play','BrightPath','CodeCoach','ProjectForge','Device Lab','Community','Eaglercraft','Gridiron','LifeSim','Remix Vault','CareerQuest','Portfolio','School Tools','Creative Lab','Labs Store','Developer','Settings'];
  return <><CinematicBackground/><div className="ambient"><i></i><i></i><i></i><i></i></div><header><button onClick={()=>go('Home')} className="brand"><b>MG</b><span>MGLabs<small>VERSION 26 · CINEMATIC OS</small></span></button><GlobalSearch go={go}/><button className="command-button" onClick={()=>setPalette(true)}>⌘K</button><nav>{nav.map(x=><button className={p===x?'active':''} onClick={()=>go(x)} key={x}>{x}</button>)}</nav></header><main className="page-transition" key={p}>
    {p==='Home'&&<Home go={go}/>} {p==='Launchpad'&&<Launchpad go={go}/>} {p==='Apps'&&<Apps go={go}/>} {p==='Arcade'&&<Arcade go={go}/>} {p==='Multiplayer'&&<Multiplayer/>} {p==='Retro Vault'&&<RetroVault/>} {p==='Play'&&<Play go={go}/>} {p==='BrightPath'&&<BrightPath/>} {p==='CodeCoach'&&<CodeCoach/>} {p==='ProjectForge'&&<ProjectForge/>} {p==='Device Lab'&&<DeviceLab/>} {p==='Community'&&<Community/>} {p==='Eaglercraft'&&<EaglercraftHub/>} {p==='Gridiron'&&<GridironHub/>} {p==='LifeSim'&&<LifeSimHub/>} {p==='Remix Vault'&&<RemixVault/>} {p==='CareerQuest'&&<CareerQuest/>} {p==='Portfolio'&&<Portfolio/>} {p==='School Tools'&&<SchoolTools/>} {p==='Creative Lab'&&<CreativeLab/>} {p==='Labs Store'&&<LabsStore go={go}/>} {p==='Developer'&&<Developer/>} {p==='Settings'&&<Settings/>}
  </main><div className="quick-dock"><button className={p==='Home'?'active':''} onClick={()=>go('Home')}><span>⌂</span>Home</button><button className={p==='Arcade'?'active':''} onClick={()=>go('Arcade')}><span>◈</span>Games</button><button className={p==='Play'?'active':''} onClick={()=>go('Play')}><span>▶</span>Play</button><button className={p==='ProjectForge'?'active':''} onClick={()=>go('ProjectForge')}><span>◇</span>Projects</button><button className={p==='Settings'?'active':''} onClick={()=>go('Settings')}><span>✦</span>Themes</button></div><footer><b>MGLabs Version 26</b><span>Built for students who want to learn, build and create.</span><span>Built · Prototype · Planned · External status system</span></footer><CommandPalette open={palette} onClose={()=>setPalette(false)} go={go}/></>
}
