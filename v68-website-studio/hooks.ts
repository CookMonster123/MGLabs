import {useMemo,useState} from 'react';
import type {WebsiteStudioRecord} from './model';
import {loadRecords,saveRecords} from './service';
export function useWebsiteStudioRecords(){const [records,setRecordsState]=useState<WebsiteStudioRecord[]>(()=>loadRecords());const setRecords=(next:WebsiteStudioRecord[])=>{setRecordsState(next);saveRecords(next)};const stats=useMemo(()=>({total:records.length,done:records.filter(x=>x.status==='Done').length,active:records.filter(x=>x.status==='Active').length,score:records.length?Math.round(records.reduce((a,b)=>a+b.metric,0)/records.length):0}),[records]);return{records,setRecords,stats}}
