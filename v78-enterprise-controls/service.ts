import type {EnterpriseControlsRecord,EnterpriseControlsSettings} from './model';
const KEY='mglabs:v78-enterprise-controls:records'; const SETTINGS='mglabs:v78-enterprise-controls:settings';
const safe=<T,>(k:string,f:T):T=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):f}catch{return f}};
export const loadRecords=()=>safe<EnterpriseControlsRecord[]>(KEY,[]);
export const saveRecords=(v:EnterpriseControlsRecord[])=>localStorage.setItem(KEY,JSON.stringify(v));
export const loadSettings=()=>safe<EnterpriseControlsSettings>(SETTINGS,{enabled:true,compact:false,defaultStatus:'Planned',accent:'#ff78bd'});
export const saveSettings=(v:EnterpriseControlsSettings)=>localStorage.setItem(SETTINGS,JSON.stringify(v));
export const createRecord=(title:string,detail:string,status:EnterpriseControlsRecord['status']='Planned'):EnterpriseControlsRecord=>({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),title,detail,status,priority:2,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),tags:[],metric:0});
export const exportFeatureData=()=>{const blob=new Blob([JSON.stringify({records:loadRecords(),settings:loadSettings()},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='v78-enterprise-controls.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)};
