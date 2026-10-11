import type {OpportunityCenterRecord,OpportunityCenterSettings} from './model';
const KEY='mglabs:v43-opportunity-center:records'; const SETTINGS='mglabs:v43-opportunity-center:settings';
const safe=<T,>(k:string,f:T):T=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):f}catch{return f}};
export const loadRecords=()=>safe<OpportunityCenterRecord[]>(KEY,[]);
export const saveRecords=(v:OpportunityCenterRecord[])=>localStorage.setItem(KEY,JSON.stringify(v));
export const loadSettings=()=>safe<OpportunityCenterSettings>(SETTINGS,{enabled:true,compact:false,defaultStatus:'Planned',accent:'#ff78bd'});
export const saveSettings=(v:OpportunityCenterSettings)=>localStorage.setItem(SETTINGS,JSON.stringify(v));
export const createRecord=(title:string,detail:string,status:OpportunityCenterRecord['status']='Planned'):OpportunityCenterRecord=>({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),title,detail,status,priority:2,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),tags:[],metric:0});
export const exportFeatureData=()=>{const blob=new Blob([JSON.stringify({records:loadRecords(),settings:loadSettings()},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='v43-opportunity-center.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)};
