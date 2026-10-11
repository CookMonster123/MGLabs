import {useEffect,useMemo,useState} from 'react';

const saveBest=(key:string,score:number)=>{const old=Number(localStorage.getItem(key)||0);if(score>old)localStorage.setItem(key,String(score));return Math.max(old,score)};

export function ReactionGrid(){
 const [active,setActive]=useState(Math.floor(Math.random()*9));const [score,setScore]=useState(0);const [best,setBest]=useState(()=>Number(localStorage.getItem('mg-best-reaction')||0));
 const hit=(i:number)=>{if(i!==active)return;const n=score+1;setScore(n);setBest(saveBest('mg-best-reaction',n));setActive(Math.floor(Math.random()*9))};
 return <section className="play-game"><div><h2>Reaction Grid</h2><p>Tap the glowing square as fast as you can.</p><b>Score: {score} · Best: {best}</b><button onClick={()=>setScore(0)}>Reset</button></div><div className="reaction-grid">{Array.from({length:9},(_,i)=><button aria-label={`grid ${i+1}`} className={i===active?'target':''} key={i} onClick={()=>hit(i)}/>)}</div></section>
}

export function NumberSprint(){
 const make=()=>{const a=2+Math.floor(Math.random()*18),b=2+Math.floor(Math.random()*18);return {a,b,answer:a+b}};
 const [q,setQ]=useState(make);const [value,setValue]=useState('');const [score,setScore]=useState(0);const [msg,setMsg]=useState('');
 const check=()=>{if(Number(value)===q.answer){setScore(s=>s+1);setMsg('Correct!');setQ(make());setValue('')}else setMsg('Try again.')};
 return <section className="play-game"><div><h2>Number Sprint</h2><p>Solve quick math problems and build a streak.</p><b>Score: {score}</b></div><div className="number-game"><h3>{q.a} + {q.b} = ?</h3><input inputMode="numeric" value={value} onChange={e=>setValue(e.target.value)} onKeyDown={e=>e.key==='Enter'&&check()}/><button onClick={check}>Check</button><p>{msg}</p></div></section>
}

export function MemoryMatch(){
 const values=useMemo(()=>{const a=['MG','AI','JS','LAB'];return [...a,...a].map((v,i)=>({id:i,v})).sort(()=>Math.random()-.5)},[]);
 const [open,setOpen]=useState<number[]>([]);const [done,setDone]=useState<number[]>([]);const [moves,setMoves]=useState(0);
 useEffect(()=>{if(open.length!==2)return;const [a,b]=open;if(values[a].v===values[b].v){setDone(d=>[...d,a,b]);setOpen([])}else{const t=setTimeout(()=>setOpen([]),650);return()=>clearTimeout(t)}},[open,values]);
 const flip=(i:number)=>{if(open.length===2||open.includes(i)||done.includes(i))return;setOpen(o=>[...o,i]);setMoves(m=>m+1)};
 return <section className="play-game"><div><h2>Memory Match</h2><p>Match all four MGLabs pairs.</p><b>Moves: {moves} · Pairs: {done.length/2}/4</b></div><div className="memory-grid">{values.map((c,i)=><button key={c.id} onClick={()=>flip(i)} className={open.includes(i)||done.includes(i)?'shown':''}>{open.includes(i)||done.includes(i)?c.v:'?'}</button>)}</div></section>
}
