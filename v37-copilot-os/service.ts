import type {CopilotOSRecord,CopilotOSSettings} from './model';
const KEY='mglabs:v37-copilot-os:records'; const SETTINGS='mglabs:v37-copilot-os:settings';
const safe=<T,>(k:string,f:T):T=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):f}catch{return f}};
export const loadRecords=()=>safe<CopilotOSRecord[]>(KEY,[]);
export const saveRecords=(v:CopilotOSRecord[])=>localStorage.setItem(KEY,JSON.stringify(v));
export const loadSettings=()=>safe<CopilotOSSettings>(SETTINGS,{enabled:true,compact:false,defaultStatus:'Planned',accent:'#ff78bd'});
export const saveSettings=(v:CopilotOSSettings)=>localStorage.setItem(SETTINGS,JSON.stringify(v));
export const createRecord=(title:string,detail:string,status:CopilotOSRecord['status']='Planned'):CopilotOSRecord=>({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),title,detail,status,priority:2,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),tags:[],metric:0});
export const exportFeatureData=()=>{const blob=new Blob([JSON.stringify({records:loadRecords(),settings:loadSettings()},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='v37-copilot-os.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)};
