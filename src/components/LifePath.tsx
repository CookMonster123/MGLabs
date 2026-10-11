import {useMemo,useState} from 'react';

type Stats={health:number;happiness:number;smarts:number;social:number;money:number;energy:number};
type LifeState={name:string;age:number;alive:boolean;education:string;career:string;relationship:string;stats:Stats;log:string[];achievements:string[];year:number};
type Choice={label:string;detail:string;apply:(s:LifeState)=>LifeState};
type Event={title:string;body:string;choices:Choice[]};

const clamp=(n:number,min=0,max=100)=>Math.max(min,Math.min(max,n));
const money=(n:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
const firstNames=['Avery','Jordan','Kai','Riley','Maya','Noah','Zoe','Eli','Nina','Theo','Lena','Miles'];
const careers=['Student','Retail Associate','Junior Developer','Teacher','Designer','Paramedic','Engineer','Chef','Entrepreneur','Researcher'];

function freshLife():LifeState{
  const name=firstNames[Math.floor(Math.random()*firstNames.length)];
  return {name,age:0,alive:true,education:'Not started',career:'Child',relationship:'Single',year:1,stats:{health:82,happiness:78,smarts:55,social:55,money:0,energy:85},log:[`${name} was born. A brand-new story begins.`],achievements:[]};
}

const mutate=(s:LifeState,patch:Partial<Stats>,line:string,other?:Partial<LifeState>):LifeState=>{
  const stats={...s.stats};
  for(const [k,v] of Object.entries(patch)) (stats as any)[k]=k==='money'?Math.max(0,(stats as any)[k]+Number(v)):clamp((stats as any)[k]+Number(v));
  return {...s,...other,stats,log:[line,...s.log].slice(0,16)};
};

function eventFor(s:LifeState):Event{
  const a=s.age;
  if(a<6) return {title:'A tiny adventure',body:'You spot a cardboard box and decide it might be a rocket ship.',choices:[
    {label:'Build the rocket',detail:'+Creativity, +happiness',apply:x=>mutate(x,{happiness:8,smarts:3},'You built a cardboard rocket and declared the living room your launch pad.')},
    {label:'Invite someone to play',detail:'+Social, +happiness',apply:x=>mutate(x,{social:8,happiness:5},'You turned the box into a two-person spaceship.')},
  ]};
  if(a<13) return {title:'School choice',body:'Your class announces a project fair. You can choose how much effort to put in.',choices:[
    {label:'Go all in',detail:'+Smarts, -energy',apply:x=>mutate(x,{smarts:10,energy:-8,happiness:2},'You worked hard on the project and impressed your teacher.')},
    {label:'Keep it simple',detail:'+Energy, small smarts boost',apply:x=>mutate(x,{smarts:4,energy:4},'You finished a clean, simple project and kept your weekend free.')},
    {label:'Team up',detail:'+Social, +smarts',apply:x=>mutate(x,{social:7,smarts:6},'You teamed up with classmates and learned how to divide the work.')},
  ]};
  if(a<18) return {title:'After-school opportunity',body:'You have room for one big commitment this year.',choices:[
    {label:'Join a club',detail:'+Social, +smarts',apply:x=>mutate(x,{social:8,smarts:6,energy:-5},'You joined a club and met people who share your interests.')},
    {label:'Get a part-time job',detail:'+Money, +responsibility',apply:x=>mutate(x,{money:900,energy:-8,social:2},'You started a part-time job and learned what a paycheck feels like.')},
    {label:'Focus on grades',detail:'+Smarts, -happiness',apply:x=>mutate(x,{smarts:12,happiness:-3,energy:-7},'You focused hard on grades and finished the year stronger academically.')},
  ]};
  if(a===18) return {title:'What comes next?',body:'You finished high school. Pick your next direction.',choices:[
    {label:'College',detail:'Education path, costs money',apply:x=>mutate(x,{smarts:8,money:-1200,energy:-5},'You enrolled in college.',{education:'College'})},
    {label:'Trade program',detail:'Practical path, balanced cost',apply:x=>mutate(x,{smarts:5,money:-500},'You enrolled in a trade program.',{education:'Trade Program'})},
    {label:'Start working',detail:'Immediate income',apply:x=>mutate(x,{money:2200,social:3},'You entered the workforce.',{education:'High School',career:'Retail Associate'})},
  ]};
  if(a<30) return {title:'Early adulthood',body:'You have a chance to make a move that could shape the next few years.',choices:[
    {label:'Push your career',detail:'+Money, -energy',apply:x=>mutate(x,{money:4200,energy:-12,happiness:-2},'You took on more responsibility at work.',{career:s.career==='Child'||s.career==='Student'?'Junior Developer':s.career})},
    {label:'Build friendships',detail:'+Social, +happiness',apply:x=>mutate(x,{social:10,happiness:8,money:-300},'You spent more time with friends and made some great memories.')},
    {label:'Start dating',detail:'Relationship chance',apply:x=>mutate(x,{social:6,happiness:6,money:-250},'You started seeing someone.',{relationship:'Dating'})},
    {label:'Learn a new skill',detail:'+Smarts, -energy',apply:x=>mutate(x,{smarts:9,energy:-8,money:-200},'You completed a new skill course.')},
  ]};
  if(a<45) return {title:'Mid-career crossroads',body:'A major opportunity lands in your lap.',choices:[
    {label:'Take the promotion',detail:'+Money, -energy',apply:x=>mutate(x,{money:8500,energy:-13,happiness:2},'You accepted a promotion and a heavier workload.',{career:careers[Math.min(careers.length-1,2+Math.floor(Math.random()*6))]})},
    {label:'Protect your balance',detail:'+Health, +happiness',apply:x=>mutate(x,{health:6,happiness:7,energy:8},'You said no to extra pressure and protected your time.')},
    {label:'Launch a side project',detail:'Risk/reward',apply:x=>mutate(x,{money:Math.random()>.45?9000:-1200,smarts:5,energy:-10},'You launched a side project. It taught you a lot, regardless of the result.')},
  ]};
  if(a<65) return {title:'A change of pace',body:'You are thinking more about what makes life feel meaningful.',choices:[
    {label:'Mentor someone',detail:'+Happiness, +social',apply:x=>mutate(x,{happiness:9,social:8,energy:-3},'You started mentoring someone younger in your field.')},
    {label:'Travel',detail:'+Happiness, -money',apply:x=>mutate(x,{happiness:11,money:-1800,health:2},'You took a memorable trip and came home refreshed.')},
    {label:'Save aggressively',detail:'+Money, -happiness',apply:x=>mutate(x,{money:7000,happiness:-3},'You cut expenses and built a stronger financial cushion.')},
  ]};
  return {title:'Legacy years',body:'You have more freedom to decide how you want to spend your time.',choices:[
    {label:'Spend time with family',detail:'+Happiness, +social',apply:x=>mutate(x,{happiness:10,social:8,health:2},'You made family time a priority.')},
    {label:'Volunteer',detail:'+Happiness, +social',apply:x=>mutate(x,{happiness:8,social:10,energy:-4},'You volunteered and found a new community.')},
    {label:'Take it easy',detail:'+Health, +energy',apply:x=>mutate(x,{health:7,energy:10},'You slowed down and gave yourself time to recharge.')},
  ]};
}

function applyAging(s:LifeState):LifeState{
  let next={...s,age:s.age+1,year:s.year+1,stats:{...s.stats}};
  if(next.age>=6&&next.age<18) next.education=next.age<14?'Elementary / Middle School':'High School';
  if(next.age>=18&&next.career==='Child') next.career='Student';
  if(next.age>22&&next.education==='College'&&next.career==='Student') next={...next,education:'College Graduate',career:'Junior Developer',stats:{...next.stats,money:next.stats.money+3500}};
  if(next.age>20&&next.education==='Trade Program'&&next.career==='Child') next={...next,career:'Engineer',stats:{...next.stats,money:next.stats.money+2800}};
  const decay=next.age>55?2:next.age>35?1:0;
  next.stats.health=clamp(next.stats.health-decay+(Math.random()>.7?1:0));
  next.stats.energy=clamp(next.stats.energy+(Math.random()>.5?3:-2));
  if(next.career!=='Child'&&next.career!=='Student') next.stats.money+=next.age<65?2200:900;
  const danger=Math.max(0,(next.age-72)*0.012)+(next.stats.health<25?0.05:0);
  if(next.age>78&&Math.random()<danger){next.alive=false;next.log=[`${next.name} passed away at age ${next.age}. Their story is complete.`,...next.log];}
  return next;
}

function award(s:LifeState):LifeState{
  const earned=[...s.achievements];
  const add=(x:string)=>{if(!earned.includes(x))earned.push(x)};
  if(s.age>=18)add('Adulting 101');
  if(s.stats.money>=10000)add('Five Figures');
  if(s.stats.smarts>=85)add('Brainpower');
  if(s.stats.happiness>=90)add('Good Vibes');
  if(s.relationship!=='Single')add('Connection');
  if(s.age>=65)add('Long Story');
  return {...s,achievements:earned};
}

export default function LifePath(){
  const [life,setLife]=useState<LifeState>(()=>{try{const r=localStorage.getItem('mg-lifepath');return r?JSON.parse(r):freshLife()}catch{return freshLife()}});
  const [event,setEvent]=useState<Event>(()=>eventFor(life));
  const save=(v:LifeState)=>{const a=award(v);setLife(a);localStorage.setItem('mg-lifepath',JSON.stringify(a));return a};
  const choose=(c:Choice)=>{if(!life.alive)return;const afterChoice=c.apply(life);const aged=applyAging(afterChoice);const final=save(aged);setEvent(eventFor(final));};
  const restart=()=>{const n=freshLife();save(n);setEvent(eventFor(n));};
  const lifeScore=useMemo(()=>Math.round((life.stats.health+life.stats.happiness+life.stats.smarts+life.stats.social)/4+Math.min(30,life.stats.money/2500)),[life]);
  return <section className="lifepath-game">
    <div className="lifepath-profile">
      <div className="life-avatar">{life.name.slice(0,1)}</div>
      <div><span>MGLABS ORIGINAL LIFE SIM</span><h2>{life.name}</h2><p>Age {life.age} · {life.career} · {life.education}</p></div>
      <div className="life-score"><small>LIFE SCORE</small><b>{lifeScore}</b></div>
    </div>

    <div className="life-stat-grid">
      {Object.entries(life.stats).map(([k,v])=><div className="life-stat" key={k}><span>{k.toUpperCase()}</span><b>{k==='money'?money(Number(v)):Number(v)}</b>{k!=='money'&&<progress max="100" value={Number(v)}/>}</div>)}
    </div>

    {life.alive?<div className="life-event-card">
      <span>YEAR {life.year} · AGE {life.age}</span>
      <h3>{event.title}</h3>
      <p>{event.body}</p>
      <div className="life-choices">{event.choices.map(c=><button key={c.label} onClick={()=>choose(c)}><b>{c.label}</b><small>{c.detail}</small></button>)}</div>
    </div>:<div className="life-event-card life-ended"><span>STORY COMPLETE</span><h3>{life.name}'s life</h3><p>You reached age {life.age}. Your final life score was {lifeScore}. Start a new story whenever you are ready.</p><button onClick={restart}>Start a New Life</button></div>}

    <div className="life-bottom-grid">
      <article><span>RELATIONSHIPS</span><h3>{life.relationship}</h3><p>Your current relationship status can change through life choices.</p></article>
      <article><span>ACHIEVEMENTS</span><div className="life-achievements">{life.achievements.length?life.achievements.map(x=><b key={x}>★ {x}</b>):<p>No achievements yet.</p>}</div></article>
      <article className="life-log"><span>LIFE LOG</span>{life.log.slice(0,6).map((x,i)=><p key={i}>{x}</p>)}</article>
    </div>

    <div className="gridiron-actions"><button onClick={restart}>New Life</button><button className="secondary" onClick={()=>{localStorage.removeItem('mg-lifepath');restart()}}>Reset Save</button></div>
  </section>
}
