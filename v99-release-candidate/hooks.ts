import {useMemo,useState} from 'react';
import type {ReleaseCandidateRecord} from './model';
import {loadRecords,saveRecords} from './service';
export function useReleaseCandidateRecords(){const [records,setRecordsState]=useState<ReleaseCandidateRecord[]>(()=>loadRecords());const setRecords=(next:ReleaseCandidateRecord[])=>{setRecordsState(next);saveRecords(next)};const stats=useMemo(()=>({total:records.length,done:records.filter(x=>x.status==='Done').length,active:records.filter(x=>x.status==='Active').length,score:records.length?Math.round(records.reduce((a,b)=>a+b.metric,0)/records.length):0}),[records]);return{records,setRecords,stats}}
