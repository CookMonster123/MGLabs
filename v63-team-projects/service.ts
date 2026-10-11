import type {TeamProjectsRecord,TeamProjectsSettings} from './model';
const KEY='mglabs:v63-team-projects:records'; const SETTINGS='mglabs:v63-team-projects:settings';
const safe=<T,>(k:string,f:T):T=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):f}catch{return f}};
export const loadRecords=()=>safe<TeamProjectsRecord[]>(KEY,[]);
export const saveRecords=(v:TeamProjectsRecord[])=>localStorage.setItem(KEY,JSON.stringify(v));
export const loadSettings=()=>safe<TeamProjectsSettings>(SETTINGS,{enabled:true,compact:false,defaultStatus:'Planned',accent:'#ff78bd'});
export const saveSettings=(v:TeamProjectsSettings)=>localStorage.setItem(SETTINGS,JSON.stringify(v));
export const createRecord=(title:string,detail:string,status:TeamProjectsRecord['status']='Planned'):TeamProjectsRecord=>({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),title,detail,status,priority:2,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),tags:[],metric:0});
export const exportFeatureData=()=>{const blob=new Blob([JSON.stringify({records:loadRecords(),settings:loadSettings()},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='v63-team-projects.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)};
