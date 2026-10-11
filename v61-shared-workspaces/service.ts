import type {SharedWorkspacesRecord,SharedWorkspacesSettings} from './model';
const KEY='mglabs:v61-shared-workspaces:records'; const SETTINGS='mglabs:v61-shared-workspaces:settings';
const safe=<T,>(k:string,f:T):T=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):f}catch{return f}};
export const loadRecords=()=>safe<SharedWorkspacesRecord[]>(KEY,[]);
export const saveRecords=(v:SharedWorkspacesRecord[])=>localStorage.setItem(KEY,JSON.stringify(v));
export const loadSettings=()=>safe<SharedWorkspacesSettings>(SETTINGS,{enabled:true,compact:false,defaultStatus:'Planned',accent:'#ff78bd'});
export const saveSettings=(v:SharedWorkspacesSettings)=>localStorage.setItem(SETTINGS,JSON.stringify(v));
export const createRecord=(title:string,detail:string,status:SharedWorkspacesRecord['status']='Planned'):SharedWorkspacesRecord=>({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),title,detail,status,priority:2,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),tags:[],metric:0});
export const exportFeatureData=()=>{const blob=new Blob([JSON.stringify({records:loadRecords(),settings:loadSettings()},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='v61-shared-workspaces.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)};
