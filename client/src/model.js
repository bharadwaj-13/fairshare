import {balances,simplifyDebts} from '../../server/domain.js';
export const newId=()=>crypto.randomUUID();
export function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
const formatters=new Map();
export function money(amount,currency='INR'){const key=currency+':'+(amount%100!==0);if(!formatters.has(key))formatters.set(key,new Intl.NumberFormat('en-IN',{style:'currency',currency,maximumFractionDigits:amount%100?2:0}));return formatters.get(key).format(amount/100);}
export function readLocal(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
export function writeLocal(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{}}
export const blankState=(person={id:'you',name:'You',email:'',color:'purple'})=>({people:[person],groups:[],expenses:[],settlements:[],activity:[]});
export function parseQuickEntry(text){const match=text.trim().match(/^(.+?)\s+(?:(INR|USD|EUR|GBP|₹|\$|€|£)\s*)?([\d,]+(?:\.\d{1,2})?)$/i);if(!match)return null;if(match[3].includes(',')&&!/^(?:\d{1,3}(?:,\d{3})+|\d{1,2}(?:,\d{2})*,\d{3})(?:\.\d{1,2})?$/.test(match[3]))return null;const normalized=match[3].replaceAll(',','');if(!/^(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(normalized))return null;const amount=Math.round(Number(normalized)*100);if(!Number.isSafeInteger(amount)||amount<=0||amount>1e10)return null;const codes={'₹':'INR','$':'USD','€':'EUR','£':'GBP'};return {description:match[1].trim(),amount,currency:match[2]?(codes[match[2]]||match[2].toUpperCase()):null};}
export function summarize(state,currency,me){
 const byGroup=new Map(state.groups.map(g=>[g.id,{group:g,expenses:[],settlements:[],balance:{},transfers:[]}]));
 const expenses=state.expenses.filter(e=>e.currency===currency),settlements=state.settlements.filter(e=>e.currency===currency);
 for(const e of expenses)byGroup.get(e.groupId)?.expenses.push(e);
 for(const s of settlements)byGroup.get(s.groupId)?.settlements.push(s);
 const transfers=[];for(const [id,bucket] of byGroup){bucket.balance=balances(bucket.expenses,bucket.settlements,currency);bucket.transfers=simplifyDebts(bucket.balance).map(t=>({...t,groupId:id}));transfers.push(...bucket.transfers);}
 const mine=transfers.filter(t=>t.from===me||t.to===me);
 return {byGroup,expenses,settlements,transfers,mine,owed:mine.filter(t=>t.to===me).reduce((a,t)=>a+t.amount,0),owe:mine.filter(t=>t.from===me).reduce((a,t)=>a+t.amount,0),spend:expenses.reduce((a,e)=>a+(e.splits[me]||0),0)};
}
export function possibleDuplicate(expenses,candidate){return expenses.find(e=>e.id!==candidate.id&&e.description.trim().toLowerCase()===candidate.description.trim().toLowerCase()&&e.amount===candidate.amount&&e.currency===candidate.currency&&e.groupId===candidate.groupId&&e.date===candidate.date&&e.paidBy===candidate.paidBy);}
export function searchExpenses(expenses,people,groups,query){const q=query.trim().toLowerCase();if(!q)return expenses;const p=new Map(people.map(p=>[p.id,p.name])),g=new Map(groups.map(g=>[g.id,g.name]));return expenses.filter(e=>[e.description,e.notes,e.category,p.get(e.paidBy),g.get(e.groupId)].join(' ').toLowerCase().includes(q));}
