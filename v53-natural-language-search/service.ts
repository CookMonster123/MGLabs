import type {NaturalLanguageSearchRecord,NaturalLanguageSearchSettings} from './model';
const KEY='mglabs:v53-natural-language-search:records'; const SETTINGS='mglabs:v53-natural-language-search:settings';
const safe=<T,>(k:string,f:T):T=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):f}catch{return f}};
export const loadRecords=()=>safe<NaturalLanguageSearchRecord[]>(KEY,[]);
export const saveRecords=(v:NaturalLanguageSearchRecord[])=>localStorage.setItem(KEY,JSON.stringify(v));
export const loadSettings=()=>safe<NaturalLanguageSearchSettings>(SETTINGS,{enabled:true,compact:false,defaultStatus:'Planned',accent:'#ff78bd'});
export const saveSettings=(v:NaturalLanguageSearchSettings)=>localStorage.setItem(SETTINGS,JSON.stringify(v));
export const createRecord=(title:string,detail:string,status:NaturalLanguageSearchRecord['status']='Planned'):NaturalLanguageSearchRecord=>({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),title,detail,status,priority:2,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),tags:[],metric:0});
export const exportFeatureData=()=>{const blob=new Blob([JSON.stringify({records:loadRecords(),settings:loadSettings()},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='v53-natural-language-search.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)};
