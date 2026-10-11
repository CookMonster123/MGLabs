import FeatureHub from './evolution/FeatureHub';
import './evolution/hub.css';
import {useEffect,useMemo,useState} from 'react';
import appCatalog from './apps/catalog/apps.json';
import achievements from './achievements/achievements.json';
import flags from './system/feature-flags.json';

type Page =
  | 'Home' | 'Launchpad' | 'Apps'
  | 'BrightPath' | 'CodeCoach' | 'ProjectForge' | 'Device Lab'
  | 'Community' | 'CareerQuest' | 'Portfolio' | 'School Tools'
  | 'Creative Lab' | 'Labs Store' | 'Developer' | 'Evolution' | 'Settings';

type RecentItem={type:'App'|'Tool';name:string;at:number};
type ProjectTask={id:number;text:string,status:'Backlog'|'To Do'|'In Progress'|'Review'|'Done'};
type Project={id:number;name:string;description:string;template:string;priority:string;due:string;tasks:ProjectTask[]};


const pagePath:Record<Page,string>={
  Home:'/',Launchpad:'/launchpad',Apps:'/apps',
  BrightPath:'/brightpath',CodeCoach:'/codecoach',ProjectForge:'/projectforge','Device Lab':'/device-lab',
  Community:'/community',CareerQuest:'/careerquest',Portfolio:'/portfolio','School Tools':'/school-tools',
  'Creative Lab':'/creative-lab','Labs Store':'/store',Developer:'/developer',Evolution:'/evolution',Settings:'/settings'
};
const pathPage=new Map(Object.entries(pagePath).map(([page,path])=>[path,page as Page]));
const pageFromPath=():Page=>pathPage.get(window.location.pathname.replace(/\/$/,'')||'/')||'Home';

const themes=['Dark','Light','Neon','Ocean','Sunset','Forest','Cyberpunk','Galaxy','Midnight','Aurora','Arctic','Volcano','Matrix','Purple Storm','Emerald','Synthwave','Blackout','Cherry Blossom','Sakura Night','Bamboo Garden','Rainy City','Mountain Dawn','Golden Autumn','Winter Snow','Spring Bloom','Summer Glow','Moonlight Garden','Lavender Sky','Desert Wind','Tropical Night','Storm Horizon','Emerald Forest','Waterfall Mist','Purple Dream','Ice Blue','Crimson Night','Electric Lime','Solar Flare','Obsidian Gold','Space Dust','Skyline','Silver Tech','Holographic','Deep Sea','Frosted Glass','Royal Blue','Fire and Ice','Halloween','Christmas','New Year','Valentine','Back to School','Spring Festival','Summer Break','Fall Campus','Sakura Sunrise','Northern Lights','Moonlit Snow','Digital Rain','Ember Night','Cloud Nine','Cosmic Garden','Blue Hour','Cafe Night','Circuit Rose','Deep Space','Neon Tokyo','Firefly Forest','Meteor Shower','Ocean Moon','Thunderstorm','Floating Lanterns','Autumn Wind','Soft Rain','Starfall','Fireflies','Dream Clouds','Sunrise Meadow','Twilight Lake','Snowy Pines','Neon Rain','Golden Fireflies','Moon Garden','Windy Sakura','Comet Night','Mist Forest','City Lights'];
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
  'Firefly Forest':'Animated / Immersive',
  'Meteor Shower':'Animated / Immersive',
  'Ocean Moon':'Animated / Immersive',
  'Thunderstorm':'Animated / Immersive',
  'Floating Lanterns':'Animated / Immersive',
  'Autumn Wind':'Animated / Immersive',
  'Soft Rain':'Animated / Immersive',
  'Starfall':'Animated / Immersive',
  'Fireflies':'Animated / Immersive',
  'Dream Clouds':'Animated / Immersive',
  'Sunrise Meadow':'Animated / Immersive',
  'Twilight Lake':'Animated / Immersive',
  'Snowy Pines':'Animated / Immersive',
  'Neon Rain':'Animated / Immersive',
  'Golden Fireflies':'Animated / Immersive',
  'Moon Garden':'Animated / Immersive',
  'Windy Sakura':'Animated / Immersive',
  'Comet Night':'Animated / Immersive',
  'Mist Forest':'Animated / Immersive',
  'City Lights':'Animated / Immersive',
  'Dark':'Classic / Focused','Light':'Clean / Bright','Neon':'Electric / Bold','Ocean':'Calm / Deep','Sunset':'Warm / Creative','Forest':'Natural / Focused','Cyberpunk':'Electric / Futuristic','Galaxy':'Cosmic / Dreamy','Midnight':'Quiet / Deep','Aurora':'Luminous / Dreamy','Arctic':'Cold / Crisp','Volcano':'Hot / Intense','Matrix':'Digital / Hacker','Purple Storm':'Moody / Electric','Emerald':'Fresh / Tech','Synthwave':'Retro / Cinematic','Blackout':'Minimal / Focused','Cherry Blossom':'Calm / Cinematic','Sakura Night':'Dreamy / Night','Bamboo Garden':'Natural / Zen','Rainy City':'Moody / Urban','Mountain Dawn':'Fresh / Cinematic','Golden Autumn':'Warm / Seasonal','Winter Snow':'Cool / Seasonal','Spring Bloom':'Fresh / Colorful','Summer Glow':'Bright / Energetic','Moonlight Garden':'Quiet / Cinematic','Lavender Sky':'Soft / Dreamy','Desert Wind':'Warm / Minimal','Tropical Night':'Vibrant / Deep','Storm Horizon':'Dramatic / Moody','Emerald Forest':'Natural / Deep','Waterfall Mist':'Calm / Atmospheric','Purple Dream':'Dreamy / Soft','Ice Blue':'Crisp / Clean','Crimson Night':'Bold / Dark','Electric Lime':'Bright / Tech','Solar Flare':'Hot / Energetic','Obsidian Gold':'Premium / Dark','Space Dust':'Cosmic / Subtle','Skyline':'Urban / Modern','Silver Tech':'Clean / Futuristic','Holographic':'Iridescent / Modern','Deep Sea':'Dark / Calm','Frosted Glass':'Clean / Soft','Royal Blue':'Premium / Bold','Fire and Ice':'Contrast / Dramatic','Halloween':'Spooky / Seasonal','Christmas':'Festive / Winter','New Year':'Celebration / Glow','Valentine':'Warm / Romantic','Back to School':'Fresh / Academic','Spring Festival':'Bright / Seasonal','Summer Break':'Fun / Sunny','Fall Campus':'Warm / Academic','Sakura Sunrise':'Soft / Hopeful','Northern Lights':'Luminous / Epic','Moonlit Snow':'Quiet / Cinematic','Digital Rain':'Tech / Focused','Ember Night':'Warm / Dramatic','Cloud Nine':'Airy / Calm','Cosmic Garden':'Dreamy / Cosmic','Blue Hour':'Modern / Cinematic','Cafe Night':'Cozy / Focused','Circuit Rose':'Tech / Elegant','Deep Space':'Minimal / Cosmic','Neon Tokyo':'Urban / Electric'
};

function CinematicBackground(){
  const particles=Array.from({length:20},(_,i)=>i);
  return <div className="cinematic-bg" aria-hidden="true"><div className="scene-sky"></div><div className="scene-orb orb-a"></div><div className="scene-orb orb-b"></div><div className="scene-moon"></div><div className="scene-clouds"></div><div className="scene-silhouette"></div><div className="scene-grid"></div><div className="scene-particles">{particles.map(i=><i key={i} style={{'--i':i} as any}></i>)}</div><div className="scene-vignette"></div></div>
}


const appPage:Record<string,Page>={
  BrightPath:'BrightPath',CodeCoach:'CodeCoach',ProjectForge:'ProjectForge','Device Lab':'Device Lab',
  Community:'Community',CareerQuest:'CareerQuest',PortfolioBuilder:'Portfolio','School Tools':'School Tools',
  'Creative Lab':'Creative Lab','Labs Store':'Labs Store',Developer:'Developer'
};

const safeRead=<T,>(key:string,fallback:T):T=>{try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback}catch{return fallback}};
const safeWrite=(key:string,value:any)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
const useJsonCatalog=(url:string)=>{const [data,setData]=useState<any[]>([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('');useEffect(()=>{let alive=true;fetch(url).then(r=>{if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json()}).then(d=>{if(alive)setData(Array.isArray(d)?d:[])}).catch(e=>{if(alive)setError(String(e?.message||e))}).finally(()=>{if(alive)setLoading(false)});return()=>{alive=false}},[url]);return {data,loading,error}};
const recordRecent=(type:RecentItem['type'],name:string)=>{
  const r=safeRead<RecentItem[]>('mg-recent',[]);
  safeWrite('mg-recent',[{type,name,at:Date.now()},...r.filter(x=>x.name!==name)].slice(0,30));
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
  const commands:[string,Page][]=[
    ['Open Home','Home'],['Open Launchpad','Launchpad'],['Open Apps','Apps'],['Open BrightPath','BrightPath'],
    ['Open CodeCoach','CodeCoach'],['Open ProjectForge','ProjectForge'],['Open School Tools','School Tools'],
    ['Open CareerQuest','CareerQuest'],['Open Portfolio','Portfolio'],['Open Settings','Settings'],['Open Themes','Settings']
  ];
  const shown=commands.filter(x=>x[0].toLowerCase().includes(q.toLowerCase()));
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="command-palette" onMouseDown={e=>e.stopPropagation()}><div className="command-head"><b>Quick Command</b><span>ESC</span></div><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Type a command…" onKeyDown={e=>e.key==='Escape'&&onClose()}/><div className="command-list">{shown.map(([name,page])=><button key={name} onClick={()=>{go(page);onClose()}}><b>{name}</b><span>{page}</span></button>)}</div></div></div>
}

function GlobalSearch({go}:{go:(p:Page)=>void}){
  const [q,setQ]=useState('');
  const all=[
    ...(appCatalog as any[]).map(a=>({type:'App',title:a.name,subtitle:a.category,page:appPage[a.name]||'Apps' as Page})),
    ...themes.map(t=>({type:'Theme',title:t,subtitle:'Animated Theme',page:'Settings' as Page})),
    ...['Settings','Developer','Labs Store','Launchpad','School Tools','CareerQuest','Portfolio'].map(x=>({type:'Tool',title:x,subtitle:'MGLabs',page:x as Page}))
  ];
  const results=q.trim()?all.filter(x=>`${x.title} ${x.subtitle}`.toLowerCase().includes(q.toLowerCase())).slice(0,12):[];
  return <div className="global-search"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search apps, tools, themes…" />{q&&<div className="search-results">{results.length?results.map((r:any)=><button key={r.type+r.title} onClick={()=>{go(r.page);setQ('')}}><b>{r.title}</b><span>{r.type} · {r.subtitle}</span></button>):<div className="empty">No results</div>}</div>}</div>
}

function ExperiencePanel({go}:{go:(p:Page)=>void}){
  const theme=(localStorage.getItem('mg-theme')||'Cherry Blossom');
  const projects=safeRead<Project[]>('mg-projects',[]);
  const tasks=safeRead<any[]>('mg-school-tasks',[]);
  const favorites=safeRead<string[]>('mg-favorites',[]);
  const openTasks=tasks.filter(x=>!x.done).length;
  return <section className="experience-grid">
    <article className="experience-card experience-primary"><span>YOUR MGLABS</span><h2>Everything important, organized.</h2><p>School, projects, coding, career tools, creativity and AI—without an overloaded header.</p><div className="experience-actions"><button onClick={()=>go('Launchpad')}>Open Launchpad</button><button className="secondary" onClick={()=>go('Settings')}>Customize</button></div></article>
    <button className="experience-card" onClick={()=>go('ProjectForge')}><span>PROJECTS</span><strong>{projects.length}</strong><p>{projects.length?'Keep building what you started.':'Start your first project.'}</p></button>
    <button className="experience-card" onClick={()=>go('School Tools')}><span>SCHOOL</span><strong>{openTasks}</strong><p>{openTasks===1?'open task':'open tasks'}</p></button>
    <button className="experience-card" onClick={()=>go('Apps')}><span>FAVORITES</span><strong>{favorites.length}</strong><p>saved apps & tools</p></button>
    <button className="experience-card theme-now" onClick={()=>go('Settings')}><span>ATMOSPHERE</span><strong>{theme}</strong><p>tap to change the world</p></button>
  </section>
}


type WorkspacePreset='Study'|'Developer'|'Creative'|'Career';
type QuickCreateKind='Task'|'Project'|'Note'|'Study Session';

function SmartHomeOS({go,onQuickCreate,onContext,onFocus}:{go:(p:Page)=>void,onQuickCreate:()=>void,onContext:()=>void,onFocus:()=>void}){
  const [preset,setPreset]=useState<WorkspacePreset>(()=>(localStorage.getItem('mg-v29-preset') as WorkspacePreset)||'Study');
  const [widgets,setWidgets]=useState<string[]>(()=>safeRead('mg-v29-widgets',['Briefing','Quick Actions','Recent','Favorites']));
  const tasks=safeRead<any[]>('mg-school-tasks',[]);const projects=safeRead<Project[]>('mg-projects',[]);const recent=safeRead<RecentItem[]>('mg-recent',[]).slice(0,4);const favs=safeRead<string[]>('mg-favorites',[]).slice(0,4);
  const hour=new Date().getHours();const greeting=hour<12?'Good morning':hour<18?'Good afternoon':'Good evening';
  const presetItems:Record<WorkspacePreset,Page[]>={Study:['BrightPath','School Tools','Apps'],Developer:['CodeCoach','ProjectForge','Device Lab'],Creative:['Creative Lab','Portfolio','ProjectForge'],Career:['CareerQuest','Portfolio','ProjectForge']};
  const choose=(x:WorkspacePreset)=>{setPreset(x);localStorage.setItem('mg-v29-preset',x)};
  const toggleWidget=(x:string)=>{const n=widgets.includes(x)?widgets.filter(w=>w!==x):[...widgets,x];setWidgets(n);safeWrite('mg-v29-widgets',n)};
  return <section className="v29-os">
    <div className="v29-briefing"><div><span>SMART HOME</span><h2>{greeting}. What do you want to get done?</h2><p>{tasks.filter(x=>!x.done).length} open tasks · {projects.length} projects · {recent.length} recent items</p></div><div className="v29-briefing-actions"><button onClick={onQuickCreate}>＋ Quick Create</button><button className="secondary" onClick={onFocus}>Focus Mode</button><button className="secondary" onClick={onContext}>Open Copilot</button></div></div>
    <div className="v29-presets"><span>WORKSPACE</span>{(['Study','Developer','Creative','Career'] as WorkspacePreset[]).map(x=><button className={preset===x?'active':''} onClick={()=>choose(x)} key={x}>{x}</button>)}</div>
    <div className="v29-preset-grid">{presetItems[preset].map(x=><button onClick={()=>go(x)} key={x}><small>{preset}</small><b>{x}</b><span>Open workspace →</span></button>)}</div>
    <div className="v29-widget-toolbar"><b>Dashboard widgets</b>{['Briefing','Quick Actions','Recent','Favorites'].map(x=><button className={widgets.includes(x)?'active':''} onClick={()=>toggleWidget(x)} key={x}>{widgets.includes(x)?'✓ ':''}{x}</button>)}</div>
    <div className="v29-widgets">
      {widgets.includes('Quick Actions')&&<article><span>QUICK ACTIONS</span><h3>Create without hunting through menus</h3><div className="v29-mini-actions"><button onClick={onQuickCreate}>New task / project / note</button><button onClick={()=>go('School Tools')}>Study tools</button></div></article>}
      {widgets.includes('Recent')&&<article><span>RECENT</span><h3>Continue where you left off</h3>{recent.length?recent.map(x=><button className="v29-row" onClick={()=>go((x.name in pagePath?x.name:'Launchpad') as Page)} key={x.name}><b>{x.name}</b><small>{new Date(x.at).toLocaleDateString()}</small></button>):<p>No recent activity yet.</p>}</article>}
      {widgets.includes('Favorites')&&<article><span>FAVORITES</span><h3>Your pinned tools</h3>{favs.length?favs.map(x=><button className="v29-row" onClick={()=>go(appPage[x]||'Apps')} key={x}><b>{x}</b><small>Favorite</small></button>):<p>Favorite apps from the Apps page.</p>}</article>}
      {widgets.includes('Briefing')&&<article><span>THIS WEEK</span><h3>{tasks.filter(x=>!x.done).length?'Finish what matters most':'You are clear for now'}</h3><p>{projects.length?`You have ${projects.length} active project${projects.length===1?'':'s'}.`:'Create a project in ProjectForge when you are ready.'}</p></article>}
    </div>
  </section>
}

function QuickCreateModal({open,onClose,go}:{open:boolean,onClose:()=>void,go:(p:Page)=>void}){
  const [kind,setKind]=useState<QuickCreateKind>('Task');const [value,setValue]=useState('');
  useEffect(()=>{if(open)setValue('')},[open]);if(!open)return null;
  const create=()=>{const text=value.trim();if(!text)return;
    if(kind==='Task'){const items=safeRead<any[]>('mg-school-tasks',[]);safeWrite('mg-school-tasks',[...items,{id:Date.now(),text,done:false}]);go('School Tools')}
    if(kind==='Project'){const items=safeRead<Project[]>('mg-projects',[]);safeWrite('mg-projects',[{id:Date.now(),name:text,description:'Quick-created project',template:'Personal Project',priority:'Medium',due:'',tasks:[]},...items]);go('ProjectForge')}
    if(kind==='Note'){localStorage.setItem('mg-school-notes',`${localStorage.getItem('mg-school-notes')||''}${localStorage.getItem('mg-school-notes')?'\n\n':''}${text}`);go('School Tools')}
    if(kind==='Study Session'){safeWrite('mg-v29-focus',{title:text,minutes:25,created:Date.now()});go('School Tools')}
    onClose();
  };
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="v29-create-modal" onMouseDown={e=>e.stopPropagation()}><span>QUICK CREATE</span><h2>Create something instantly</h2><div className="idea-tabs">{(['Task','Project','Note','Study Session'] as QuickCreateKind[]).map(x=><button className={kind===x?'active':''} onClick={()=>setKind(x)} key={x}>{x}</button>)}</div><textarea autoFocus value={value} onChange={e=>setValue(e.target.value)} placeholder={kind==='Project'?'Project name':kind==='Study Session'?'What are you studying?':`Write your ${kind.toLowerCase()}…`}/><div className="buttons"><button onClick={create}>Create {kind}</button><button className="secondary" onClick={onClose}>Cancel</button></div></div></div>
}

function FocusMode({open,onClose}:{open:boolean,onClose:()=>void}){
  const saved=safeRead<any>('mg-v29-focus',{title:'Focus session',minutes:25});const [title,setTitle]=useState(saved.title||'Focus session');const [seconds,setSeconds]=useState((saved.minutes||25)*60);const [running,setRunning]=useState(false);
  useEffect(()=>{if(!open)return;const t=running?setInterval(()=>setSeconds(s=>Math.max(0,s-1)),1000):null;return()=>{if(t)clearInterval(t)}},[open,running]);
  if(!open)return null;const mm=Math.floor(seconds/60),ss=seconds%60;
  return <div className="v29-focus"><div className="v29-focus-card"><span>FOCUS MODE</span><input value={title} onChange={e=>setTitle(e.target.value)}/><div className="v29-focus-time">{String(mm).padStart(2,'0')}:{String(ss).padStart(2,'0')}</div><p>Everything else fades out so you can work on one thing.</p><div className="buttons"><button onClick={()=>setRunning(!running)}>{running?'Pause':'Start'}</button><button className="secondary" onClick={()=>setSeconds(25*60)}>Reset</button><button className="secondary" onClick={onClose}>Exit Focus</button></div></div></div>
}

function ContextPanel({open,onClose,go}:{open:boolean,onClose:()=>void,go:(p:Page)=>void}){
  const [tab,setTab]=useState('Overview');const [q,setQ]=useState('');const [answer,setAnswer]=useState('');const [loading,setLoading]=useState(false);
  const tasks=safeRead<any[]>('mg-school-tasks',[]).filter(x=>!x.done).slice(0,5);const projects=safeRead<Project[]>('mg-projects',[]).slice(0,5);
  const ask=async()=>{if(!q.trim())return;setLoading(true);try{setAnswer(await askMGLabsAI(q,'You are MGLabs Copilot. Help a student plan, study, build, organize, or navigate MGLabs. Be concise and practical.'))}catch(e:any){setAnswer(`AI unavailable: ${e.message}`)}finally{setLoading(false)}};
  return <aside className={`v29-context ${open?'open':''}`}><div className="v29-context-head"><div><span>MGLABS COPILOT</span><b>Context Panel</b></div><button onClick={onClose}>×</button></div><div className="idea-tabs">{['Overview','AI','Tasks','Projects'].map(x=><button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x}</button>)}</div>{tab==='Overview'&&<div className="v29-context-body"><h3>Your workspace at a glance</h3><p>{tasks.length} visible open tasks and {projects.length} recent projects.</p><button onClick={()=>go('Launchpad')}>Open Launchpad</button></div>}{tab==='AI'&&<div className="v29-context-body"><textarea value={q} onChange={e=>setQ(e.target.value)} placeholder="Ask about studying, planning, coding, projects…"/><button disabled={loading} onClick={ask}>{loading?'Thinking…':'Ask Copilot'}</button>{answer&&<div className="ai-help">{answer}</div>}</div>}{tab==='Tasks'&&<div className="v29-context-body"><h3>Open tasks</h3>{tasks.map(x=><div className="v29-row" key={x.id}><b>{x.text}</b></div>)}<button onClick={()=>go('School Tools')}>Open School Tools</button></div>}{tab==='Projects'&&<div className="v29-context-body"><h3>Projects</h3>{projects.map(x=><div className="v29-row" key={x.id}><b>{x.name}</b><small>{x.template}</small></div>)}<button onClick={()=>go('ProjectForge')}>Open ProjectForge</button></div>}</aside>
}


function V30Icon({kind}:{kind:string}){
  const icons:Record<string,string>={focus:'◎',upcoming:'▣',recent:'▤',copilot:'✦',bright:'◆',school:'▥',project:'⚒',code:'<>',notes:'▤',file:'▰',portfolio:'▧',career:'▥',device:'▣'};
  return <span className={`v30-icon v30-icon-${kind}`}>{icons[kind]||'◆'}</span>
}

function V30Progress({label,value,max,tone}:{label:string,value:number,max:number,tone:string}){
  const pct=Math.max(0,Math.min(100,Math.round(value/max*100)));
  return <div className="v30-progress-row"><div><b>{label}</b><span>{value}/{max}</span></div><div className="v30-progress-track"><i className={`tone-${tone}`} style={{width:`${pct}%`}}/></div></div>
}

function Home({go}:{go:(p:Page)=>void}){
  const tasks=safeRead<any[]>('mg-school-tasks',[]);
  const projects=safeRead<Project[]>('mg-projects',[]);
  const recent=safeRead<RecentItem[]>('mg-recent',[]).slice(0,4);
  const notes=(localStorage.getItem('mg-school-notes')||'').trim();
  const hour=new Date().getHours();
  const greeting=hour<12?'Good morning':hour<18?'Good afternoon':'Good evening';
  const date=new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});
  const openTasks=tasks.filter(x=>!x.done);
  const done=Math.max(1,tasks.length-openTasks.length);
  const themes=['Cherry Blossom','Night City','Ocean Moon','Firefly Forest','Snowy Pines','Starfall'];
  const toolItems:[string,Page,string][]=[
    ['BrightPath','BrightPath','bright'],['School Tools','School Tools','school'],['ProjectForge','ProjectForge','project'],
    ['CodeCoach','CodeCoach','code'],['Notes Hub','School Tools','notes'],['File Vault','School Tools','file'],
    ['Portfolio','Portfolio','portfolio'],['CareerQuest','CareerQuest','career'],['Device Lab','Device Lab','device']
  ];
  const glance=[
    {title:'Chemistry Notes',sub:notes?'Continue your notes':'Complete unit notes',done:false},
    {title:'Math Practice',sub:'Finish practice problems',done:true},
    {title:'English Essay',sub:'Outline and research',done:false},
    {title:'Science Project',sub:projects[0]?.name||'Work on presentation',done:!!projects.length}
  ];
  return <div className="page v30-page">
    <section className="v30-hero-shell">
      <div className="v30-greeting"><span>{date}</span><h1>{greeting},<br/><em>Student</em></h1><p>Stay consistent. Build your future. You're doing great.</p></div>
      <button className="v30-focus-hero" onClick={()=>window.dispatchEvent(new CustomEvent('mg-v29-focus-open'))}><span className="v30-focus-ring">▶</span><div><b>Focus Mode</b><small>Get in the zone</small></div><i>›</i></button>
    </section>

    <section className="v30-summary-grid">
      <button className="v30-glass-card" onClick={()=>go('School Tools')}><V30Icon kind="focus"/><div><b>Today's Focus</b><strong>{openTasks[0]?.text||'Finish Chemistry Notes'}</strong></div><span className="v30-donut">{Math.min(4,done)}/4</span></button>
      <button className="v30-glass-card" onClick={()=>go('School Tools')}><V30Icon kind="upcoming"/><div><b>Upcoming</b><strong>Math Test</strong><small>in 3 days</small></div><i>›</i></button>
      <button className="v30-glass-card" onClick={()=>go('ProjectForge')}><V30Icon kind="recent"/><div><b>Recent Activity</b><strong>{recent[0]?.name||'Edited Science Project'}</strong><small>{recent[0]?'Recently':'2 hours ago'}</small></div><i>›</i></button>
      <button className="v30-glass-card" onClick={()=>window.dispatchEvent(new CustomEvent('mg-v29-context'))}><V30Icon kind="copilot"/><div><b>MGLabs Copilot</b><strong>Ask anything or get help</strong><small>with your work.</small></div><i>›</i></button>
    </section>

    <section className="v30-tools-section">
      <div className="v30-section-head"><h2>★ <span>Your Tools</span></h2><button onClick={()=>go('Apps')}>✎ Edit Favorites</button></div>
      <div className="v30-tools-row">{toolItems.map(([name,page,kind])=><button className="v30-tool" onClick={()=>go(page)} key={name}><V30Icon kind={kind}/><b>{name}</b></button>)}<button className="v30-tool v30-add-tool" onClick={()=>go('Apps')}><span>＋</span><b>Add Tool</b></button></div>
    </section>

    <section className="v30-main-grid">
      <article className="v30-panel v30-glance"><div className="v30-panel-head"><h3>▣ Today at a Glance</h3><button onClick={()=>go('School Tools')}>View All</button></div>{glance.map((x,i)=><button className="v30-task-row" key={x.title}><span className={x.done?'done':''}>{x.done?'✓':''}</span><div><b>{x.title}</b><small>{x.sub}</small></div><i>{i===3?'○':'›'}</i></button>)}</article>
      <article className="v30-panel"><div className="v30-panel-head"><h3>▥ Progress</h3><select><option>This Week</option></select></div><V30Progress label="Study Sessions" value={4} max={7} tone="pink"/><V30Progress label="Projects" value={Math.min(2,Math.max(1,projects.length))} max={3} tone="blue"/><V30Progress label="Assignments" value={5} max={6} tone="green"/><V30Progress label="Goals" value={3} max={4} tone="purple"/></article>
      <article className="v30-panel"><div className="v30-panel-head"><h3>⊕ Quick Create</h3><span>→</span></div><div className="v30-quick-grid"><button onClick={()=>window.dispatchEvent(new CustomEvent('mg-v29-create'))}>▤ New Note <i>›</i></button><button onClick={()=>window.dispatchEvent(new CustomEvent('mg-v29-create'))}>⚒ New Project <i>›</i></button><button onClick={()=>window.dispatchEvent(new CustomEvent('mg-v29-focus-open'))}>◴ Study Session <i>›</i></button><button onClick={()=>window.dispatchEvent(new CustomEvent('mg-v29-create'))}>◉ Task <i>›</i></button><button onClick={()=>go('School Tools')}>↥ Upload File <i>›</i></button><button onClick={()=>go('Launchpad')}>••• More Options <i>›</i></button></div></article>
      <article className="v30-panel v30-themes"><div className="v30-panel-head"><h3>⌁ Themes</h3><button onClick={()=>go('Settings')}>View All</button></div><div className="v30-theme-grid">{themes.map((t,i)=><button className={`v30-theme-thumb v30-theme-${i} ${i===0?'active':''}`} onClick={()=>{localStorage.setItem('mg-theme',t);document.documentElement.dataset.theme=t.toLowerCase().replaceAll(' ','-')}} key={t}><i></i><span>{t}</span></button>)}</div></article>
    </section>

    <section className="v30-bottom-grid">
      <article className="v30-panel v30-presets-card"><h3>▦ Workspace Preset</h3><div>{(['Study','Developer','Creative','Career'] as WorkspacePreset[]).map((x,i)=><button className={i===0?'active':''} onClick={()=>{localStorage.setItem('mg-v29-preset',x);go(x==='Study'?'BrightPath':x==='Developer'?'CodeCoach':x==='Creative'?'Creative Lab':'CareerQuest')}} key={x}>{i===0?'▣':i===1?'<>':i===2?'◉':'▰'} {x}</button>)}</div></article>
      <article className="v30-panel v30-quote"><h3>❝ Daily Motivation</h3><blockquote>“Small progress every day<br/>leads to big results.”</blockquote></article>
      <article className="v30-panel v30-status"><h3>⌁ System Status</h3><div>{['AI','Storage','Search','Exports'].map(x=><span key={x}><i></i><b>{x}</b><small>Online</small></span>)}</div></article>
    </section>
  </div>
}

function Launchpad({go}:{go:(p:Page)=>void}){
  const sections:Page[]=['BrightPath','CodeCoach','ProjectForge','Device Lab','CareerQuest','Portfolio','School Tools','Creative Lab','Community','Labs Store','Developer'];
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
  const channels=['General','Coding','AI','Hardware','School','Projects','Careers','Study Help'];const [channel,setChannel]=useState('General');const [msg,setMsg]=useState('');const [posts,setPosts]=useState(()=>safeRead<any[]>('mg-community-posts',[]));
  const add=()=>{if(!msg.trim())return;const next=[{id:Date.now(),channel,text:msg,likes:0},...posts];setPosts(next);safeWrite('mg-community-posts',next);setMsg('')};const like=(id:number)=>{const next=posts.map(p=>p.id===id?{...p,likes:p.likes+1}:p);setPosts(next);safeWrite('mg-community-posts',next)};
  return <div className="page"><h1>Community Demo</h1><p>Local-only showcase channels. There is no fake multi-user backend or fabricated member count.</p><div className="idea-tabs">{channels.map(c=><button className={channel===c?'active':''} onClick={()=>setChannel(c)} key={c}>{c}</button>)}</div><div className="compose"><input value={msg} onChange={e=>setMsg(e.target.value)} placeholder={`Post in ${channel}`}/><button onClick={add}>Post</button></div><div className="feed">{posts.filter(p=>p.channel===channel).map(p=><article key={p.id}><span>{p.channel}</span><p>{p.text}</p><button className="secondary" onClick={()=>like(p.id)}>♡ {p.likes}</button></article>)}{!posts.some(p=>p.channel===channel)&&<article><b>No posts yet</b><p>Create the first local demo post in this channel.</p></article>}</div></div>
}

const careerData=[
  ['AI Engineer','Programming, math, data','Computer Science, Statistics','Build a small classifier or study assistant'],
  ['Software Engineer','Programming, systems, debugging','Computer Science, Math','Build a useful web app'],
  ['Cybersecurity Analyst','Networking, security, investigation','Computer Science, Cybersecurity','Create a safe security checklist tool'],
  ['Robotics Engineer','Programming, electronics, mechanics','Physics, CS, Engineering','Build a simulated robot controller'],
  ['Data Scientist','Statistics, Python, visualization','Statistics, CS, Math','Analyze a public dataset'],
  ['UX Designer','Research, interface design, accessibility','Art, CS, Psychology','Redesign a student tool'],
  ['Cloud Engineer','Linux, networking, deployment','CS, Networking','Deploy a small web service'],
  ['Hardware Engineer','Electronics, circuits, testing','Physics, Engineering','Prototype a sensor dashboard'],
  ['Web Developer','HTML, CSS, JavaScript','CS, Design','Build a responsive website']
];

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
    'Social Post':`I’ve been building ${name}, ${purpose}. The newest update focuses on reliability, organization, themes, and making every part actually useful.`,
    'Name Ideas':`${name} Labs · ${name} Studio · ${name} Hub · ${name} Forge · ${name} Nexus`
  };setOutput(ideas[kind]||'')};
  const tools=['Poster Plan','Presentation Plan','Video Script','Thumbnail Plan','Brand Plan','Color Palette','UI Wireframe','Social Post','Name Ideas'];
  return <div className="page"><h1>Creative Lab</h1><p>Functional local planning tools for visuals, presentations, branding and content.</p><div className="form-grid"><label><span>PROJECT NAME</span><input value={name} onChange={e=>setName(e.target.value)}/></label><label><span>PURPOSE</span><textarea value={purpose} onChange={e=>setPurpose(e.target.value)}/></label></div><div className="creative-tools">{tools.map(x=><button key={x} onClick={()=>make(x)}>{x}</button>)}</div><article className="creative-preview"><span>OUTPUT</span><h2>{name}</h2><p>{output||'Choose a tool above to generate a local planning output.'}</p></article></div>
}

function LabsStore({go}:{go:(p:Page)=>void}){
  return <div className="page"><h1>Labs Store</h1><p>App-store style catalog with build status and one-click launch.</p><div className="grid">{(appCatalog as any[]).map(a=><article className="store-card" key={a.id}><div className="app-icon">{a.name.slice(0,2).toUpperCase()}</div><div><div className="card-top"><span>{a.category}</span><Status status={a.status}/></div><h3>{a.name}</h3><p>{a.description}</p><small>Developer: MGLabs · Version 26</small><div className="card-actions"><button onClick={()=>go(appPage[a.name]||'Apps')}>Open</button></div></div></article>)}</div></div>
}

function Developer(){
  return <div className="page"><h1>Developer Mode</h1><p>Technical overview of MGLabs Version 100 Student OS.</p><div className="grid"><article className="card"><span>CATALOG</span><h3>{(appCatalog as any[]).length} major apps</h3><p>Focused app catalog with game and playable content removed.</p></article><article className="card"><span>FLAGS</span><h3>{Object.keys(flags).length}</h3><p>{Object.entries(flags).filter(([,v])=>v).length} currently enabled.</p></article><article className="card"><span>ACHIEVEMENTS</span><h3>{(achievements as any[]).length}</h3><p>Achievement definitions included in the project.</p></article><article className="card"><span>DEPLOYMENT</span><h3>Cloudflare Ready</h3><p>Worker entry point, static assets, SPA handling and AI binding configured.</p></article></div><section className="section"><h2>Feature flags</h2><div className="table">{Object.entries(flags).map(([k,v])=><div key={k}><b>{k}</b><span>{v?'ON':'OFF'}</span><span>Public config</span><span>{v?'Enabled':'Planned'}</span></div>)}</div></section></div>
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
  const [p,setP]=useState<Page>(()=>pageFromPath());const [palette,setPalette]=useState(false);const [openMenu,setOpenMenu]=useState('');const [quickCreate,setQuickCreate]=useState(false);const [context,setContext]=useState(false);const [focus,setFocus]=useState(false);const [preset,setPreset]=useState<WorkspacePreset>(()=>(localStorage.getItem('mg-v29-preset') as WorkspacePreset)||'Study');
  const go=(x:Page)=>{setP(x);setOpenMenu('');recordRecent('Tool',x);const path=pagePath[x];if(window.location.pathname!==path)window.history.pushState({},'',path);scrollTo({top:0,behavior:'smooth'})};
  useEffect(()=>{const onPop=()=>setP(pageFromPath());const onKey=(e:KeyboardEvent)=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setPalette(true)}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='n'){e.preventDefault();setQuickCreate(true)}if(e.key==='Escape'){setPalette(false);setOpenMenu('');setQuickCreate(false)}};const create=()=>setQuickCreate(true);const ctx=()=>setContext(true);const foc=()=>setFocus(true);window.addEventListener('popstate',onPop);window.addEventListener('keydown',onKey);window.addEventListener('mg-v29-create',create as EventListener);window.addEventListener('mg-v29-context',ctx as EventListener);window.addEventListener('mg-v29-focus-open',foc as EventListener);
    let theme=localStorage.getItem('mg-theme')||'Cherry Blossom';if(localStorage.getItem('mg-v29-auto-time')!=='0'){const h=new Date().getHours();theme=h<7?'Moonlight Garden':h<11?'Mountain Dawn':h<17?'Cloud Nine':h<20?'Blue Hour':'Moonlight Garden'}document.documentElement.dataset.theme=theme.toLowerCase().replaceAll(' ','-');document.body.classList.toggle('compact',localStorage.getItem('mg-compact')==='1');document.body.classList.toggle('reduced-motion',localStorage.getItem('mg-reduced')==='1');document.body.classList.toggle('scene-disabled',localStorage.getItem('mg-scenes')==='0');document.documentElement.style.setProperty('--cinematic',String(Number(localStorage.getItem('mg-cinematic-intensity')||'85')/100));return()=>{window.removeEventListener('popstate',onPop);window.removeEventListener('keydown',onKey);window.removeEventListener('mg-v29-create',create as EventListener);window.removeEventListener('mg-v29-context',ctx as EventListener);window.removeEventListener('mg-v29-focus-open',foc as EventListener)}},[]);
  const menus:{label:string;items:Page[]}[]=[{label:'Learn',items:['BrightPath','CodeCoach','School Tools']},{label:'Build',items:['ProjectForge','Device Lab','Creative Lab','Portfolio']},{label:'Explore',items:['Apps','Community','CareerQuest','Labs Store']},{label:'More',items:['Launchpad','Evolution','Developer']}];
  const presetPages:Record<WorkspacePreset,Page>={Study:'BrightPath',Developer:'CodeCoach',Creative:'Creative Lab',Career:'CareerQuest'};
  const changePreset=(x:WorkspacePreset)=>{setPreset(x);localStorage.setItem('mg-v29-preset',x);go(presetPages[x])};
  return <><CinematicBackground/><div className="ambient"><i></i><i></i><i></i><i></i></div>
  <header className="clean-header v29-header v30-header">
    <button onClick={()=>go('Home')} className="brand"><b>MG</b><span>MGLabs<small>V30</small></span></button>
    <button className={`clean-home ${p==='Home'?'active':''}`} onClick={()=>go('Home')}>⌂ Home</button>
    <nav className="grouped-nav">{menus.map(menu=><div className={`nav-group ${openMenu===menu.label?'open':''}`} key={menu.label}><button onClick={()=>setOpenMenu(openMenu===menu.label?'':menu.label)}>{menu.label}<span>⌄</span></button><div className="nav-dropdown">{menu.items.map(x=><button className={p===x?'active':''} onClick={()=>go(x)} key={x}><b>{x}</b><small>{pagePath[x]}</small></button>)}</div></div>)}</nav>
    <div className="v30-search-wrap"><GlobalSearch go={go}/><button className="command-button" onClick={()=>setPalette(true)}>Ctrl&nbsp; K</button></div>
    <div className="header-spacer"/>
    <button className="v30-round" onClick={()=>go('Settings')}>☼</button>
    <button className="v30-round v30-bell" onClick={()=>go('School Tools')}>♧</button>
    <button className="v30-profile" onClick={()=>go('Settings')}><span>MG</span><div><b>Student</b><small>@MGLabs</small></div><i>⌄</i></button>
  </header>
  <main className="page-transition" key={p}>{p==='Home'&&<Home go={go}/>} {p==='Launchpad'&&<Launchpad go={go}/>} {p==='Apps'&&<Apps go={go}/>} {p==='BrightPath'&&<BrightPath/>} {p==='CodeCoach'&&<CodeCoach/>} {p==='ProjectForge'&&<ProjectForge/>} {p==='Device Lab'&&<DeviceLab/>} {p==='Community'&&<Community/>} {p==='CareerQuest'&&<CareerQuest/>} {p==='Portfolio'&&<Portfolio/>} {p==='School Tools'&&<SchoolTools/>} {p==='Creative Lab'&&<CreativeLab/>} {p==='Labs Store'&&<LabsStore go={go}/>} {p==='Evolution'&&<FeatureHub/>} {p==='Developer'&&<Developer/>} {p==='Settings'&&<Settings/>}</main>
  <div className="quick-dock"><button className={p==='Home'?'active':''} onClick={()=>go('Home')}><span>⌂</span>Home</button><button onClick={()=>setQuickCreate(true)}><span>＋</span>Create</button><button className={p==='BrightPath'?'active':''} onClick={()=>go('BrightPath')}><span>✦</span>Learn</button><button onClick={()=>setContext(true)}><span>◫</span>Copilot</button><button className={p==='Settings'?'active':''} onClick={()=>go('Settings')}><span>⚙</span>Themes</button></div>
  <footer><b>MGLabs Version 100</b><span>Cinematic UI · Learn · Build · Create · Organize.</span><span>No game/playable content</span></footer><CommandPalette open={palette} onClose={()=>setPalette(false)} go={go}/><QuickCreateModal open={quickCreate} onClose={()=>setQuickCreate(false)} go={go}/><ContextPanel open={context} onClose={()=>setContext(false)} go={go}/><FocusMode open={focus} onClose={()=>setFocus(false)}/></>
}
