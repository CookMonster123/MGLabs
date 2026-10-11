import {useEffect,useMemo,useState} from 'react';

const best=(key:string,value:number)=>{
  const previous=Number(localStorage.getItem(key)||0);
  if(value>previous)localStorage.setItem(key,String(value));
  return Math.max(previous,value);
};

export function TapRush(){
  const [score,setScore]=useState(0);
  const [left,setLeft]=useState(15);
  const [running,setRunning]=useState(false);
  const [high,setHigh]=useState(()=>Number(localStorage.getItem('mg-best-taprush')||0));
  useEffect(()=>{
    if(!running)return;
    if(left<=0){setRunning(false);setHigh(best('mg-best-taprush',score));return}
    const t=setTimeout(()=>setLeft(x=>x-1),1000);
    return()=>clearTimeout(t);
  },[running,left,score]);
  const start=()=>{setScore(0);setLeft(15);setRunning(true)};
  return <section className="play-game"><div><h2>Tap Rush</h2><p>Tap as many times as you can in 15 seconds.</p><b>Score: {score} · Best: {high} · Time: {left}s</b><div><button onClick={start}>{running?'Restart':'Start'}</button></div></div><button className="tap-target" disabled={!running} onClick={()=>setScore(s=>s+1)}>{running?'TAP!':'PRESS START'}</button></section>
}

export function PatternRecall(){
  const symbols=['◆','●','▲','■'];
  const [round,setRound]=useState(1);
  const [sequence,setSequence]=useState<number[]>(()=>[Math.floor(Math.random()*4)]);
  const [input,setInput]=useState<number[]>([]);
  const [showing,setShowing]=useState(true);
  const [msg,setMsg]=useState('Memorize the pattern.');
  const [high,setHigh]=useState(()=>Number(localStorage.getItem('mg-best-pattern')||0));
  useEffect(()=>{if(!showing)return;const t=setTimeout(()=>{setShowing(false);setMsg('Repeat it!')},1000+sequence.length*350);return()=>clearTimeout(t)},[showing,sequence]);
  const press=(i:number)=>{
    if(showing)return;
    const next=[...input,i];setInput(next);
    const idx=next.length-1;
    if(sequence[idx]!==i){setMsg('Not quite — try a new pattern.');setHigh(best('mg-best-pattern',round));setRound(1);setSequence([Math.floor(Math.random()*4)]);setInput([]);setShowing(true);return}
    if(next.length===sequence.length){const nr=round+1;setRound(nr);setHigh(best('mg-best-pattern',nr));setSequence(s=>[...s,Math.floor(Math.random()*4)]);setInput([]);setShowing(true);setMsg('Nice! Next round…')}
  };
  return <section className="play-game"><div><h2>Pattern Recall</h2><p>Memorize the symbol sequence, then repeat it.</p><b>Round: {round} · Best: {high}</b><p>{msg}</p>{showing&&<div className="pattern-preview">{sequence.map((x,i)=><span key={i}>{symbols[x]}</span>)}</div>}</div><div className="pattern-grid">{symbols.map((s,i)=><button key={s} disabled={showing} onClick={()=>press(i)}>{s}</button>)}</div></section>
}

export function ColorRush(){
  const colors=useMemo(()=>['CYAN','GREEN','BLUE','PURPLE'],[]);
  const [target,setTarget]=useState(()=>Math.floor(Math.random()*4));
  const [score,setScore]=useState(0);
  const [high,setHigh]=useState(()=>Number(localStorage.getItem('mg-best-color')||0));
  const choose=(i:number)=>{
    if(i===target){const s=score+1;setScore(s);setHigh(best('mg-best-color',s));setTarget(Math.floor(Math.random()*4))}else setScore(0)
  };
  return <section className="play-game"><div><h2>Color Rush</h2><p>Choose the matching color tile.</p><b>Target: {colors[target]} · Score: {score} · Best: {high}</b></div><div className="color-rush">{colors.map((c,i)=><button key={c} data-color={i} onClick={()=>choose(i)}>{c}</button>)}</div></section>
}
