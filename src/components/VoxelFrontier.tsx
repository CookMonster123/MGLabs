import {useEffect,useRef,useState} from 'react';

const W=18,H=12,S=28;
type Block=0|1|2|3|4;
const names=['Air','Grass','Dirt','Stone','Wood'];

export default function VoxelFrontier(){
 const ref=useRef<HTMLCanvasElement|null>(null);
 const [world,setWorld]=useState<Block[][]>(()=>Array.from({length:H},(_,y)=>Array.from({length:W},()=>y<5?0:y===5?1:y<9?2:3) as Block[]));
 const [selected,setSelected]=useState<Block>(1);
 const [inventory,setInventory]=useState<Record<number,number>>({1:20,2:20,3:10,4:12});

 useEffect(()=>{
   const c=ref.current;if(!c)return;const ctx=c.getContext('2d')!;
   ctx.clearRect(0,0,c.width,c.height);
   const colors=['#0b2435','#55b86a','#8a5a35','#66717b','#9a673d'];
   for(let y=0;y<H;y++)for(let x=0;x<W;x++){
     const b=world[y][x];ctx.fillStyle=colors[b];ctx.fillRect(x*S,y*S,S-1,S-1);
     if(b===0){ctx.strokeStyle='#17384a';ctx.strokeRect(x*S,y*S,S-1,S-1)}
   }
 },[world]);

 function click(e:React.MouseEvent<HTMLCanvasElement>){
   const r=e.currentTarget.getBoundingClientRect(),x=Math.floor((e.clientX-r.left)/r.width*W),y=Math.floor((e.clientY-r.top)/r.height*H);
   if(x<0||x>=W||y<0||y>=H)return;
   const next=world.map(row=>[...row]) as Block[][];
   const current=next[y][x];
   if(e.shiftKey){
      if(current!==0){next[y][x]=0;setInventory(inv=>({...inv,[current]:(inv[current]||0)+1}))}
   }else{
      if(current===0&&(inventory[selected]||0)>0){next[y][x]=selected;setInventory(inv=>({...inv,[selected]:inv[selected]-1}))}
   }
   setWorld(next);
 }
 return <div className="play-game"><div><h2>Voxel Frontier: Build Mode</h2><p>Original lightweight block sandbox. Click empty cells to place blocks. Hold Shift + click to mine blocks.</p><div className="hotbar">{([1,2,3,4] as Block[]).map(b=><button className={selected===b?'active':''} key={b} onClick={()=>setSelected(b)}>{names[b]} ({inventory[b]||0})</button>)}</div></div><canvas ref={ref} onClick={click} width={W*S} height={H*S}/></div>
}
