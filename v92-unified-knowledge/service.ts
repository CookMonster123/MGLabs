import type {UnifiedKnowledgeRecord,UnifiedKnowledgeSettings} from './model';
const KEY='mglabs:v92-unified-knowledge:records'; const SETTINGS='mglabs:v92-unified-knowledge:settings';
const safe=<T,>(k:string,f:T):T=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):f}catch{return f}};
export const loadRecords=()=>safe<UnifiedKnowledgeRecord[]>(KEY,[]);
export const saveRecords=(v:UnifiedKnowledgeRecord[])=>localStorage.setItem(KEY,JSON.stringify(v));
export const loadSettings=()=>safe<UnifiedKnowledgeSettings>(SETTINGS,{enabled:true,compact:false,defaultStatus:'Planned',accent:'#ff78bd'});
export const saveSettings=(v:UnifiedKnowledgeSettings)=>localStorage.setItem(SETTINGS,JSON.stringify(v));
export const createRecord=(title:string,detail:string,status:UnifiedKnowledgeRecord['status']='Planned'):UnifiedKnowledgeRecord=>({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),title,detail,status,priority:2,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),tags:[],metric:0});
export const exportFeatureData=()=>{const blob=new Blob([JSON.stringify({records:loadRecords(),settings:loadSettings()},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='v92-unified-knowledge.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)};
