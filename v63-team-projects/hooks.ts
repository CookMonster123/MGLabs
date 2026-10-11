import {useMemo,useState} from 'react';
import type {TeamProjectsRecord} from './model';
import {loadRecords,saveRecords} from './service';
export function useTeamProjectsRecords(){const [records,setRecordsState]=useState<TeamProjectsRecord[]>(()=>loadRecords());const setRecords=(next:TeamProjectsRecord[])=>{setRecordsState(next);saveRecords(next)};const stats=useMemo(()=>({total:records.length,done:records.filter(x=>x.status==='Done').length,active:records.filter(x=>x.status==='Active').length,score:records.length?Math.round(records.reduce((a,b)=>a+b.metric,0)/records.length):0}),[records]);return{records,setRecords,stats}}
