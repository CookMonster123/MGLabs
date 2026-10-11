const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});

async function handleAI(request,env){
  if(request.method!=='POST')return json({error:'Method not allowed.'},405);
  if(!env.AI_toliet)return json({error:'Workers AI binding is not configured.'},503);
  let body={};
  try{body=await request.json()}catch{return json({error:'Invalid JSON body.'},400)}
  const message=String(body?.message||'').trim();
  const system=String(body?.system||'You are a helpful MGLabs assistant.').trim();
  if(!message)return json({error:'Message is required.'},400);
  if(message.length>12000)return json({error:'Message is too long.'},413);
  try{
    const result=await env.AI_toliet.run('@cf/meta/llama-3.1-8b-instruct',{messages:[{role:'system',content:system},{role:'user',content:message}],max_tokens:700});
    const reply=String(result?.response||result?.result?.response||'').trim();
    if(!reply)return json({error:'AI returned an empty response.'},502);
    return json({reply});
  }catch(error){
    console.error('AI request failed',error);
    return json({error:'AI request failed. Try again later.'},502);
  }
}

export default {
  async fetch(request,env){
    const url=new URL(request.url);
    if(url.pathname==='/api/ai')return handleAI(request,env);
    return env.ASSETS.fetch(request);
  }
};
