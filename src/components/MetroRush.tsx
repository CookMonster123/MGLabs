import {useEffect,useRef,useState} from 'react';

export default function MetroRush(){
  const canvas=useRef<HTMLCanvasElement|null>(null);
  const [running,setRunning]=useState(false);
  const [score,setScore]=useState(0);
  const [best,setBest]=useState(()=>Number(localStorage.getItem('metro-best')||0));

  useEffect(()=>{
    const c=canvas.current!;if(!c)return;
    const ctx=c.getContext('2d')!;
    let raf=0, alive=true, lane=1, y=400, vy=0, duck=0, speed=6, s=0, tick=0;
    let obstacles:{lane:number,y:number,type:'block'|'bar'}[]=[];
    let coins:{lane:number,y:number}[]=[];
    const laneX=(l:number)=>120+l*110;

    function reset(){
      lane=1;y=400;vy=0;duck=0;speed=6;s=0;tick=0;obstacles=[];coins=[];alive=true;
    }
    if(running) reset();

    function key(e:KeyboardEvent){
      if(!running||!alive)return;
      if((e.key==='ArrowLeft'||e.key==='a')&&lane>0)lane--;
      if((e.key==='ArrowRight'||e.key==='d')&&lane<2)lane++;
      if((e.key==='ArrowUp'||e.key==='w'||e.key===' ')&&y>=400){vy=-13}
      if(e.key==='ArrowDown'||e.key==='s')duck=28;
    }
    addEventListener('keydown',key);

    let sx=0,sy=0;
    function touchStart(e:TouchEvent){sx=e.touches[0].clientX;sy=e.touches[0].clientY}
    function touchEnd(e:TouchEvent){
      if(!running||!alive)return;
      const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;
      if(Math.abs(dx)>Math.abs(dy)){if(dx>25&&lane<2)lane++;if(dx<-25&&lane>0)lane--}
      else{if(dy<-25&&y>=400)vy=-13;if(dy>25)duck=28}
    }
    c.addEventListener('touchstart',touchStart,{passive:true});c.addEventListener('touchend',touchEnd,{passive:true});

    function draw(){
      ctx.clearRect(0,0,c.width,c.height);
      const g=ctx.createLinearGradient(0,0,0,c.height);g.addColorStop(0,'#071017');g.addColorStop(1,'#12314a');ctx.fillStyle=g;ctx.fillRect(0,0,c.width,c.height);
      ctx.fillStyle='#182b35';ctx.fillRect(60,0,400,500);
      ctx.strokeStyle='#3a5967';ctx.lineWidth=3;
      [175,285,395].forEach(x=>{ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,500);ctx.stroke()});
      for(let i=0;i<30;i++){const yy=(i*55+(tick*speed)%55);ctx.strokeStyle='#27434f';ctx.beginPath();ctx.moveTo(70,yy);ctx.lineTo(450,yy);ctx.stroke()}
      coins.forEach(o=>{ctx.fillStyle='#ffd75a';ctx.beginPath();ctx.arc(laneX(o.lane),o.y,9,0,Math.PI*2);ctx.fill()});
      obstacles.forEach(o=>{ctx.fillStyle=o.type==='block'?'#ff6f61':'#c879ff';if(o.type==='block')ctx.fillRect(laneX(o.lane)-28,o.y-38,56,38);else ctx.fillRect(laneX(o.lane)-35,o.y-70,70,14)});
      ctx.fillStyle='#45e0b1';const h=duck>0?30:58;ctx.fillRect(laneX(lane)-22,y-h,44,h);
      ctx.fillStyle='#fff';ctx.font='bold 18px system-ui';ctx.fillText(`Score ${Math.floor(s)}`,16,28);ctx.fillText(`Speed ${speed.toFixed(1)}`,16,52);
      if(!running){ctx.fillStyle='#ffffffcc';ctx.font='bold 24px system-ui';ctx.fillText('Press Start',190,235)}
      if(running&&!alive){ctx.fillStyle='#071017dd';ctx.fillRect(100,180,320,120);ctx.fillStyle='#fff';ctx.font='bold 26px system-ui';ctx.fillText('Run Over',200,225);ctx.font='16px system-ui';ctx.fillText(`Score: ${Math.floor(s)}`,210,255)}
    }

    function loop(){
      if(running&&alive){
        tick++;s+=0.12*speed;speed=Math.min(14,6+s/900);
        vy+=0.7;y+=vy;if(y>400){y=400;vy=0}if(duck>0)duck--;
        if(tick%70===0)obstacles.push({lane:Math.floor(Math.random()*3),y:-20,type:Math.random()<.7?'block':'bar'});
        if(tick%38===0)coins.push({lane:Math.floor(Math.random()*3),y:-20});
        obstacles.forEach(o=>o.y+=speed);coins.forEach(o=>o.y+=speed);
        obstacles=obstacles.filter(o=>o.y<540);coins=coins.filter(o=>o.y<540);
        coins=coins.filter(o=>{if(o.lane===lane&&Math.abs(o.y-(y-25))<34){s+=25;return false}return true});
        for(const o of obstacles){
          if(o.lane!==lane||Math.abs(o.y-y)>42)continue;
          const jumping=y<350,ducking=duck>0;
          if((o.type==='block'&&!jumping)||(o.type==='bar'&&!ducking)){alive=false;setScore(Math.floor(s));const b=Math.max(best,Math.floor(s));setBest(b);localStorage.setItem('metro-best',String(b));break}
        }
      }
      draw();raf=requestAnimationFrame(loop);
    }
    loop();
    return()=>{cancelAnimationFrame(raf);removeEventListener('keydown',key);c.removeEventListener('touchstart',touchStart);c.removeEventListener('touchend',touchEnd)}
  },[running]);

  return <div className="play-game"><div><h2>Metro Rush</h2><p>Original MGLabs endless runner. Arrow keys / WASD or swipe. Jump over blocks and duck under bars.</p><button onClick={()=>setRunning(x=>!x)}>{running?'Restart':'Start game'}</button><span>Best: {best}</span></div><canvas ref={canvas} width={520} height={500}/></div>
}
