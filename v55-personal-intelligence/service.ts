import type {PersonalIntelligenceRecord,PersonalIntelligenceSettings} from './model';
const KEY='mglabs:v55-personal-intelligence:records'; const SETTINGS='mglabs:v55-personal-intelligence:settings';
const safe=<T,>(k:string,f:T):T=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):f}catch{return f}};
export const loadRecords=()=>safe<PersonalIntelligenceRecord[]>(KEY,[]);
export const saveRecords=(v:PersonalIntelligenceRecord[])=>localStorage.setItem(KEY,JSON.stringify(v));
export const loadSettings=()=>safe<PersonalIntelligenceSettings>(SETTINGS,{enabled:true,compact:false,defaultStatus:'Planned',accent:'#ff78bd'});
export const saveSettings=(v:PersonalIntelligenceSettings)=>localStorage.setItem(SETTINGS,JSON.stringify(v));
export const createRecord=(title:string,detail:string,status:PersonalIntelligenceRecord['status']='Planned'):PersonalIntelligenceRecord=>({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),title,detail,status,priority:2,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),tags:[],metric:0});
export const exportFeatureData=()=>{const blob=new Blob([JSON.stringify({records:loadRecords(),settings:loadSettings()},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='v55-personal-intelligence.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)};
