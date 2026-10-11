import type {OrganizationConsoleRecord,OrganizationConsoleSettings} from './model';
const KEY='mglabs:v73-organization-console:records'; const SETTINGS='mglabs:v73-organization-console:settings';
const safe=<T,>(k:string,f:T):T=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):f}catch{return f}};
export const loadRecords=()=>safe<OrganizationConsoleRecord[]>(KEY,[]);
export const saveRecords=(v:OrganizationConsoleRecord[])=>localStorage.setItem(KEY,JSON.stringify(v));
export const loadSettings=()=>safe<OrganizationConsoleSettings>(SETTINGS,{enabled:true,compact:false,defaultStatus:'Planned',accent:'#ff78bd'});
export const saveSettings=(v:OrganizationConsoleSettings)=>localStorage.setItem(SETTINGS,JSON.stringify(v));
export const createRecord=(title:string,detail:string,status:OrganizationConsoleRecord['status']='Planned'):OrganizationConsoleRecord=>({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),title,detail,status,priority:2,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),tags:[],metric:0});
export const exportFeatureData=()=>{const blob=new Blob([JSON.stringify({records:loadRecords(),settings:loadSettings()},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='v73-organization-console.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)};
