// Money is represented as integer minor units (paise/cents), never float balances.
export function splitAmount(amount, members, mode = 'equal', values = {}) {
  if (!Number.isSafeInteger(amount) || amount <= 0 || amount > 1e10) throw Error('Enter a valid amount.');
  if (!members.length || new Set(members).size !== members.length) throw Error('Select at least one unique person.');
  const weights = members.map(id => mode === 'equal' ? 1 : Number(values[id] ?? 0));
  if (weights.some(w => !Number.isFinite(w) || w < 0)) throw Error('Split values must be positive.');
  const total = weights.reduce((a,b) => a+b,0);
  if (!total) throw Error('Enter split values.');
  if (mode === 'exact') {
    const cents = weights.map(v => Math.round(v * 100));
    if (cents.reduce((a,b)=>a+b,0) !== amount) throw Error('Exact amounts must add up to the expense.');
    return Object.fromEntries(members.map((m,i)=>[m,cents[i]]));
  }
  if (mode === 'percent' && Math.abs(total - 100) > .00001) throw Error('Percentages must add up to 100.');
  const raw = weights.map(w=>amount*w/total), rounded=raw.map(Math.floor);
  let remaining=amount-rounded.reduce((a,b)=>a+b,0);
  const order=raw.map((v,i)=>({i,r:v-rounded[i]})).sort((a,b)=>b.r-a.r);
  for(let i=0;i<remaining;i++) rounded[order[i%order.length].i]++;
  return Object.fromEntries(members.map((m,i)=>[m,rounded[i]]));
}
export function balances(expenses, settlements, currency='INR') {
  const result={}; const add=(id,v)=>result[id]=(result[id]||0)+v;
  for(const e of expenses.filter(e=>e.currency===currency)) { add(e.paidBy,e.amount); for(const [id,v] of Object.entries(e.splits)) add(id,-v); }
  for(const s of settlements.filter(s=>s.currency===currency)) {add(s.from,s.amount);add(s.to,-s.amount);}
  return result;
}
export function simplifyDebts(balance) {
  const creditors=Object.entries(balance).filter(([,v])=>v>0).map(([id,v])=>({id,v}));
  const debtors=Object.entries(balance).filter(([,v])=>v<0).map(([id,v])=>({id,v:-v}));
  const transfers=[];let i=0,j=0;
  while(i<debtors.length && j<creditors.length) { const amount=Math.min(debtors[i].v,creditors[j].v);transfers.push({from:debtors[i].id,to:creditors[j].id,amount});debtors[i].v-=amount;creditors[j].v-=amount;if(!debtors[i].v)i++;if(!creditors[j].v)j++; }
  return transfers;
}
