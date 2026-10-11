import worker from '../worker/index.js';

const req=body=>new Request('https://mglabs.xyz/api/ai',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
const results=[];
const check=(name,ok)=>{results.push({name,ok});console.log(`${ok?'PASS':'FAIL'} | ${name}`)};
let r=await worker.fetch(req({message:'Hello'}),{ASSETS:{fetch:async()=>new Response('asset')},AI_toliet:null});
check('worker returns 503 when AI binding missing',r.status===503);
r=await worker.fetch(req({message:''}),{ASSETS:{fetch:async()=>new Response('asset')},AI_toliet:{run:async()=>({response:'unused'})}});
check('worker returns 400 for empty AI message',r.status===400);
r=await worker.fetch(req({message:'Hello'}),{ASSETS:{fetch:async()=>new Response('asset')},AI_toliet:{run:async()=>({response:'Mock AI response'})}});
const j=await r.json();check('worker AI success path',r.status===200&&j.reply==='Mock AI response');
r=await worker.fetch(new Request('https://mglabs.xyz/games'),{ASSETS:{fetch:async request=>new Response(`asset:${new URL(request.url).pathname}`)},AI_toliet:{run:async()=>({response:'x'})}});
check('non-API requests delegate to assets',await r.text()==='asset:/games');
if(results.some(x=>!x.ok))process.exit(1);
