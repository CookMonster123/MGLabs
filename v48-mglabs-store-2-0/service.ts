import type {MGLabsStore20Record,MGLabsStore20Settings} from './model';
const KEY='mglabs:v48-mglabs-store-2-0:records'; const SETTINGS='mglabs:v48-mglabs-store-2-0:settings';
const safe=<T,>(k:string,f:T):T=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):f}catch{return f}};
export const loadRecords=()=>safe<MGLabsStore20Record[]>(KEY,[]);
export const saveRecords=(v:MGLabsStore20Record[])=>localStorage.setItem(KEY,JSON.stringify(v));
export const loadSettings=()=>safe<MGLabsStore20Settings>(SETTINGS,{enabled:true,compact:false,defaultStatus:'Planned',accent:'#ff78bd'});
export const saveSettings=(v:MGLabsStore20Settings)=>localStorage.setItem(SETTINGS,JSON.stringify(v));
export const createRecord=(title:string,detail:string,status:MGLabsStore20Record['status']='Planned'):MGLabsStore20Record=>({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),title,detail,status,priority:2,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),tags:[],metric:0});
export const exportFeatureData=()=>{const blob=new Blob([JSON.stringify({records:loadRecords(),settings:loadSettings()},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='v48-mglabs-store-2-0.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)};
