import {useMemo,useState} from 'react';
import type {CollaborationSuiteRecord} from './model';
import {loadRecords,saveRecords} from './service';
export function useCollaborationSuiteRecords(){const [records,setRecordsState]=useState<CollaborationSuiteRecord[]>(()=>loadRecords());const setRecords=(next:CollaborationSuiteRecord[])=>{setRecordsState(next);saveRecords(next)};const stats=useMemo(()=>({total:records.length,done:records.filter(x=>x.status==='Done').length,active:records.filter(x=>x.status==='Active').length,score:records.length?Math.round(records.reduce((a,b)=>a+b.metric,0)/records.length):0}),[records]);return{records,setRecords,stats}}
