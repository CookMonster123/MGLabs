import type {AnalyticsGoalsRecord,AnalyticsGoalsSettings} from './model';
const KEY='mglabs:v44-analytics-goals:records'; const SETTINGS='mglabs:v44-analytics-goals:settings';
const safe=<T,>(k:string,f:T):T=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):f}catch{return f}};
export const loadRecords=()=>safe<AnalyticsGoalsRecord[]>(KEY,[]);
export const saveRecords=(v:AnalyticsGoalsRecord[])=>localStorage.setItem(KEY,JSON.stringify(v));
export const loadSettings=()=>safe<AnalyticsGoalsSettings>(SETTINGS,{enabled:true,compact:false,defaultStatus:'Planned',accent:'#ff78bd'});
export const saveSettings=(v:AnalyticsGoalsSettings)=>localStorage.setItem(SETTINGS,JSON.stringify(v));
export const createRecord=(title:string,detail:string,status:AnalyticsGoalsRecord['status']='Planned'):AnalyticsGoalsRecord=>({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),title,detail,status,priority:2,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),tags:[],metric:0});
export const exportFeatureData=()=>{const blob=new Blob([JSON.stringify({records:loadRecords(),settings:loadSettings()},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='v44-analytics-goals.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)};
