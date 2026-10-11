import type {PersonalAgentHubRecord,PersonalAgentHubSettings} from './model';
const KEY='mglabs:v97-personal-agent-hub:records'; const SETTINGS='mglabs:v97-personal-agent-hub:settings';
const safe=<T,>(k:string,f:T):T=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):f}catch{return f}};
export const loadRecords=()=>safe<PersonalAgentHubRecord[]>(KEY,[]);
export const saveRecords=(v:PersonalAgentHubRecord[])=>localStorage.setItem(KEY,JSON.stringify(v));
export const loadSettings=()=>safe<PersonalAgentHubSettings>(SETTINGS,{enabled:true,compact:false,defaultStatus:'Planned',accent:'#ff78bd'});
export const saveSettings=(v:PersonalAgentHubSettings)=>localStorage.setItem(SETTINGS,JSON.stringify(v));
export const createRecord=(title:string,detail:string,status:PersonalAgentHubRecord['status']='Planned'):PersonalAgentHubRecord=>({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),title,detail,status,priority:2,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),tags:[],metric:0});
export const exportFeatureData=()=>{const blob=new Blob([JSON.stringify({records:loadRecords(),settings:loadSettings()},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='v97-personal-agent-hub.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)};
