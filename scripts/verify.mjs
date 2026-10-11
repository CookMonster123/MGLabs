import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const root=process.cwd();
const results=[];
const pass=(name,detail='')=>results.push({ok:true,name,detail});
const fail=(name,detail='')=>results.push({ok:false,name,detail});
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>fs.existsSync(path.join(root,p));

const requiredFiles=[
  'index.html','package.json','vite.config.ts','tsconfig.json','src/main.tsx','src/App.tsx','src/styles.css',
  'src/components/MetroRush.tsx','src/components/VoxelFrontier.tsx','src/components/QuickGames.tsx','src/components/ExtraGames.tsx','src/components/GameBoundary.tsx',
  'worker/index.js','functions/api/ai.js','wrangler.toml','wrangler.pages.toml','public/_headers','public/data/mega-games.json','public/data/multiplayer-games.json'
];
for(const f of requiredFiles)(exists(f)?pass:fail)(`required file: ${f}`);

const jsonErrors=[];
const dirs=[root];
while(dirs.length){
  const dir=dirs.pop();
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    if(['node_modules','dist','.git'].includes(ent.name))continue;
    const full=path.join(dir,ent.name);
    if(ent.isDirectory())dirs.push(full);
    else if(ent.name.endsWith('.json')){try{JSON.parse(fs.readFileSync(full,'utf8'))}catch(e){jsonErrors.push(`${path.relative(root,full)}: ${e.message}`)}}
  }
}
jsonErrors.length?fail('all JSON parses',jsonErrors.join('; ')):pass('all JSON parses');

const app=read('src/App.tsx');
const css=read('src/styles.css');
const wrangler=read('wrangler.toml');
const headers=read('public/_headers');
const pkg=JSON.parse(read('package.json'));

const routes=['/launchpad','/apps','/games','/multiplayer','/retro-vault','/play','/brightpath','/codecoach','/projectforge','/device-lab','/community','/careerquest','/portfolio','/school-tools','/creative-lab','/store','/developer','/settings'];
for(const route of routes)app.includes(`'${route}'`)?pass(`route: ${route}`):fail(`route: ${route}`);

const themeSlugs=['light','neon','ocean','sunset','forest','cyberpunk','galaxy','midnight','aurora','arctic','volcano','retro-arcade','matrix','purple-storm','emerald','synthwave','blackout'];
for(const theme of themeSlugs)css.includes(`data-theme="${theme}"`)?pass(`theme CSS: ${theme}`):fail(`theme CSS: ${theme}`);
css.includes(':root{')?pass('default dark theme variables'):fail('default dark theme variables');

const games=['Metro Rush','Voxel Frontier','Reaction Grid','Number Sprint','Memory Match','Tap Rush','Pattern Recall','Color Rush'];
for(const game of games)app.includes(`name:'${game}'`)?pass(`built game registered: ${game}`):fail(`built game registered: ${game}`);
app.includes('<GameBoundary')?pass('game error boundary wired'):fail('game error boundary wired');
app.includes('Random Built Game')?pass('random built game control'):fail('random built game control');
app.includes('Recently played')?pass('game history section'):fail('game history section');

app.includes("useJsonCatalog('/data/mega-games.json')")?pass('mega catalog lazy-fetched'):fail('mega catalog lazy-fetched');
app.includes("useJsonCatalog('/data/multiplayer-games.json')")?pass('multiplayer catalog lazy-fetched'):fail('multiplayer catalog lazy-fetched');
!app.includes("import megaGames from")?pass('mega catalog removed from initial JS bundle'):fail('mega catalog removed from initial JS bundle');
!app.includes("import multiplayerGames from")?pass('multiplayer catalog removed from initial JS bundle'):fail('multiplayer catalog removed from initial JS bundle');

app.includes("fetch('/api/ai'")?pass('frontend AI endpoint wired'):fail('frontend AI endpoint wired');
app.includes('AI unavailable:')?pass('AI error states visible'):fail('AI error states visible');
app.includes('SIMULATION MODE')?pass('Device Lab simulation disclosure'):fail('Device Lab simulation disclosure');
app.includes('Export CSV')?pass('Device Lab CSV export'):fail('Device Lab CSV export');
app.includes('No tasks yet')?pass('ProjectForge honest empty states'):fail('ProjectForge honest empty states');
app.includes('Science Fair')&&app.includes('Coding Project')?pass('ProjectForge templates'):fail('ProjectForge templates');
app.includes('STUDY TIMER')&&app.includes('GRADE CALCULATOR')&&app.includes('QUICK NOTES')?pass('expanded School Tools'):fail('expanded School Tools');
app.includes('Poster Plan')&&app.includes('Presentation Plan')&&app.includes('UI Wireframe')?pass('expanded Creative Lab actions'):fail('expanded Creative Lab actions');
app.includes('Compare careers')?pass('CareerQuest compare flow'):fail('CareerQuest compare flow');
app.includes('Print / Save PDF')?pass('portfolio print/export action'):fail('portfolio print/export action');
app.includes('⌘K')&&app.includes('CommandPalette')?pass('command palette'):fail('command palette');
(app.includes('Theme gallery')||app.includes('Theme Studio'))&&(app.includes('Random Theme')||app.includes('Surprise Me'))?pass('theme gallery and randomizer'):fail('theme gallery and randomizer');
app.includes('Auto seasonal theme')?pass('seasonal theme option'):fail('seasonal theme option');
app.includes('Pin the tools')?pass('Launchpad pinning'):fail('Launchpad pinning');
app.includes('Game of the Day')||app.includes('GAME OF THE DAY')?pass('game of the day'):fail('game of the day');
app.includes('APP OF THE DAY')?pass('app of the day'):fail('app of the day');

wrangler.includes('main = "./worker/index.js"')?pass('Workers entry point configured'):fail('Workers entry point configured');
wrangler.includes('directory = "./dist"')?pass('Workers assets directory'):fail('Workers assets directory');
wrangler.includes('binding = "ASSETS"')?pass('Workers assets binding'):fail('Workers assets binding');
wrangler.includes('not_found_handling = "single-page-application"')?pass('Workers SPA fallback'):fail('Workers SPA fallback');
wrangler.includes('run_worker_first = [ "/api/*" ]')?pass('API routes run worker first'):fail('API routes run worker first');
wrangler.includes('[ai]')&&wrangler.includes('binding = "AI_toliet"')?pass('Workers AI binding configured'):fail('Workers AI binding configured');
wrangler.includes('[observability]')?pass('observability configured'):fail('observability configured');
headers.includes('X-Content-Type-Options: nosniff')?pass('security header nosniff'):fail('security header nosniff');

pkg.scripts?.['test:requirements']==='node scripts/verify.mjs'?pass('requirements script'):fail('requirements script');
pkg.scripts?.['test:worker']==='node scripts/verify-worker.mjs'?pass('worker test script'):fail('worker test script');
pkg.scripts?.['deploy:worker']==='wrangler deploy'?pass('worker deploy script'):fail('worker deploy script');
pkg.scripts?.['version:worker']==='wrangler versions upload'?pass('worker version script'):fail('worker version script');
pkg.scripts?.typecheck==='tsc --noEmit'?pass('typecheck script'):fail('typecheck script');
pkg.scripts?.build==='vite build'?pass('vite build script'):fail('vite build script');

const sourceFiles=[];const stack=[path.join(root,'src')];
while(stack.length){const dir=stack.pop();for(const ent of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,ent.name);if(ent.isDirectory())stack.push(full);else if(/\.(ts|tsx)$/.test(ent.name))sourceFiles.push(full)}}
const missingImports=[];const importRe=/from\s+['"](\.[^'"]+)['"]/g;
for(const file of sourceFiles){const source=fs.readFileSync(file,'utf8');let m;while((m=importRe.exec(source))){const base=path.resolve(path.dirname(file),m[1]);const c=[base,base+'.ts',base+'.tsx',base+'.js',base+'.jsx',base+'.json',path.join(base,'index.ts'),path.join(base,'index.tsx')];if(!c.some(fs.existsSync))missingImports.push(`${path.relative(root,file)} -> ${m[1]}`)}}
missingImports.length?fail('relative imports resolve',missingImports.join('; ')):pass('relative imports resolve');

try{
  const worker=(await import(pathToFileURL(path.join(root,'worker/index.js')).href+`?t=${Date.now()}`)).default;
  const req=body=>new Request('https://mglabs.xyz/api/ai',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
  let res=await worker.fetch(req({message:'Hello'}),{ASSETS:{fetch:async()=>new Response('asset')},AI_toliet:null});
  res.status===503?pass('Worker AI missing binding -> 503'):fail('Worker AI missing binding -> 503',`status ${res.status}`);
  res=await worker.fetch(req({message:''}),{ASSETS:{fetch:async()=>new Response('asset')},AI_toliet:{run:async()=>({response:'unused'})}});
  res.status===400?pass('Worker AI empty prompt -> 400'):fail('Worker AI empty prompt -> 400',`status ${res.status}`);
  res=await worker.fetch(req({message:'Hello'}),{ASSETS:{fetch:async()=>new Response('asset')},AI_toliet:{run:async()=>({response:'Mock AI response'})}});
  const body=await res.json();(res.status===200&&body.reply==='Mock AI response')?pass('Worker AI success path'):fail('Worker AI success path');
  res=await worker.fetch(new Request('https://mglabs.xyz/games'),{ASSETS:{fetch:async request=>new Response(`asset:${new URL(request.url).pathname}`)},AI_toliet:{run:async()=>({response:'x'})}});
  (await res.text())==='asset:/games'?pass('Worker non-API delegates to static assets'):fail('Worker non-API delegates to static assets');
}catch(e){fail('Worker executable test',e.stack||e.message)}

const failed=results.filter(x=>!x.ok);
console.log(`MGLabs Version 22 mega-upgrade verification`);
console.log(`PASS: ${results.length-failed.length}`);
console.log(`FAIL: ${failed.length}`);
for(const r of results)console.log(`${r.ok?'PASS':'FAIL'} | ${r.name}${r.detail?' | '+r.detail:''}`);
if(failed.length)process.exit(1);
