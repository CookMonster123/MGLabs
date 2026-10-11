import {useEffect,useMemo,useState} from 'react';

type Play='Run'|'Quick Pass'|'Deep Pass'|'Field Goal'|'Punt';
type Save={score:number,opp:number,quarter:number,clock:number,down:number,toGo:number,ball:number,poss:'you'|'opp',wins:number,losses:number,week:number,energy:number,fan:number,coins:number,last:string[]};
const KEY='mg-fourth-pixel-v1';
const fresh=():Save=>({score:0,opp:0,quarter:1,clock:180,down:1,toGo:10,ball:25,poss:'you',wins:0,losses:0,week:1,energy:100,fan:55,coins:120,last:['Kickoff! Your offense starts at the 25.']});
const read=():Save=>{try{return JSON.parse(localStorage.getItem(KEY)||'null')||fresh()}catch{return fresh()}};
const clamp=(n:number,a:number,b:number)=>Math.max(a,Math.min(b,n));

export default function FourthAndPixel(){
  const [g,setG]=useState<Save>(()=>read());
  const [difficulty,setDifficulty]=useState(()=>localStorage.getItem('mg-gridiron-diff')||'Normal');
  useEffect(()=>{localStorage.setItem(KEY,JSON.stringify(g))},[g]);
  const yardText=g.ball>=50?`OPP ${100-g.ball}`:`OWN ${g.ball}`;
  const status=useMemo(()=>g.quarter>4?'FINAL':`Q${g.quarter} · ${Math.floor(g.clock/60)}:${String(g.clock%60).padStart(2,'0')}`,[g.quarter,g.clock]);

  const nextClock=(s:Save,seconds:number):Save=>{
    let clock=Math.max(0,s.clock-seconds), quarter=s.quarter;
    if(clock===0){quarter+=1;clock=quarter<=4?180:0}
    return {...s,clock,quarter};
  };
  const log=(s:Save,msg:string):Save=>({...s,last:[msg,...s.last].slice(0,8)});
  const opponentDrive=(s:Save)=>{
    if(s.quarter>4)return s;
    const mod=difficulty==='Easy'?.25:difficulty==='Hard'?.48:.36;
    const r=Math.random();
    let n:Save={...s,poss:'you',ball:25,down:1,toGo:10,energy:clamp(s.energy+8,0,100)};
    n=nextClock(n,35+Math.floor(Math.random()*40));
    if(r<mod){n.opp+=7;n=log(n,'Opponent answered with a touchdown. You get the ball back.')}else if(r<mod+.20){n.opp+=3;n=log(n,'Opponent settled for a field goal. Your offense is back on the field.')}else{n=log(n,'Defense got the stop. Ball back at your 25.')}
    return n;
  };
  const finishIfNeeded=(s:Save)=>{
    if(s.quarter<=4)return s;
    const win=s.score>s.opp;
    const tie=s.score===s.opp;
    return log({...s,wins:s.wins+(win?1:0),losses:s.losses+(!win&&!tie?1:0),fan:clamp(s.fan+(win?6:tie?0:-4),0,100),coins:s.coins+(win?45:20)},`${win?'WIN':tie?'TIE':'LOSS'} — ${s.score}-${s.opp}. Season record ${s.wins+(win?1:0)}-${s.losses+(!win&&!tie?1:0)}.`)
  };
  const snap=(play:Play)=>{
    if(g.quarter>4||g.poss!=='you')return;
    let s={...g};
    if(play==='Punt'){
      s=log(s,'Punt flips the field.');s=nextClock(s,12);s=opponentDrive(s);setG(finishIfNeeded(s));return;
    }
    if(play==='Field Goal'){
      const distance=117-s.ball; const chance=clamp(.95-(distance-35)*.018,.12,.95);s=nextClock(s,8);
      if(Math.random()<chance){s.score+=3;s=log(s,`Field goal GOOD from ${distance} yards.`)}else{s=log(s,`Field goal missed from ${distance} yards.`)}
      s=opponentDrive(s);setG(finishIfNeeded(s));return;
    }
    const energyPenalty=play==='Deep Pass'?9:play==='Quick Pass'?5:4;
    const skill=(s.energy/100)*.12+(difficulty==='Easy'?.08:difficulty==='Hard'?-.06:0);
    const roll=Math.random()+skill;
    let yards=0, turnover=false, incomplete=false;
    if(play==='Run') yards=roll<.12?-2:roll<.45?2:roll<.78?5:roll<.95?9:15+Math.floor(Math.random()*14);
    if(play==='Quick Pass'){
      if(roll<.20)incomplete=true; else if(roll<.24)turnover=true; else yards=roll<.60?5:roll<.88?9:13+Math.floor(Math.random()*13);
    }
    if(play==='Deep Pass'){
      if(roll<.42)incomplete=true; else if(roll<.49)turnover=true; else yards=roll<.76?14:22+Math.floor(Math.random()*28);
    }
    s.energy=clamp(s.energy-energyPenalty,0,100);s=nextClock(s,incomplete?8:18+Math.floor(Math.random()*14));
    if(turnover){s=log(s,`${play}: intercepted!`);s=opponentDrive(s);setG(finishIfNeeded(s));return}
    if(incomplete){s.down+=1;s=log(s,`${play}: incomplete.`)}else{
      s.ball+=yards;s.toGo-=yards;s=log(s,`${play}: ${yards>=0?'+':''}${yards} yards.`);
      if(s.ball>=100){s.score+=7;s=log(s,'TOUCHDOWN! +7 points.');s=opponentDrive({...s,ball:25,down:1,toGo:10});setG(finishIfNeeded(s));return}
      if(s.toGo<=0){s.down=1;s.toGo=Math.min(10,100-s.ball);s=log(s,`First down at ${s.ball>=50?'OPP '+(100-s.ball):'OWN '+s.ball}.`)}else{s.down+=1}
    }
    if(s.down>4){s=log(s,'Turnover on downs.');s=opponentDrive(s)}
    setG(finishIfNeeded(s));
  };
  const newGame=()=>setG(fresh());
  const nextWeek=()=>setG({...fresh(),wins:g.wins,losses:g.losses,week:g.week+1,fan:g.fan,coins:g.coins,last:[`Week ${g.week+1}: new matchup ready.`]});

  return <section className="gridiron-game">
    <div className="gridiron-scoreboard"><div><span>YOU</span><b>{g.score}</b></div><div className="gridiron-clock"><strong>{status}</strong><small>WEEK {g.week} · {g.wins}-{g.losses}</small></div><div><span>CPU</span><b>{g.opp}</b></div></div>
    <div className="gridiron-field" aria-label="Football field">
      <div className="endzone left">MG</div><div className="yardlines"></div><div className="ball-marker" style={{left:`${clamp(g.ball,4,96)}%`}}><i></i><span>{yardText}</span></div><div className="endzone right">PX</div>
    </div>
    <div className="gridiron-meta"><span><b>{g.down}</b> DOWN</span><span><b>{g.toGo}</b> TO GO</span><span><b>{yardText}</b> BALL</span><span><b>{g.energy}%</b> ENERGY</span></div>
    <div className="gridiron-controls">
      {(['Run','Quick Pass','Deep Pass','Field Goal','Punt'] as Play[]).map(p=><button key={p} onClick={()=>snap(p)} disabled={g.quarter>4}>{p}</button>)}
    </div>
    <div className="gridiron-bottom">
      <article><span>TEAM</span><div className="gridiron-bars"><label>Fan support <progress max="100" value={g.fan}/><b>{g.fan}</b></label><label>Energy <progress max="100" value={g.energy}/><b>{g.energy}</b></label></div><p>Credits: <b>{g.coins}</b> · Fictional teams and original mechanics.</p></article>
      <article><span>PLAY LOG</span><div className="play-log">{g.last.map((x,i)=><p key={i}>{x}</p>)}</div></article>
    </div>
    <div className="gridiron-actions"><label>Difficulty <select value={difficulty} onChange={e=>{setDifficulty(e.target.value);localStorage.setItem('mg-gridiron-diff',e.target.value)}}><option>Easy</option><option>Normal</option><option>Hard</option></select></label>{g.quarter>4&&<button onClick={nextWeek}>Next Week</button>}<button className="secondary" onClick={newGame}>Reset Career</button></div>
  </section>
}
