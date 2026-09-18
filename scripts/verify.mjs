
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const root=process.cwd(), results=[];
const ok=(n)=>results.push([true,n]), bad=(n)=>results.push([false,n]);
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
for(const f of ['index.html','package.json','vite.config.ts','tsconfig.json','src/main.tsx','src/App.tsx','src/styles.css','functions/api/ai.js','wrangler.toml','public/_redirects','public/_headers']) fs.existsSync(path.join(root,f))?ok('file '+f):bad('file '+f);
for(const f of fs.readdirSync(path.join(root,'src')).filter(x=>x.endsWith('.json'))) { try{JSON.parse(read('src/'+f));ok('json '+f)}catch{bad('json '+f)} }
const app=read('src/App.tsx'), css=read('src/styles.css'), wr=read('wrangler.toml'), red=read('public/_redirects'), hdr=read('public/_headers');
for(const r of ['/launchpad','/apps','/games','/multiplayer','/retro-vault','/play','/brightpath','/codecoach','/projectforge','/device-lab','/community','/careerquest','/portfolio','/school-tools','/creative-lab','/store','/developer','/settings']) app.includes(`'${r}'`)?ok('route '+r):bad('route '+r);
red.includes('/* /index.html 200')?ok('SPA fallback'):bad('SPA fallback');
wr.includes('binding = "AI"')?ok('AI binding'):bad('AI binding');
wr.includes('pages_build_output_dir = "./dist"')?ok('dist output'):bad('dist output');
hdr.includes('X-Content-Type-Options: nosniff')?ok('security header'):bad('security header');
for(const t of ['light','neon','ocean','sunset','forest']) css.includes(`data-theme="${t}"`)?ok('theme '+t):bad('theme '+t);
for(const g of ['MetroRush','VoxelFrontier','ReactionGrid','NumberSprint','MemoryMatch']) app.includes(g)?ok('game '+g):bad('game '+g);
app.includes("fetch('/api/ai'")?ok('AI frontend'):bad('AI frontend');
app.includes('SIMULATION MODE')?ok('simulation disclosure'):bad('simulation disclosure');
app.includes('Export CSV')?ok('CSV export'):bad('CSV export');
app.includes('No tasks yet')?ok('honest Kanban empty state'):bad('honest Kanban empty state');
app.includes("['Poster plan','Video script','Thumbnail plan','UI wireframe']")?ok('Creative actions'):bad('Creative actions');
try{
  const mod=await import(pathToFileURL(path.join(root,'functions/api/ai.js')).href+'?x='+Date.now());
  const req=b=>new Request('https://mglabs.xyz/api/ai',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(b)});
  let r=await mod.onRequestPost({request:req({message:'Hi'}),env:{}}); r.status===503?ok('AI missing binding 503'):bad('AI missing binding 503');
  r=await mod.onRequestPost({request:req({message:''}),env:{AI:{run:async()=>({response:'x'})}}}); r.status===400?ok('AI empty prompt 400'):bad('AI empty prompt 400');
  r=await mod.onRequestPost({request:req({message:'Hi'}),env:{AI:{run:async()=>({response:'Mock'})}}}); const j=await r.json(); (r.status===200&&j.reply==='Mock')?ok('AI mock success'):bad('AI mock success');
}catch(e){bad('AI handler executable')}
const fails=results.filter(x=>!x[0]); console.log('PASS:',results.length-fails.length); console.log('FAIL:',fails.length); for(const [p,n] of results) console.log((p?'PASS':'FAIL')+' | '+n); if(fails.length)process.exit(1);
