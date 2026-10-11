import fs from 'node:fs';
const need=['package.json','index.html','src/App.tsx','src/styles.css','worker/index.js','wrangler.toml','public/mglabs-logo.svg'];
let fail=0;
for(const f of need){if(fs.existsSync(f))console.log('PASS',f);else{console.error('FAIL',f);fail++}}
const w=fs.readFileSync('wrangler.toml','utf8');
for(const s of ['main = "./worker/index.js"','binding = "ASSETS"','not_found_handling = "single-page-application"','binding = "AI_toliet"']){
 if(w.includes(s))console.log('PASS wrangler:',s);else{console.error('FAIL wrangler:',s);fail++}
}
if(fs.existsSync('public/_redirects')){console.error('FAIL public/_redirects should not exist for this Worker deployment');fail++}else console.log('PASS no conflicting _redirects');
process.exit(fail?1:0);
