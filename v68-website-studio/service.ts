import type {WebsiteStudioRecord,WebsiteStudioSettings} from './model';
const KEY='mglabs:v68-website-studio:records'; const SETTINGS='mglabs:v68-website-studio:settings';
const safe=<T,>(k:string,f:T):T=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):f}catch{return f}};
export const loadRecords=()=>safe<WebsiteStudioRecord[]>(KEY,[]);
export const saveRecords=(v:WebsiteStudioRecord[])=>localStorage.setItem(KEY,JSON.stringify(v));
export const loadSettings=()=>safe<WebsiteStudioSettings>(SETTINGS,{enabled:true,compact:false,defaultStatus:'Planned',accent:'#ff78bd'});
export const saveSettings=(v:WebsiteStudioSettings)=>localStorage.setItem(SETTINGS,JSON.stringify(v));
export const createRecord=(title:string,detail:string,status:WebsiteStudioRecord['status']='Planned'):WebsiteStudioRecord=>({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),title,detail,status,priority:2,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),tags:[],metric:0});
export const exportFeatureData=()=>{const blob=new Blob([JSON.stringify({records:loadRecords(),settings:loadSettings()},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='v68-website-studio.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)};
