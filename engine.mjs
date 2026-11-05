export const adjacent=(a,b,w)=>Math.abs(a%w-b%w)+Math.abs(Math.floor(a/w)-Math.floor(b/w))===1;
export const initial=l=>({cells:[...l.cells],moves:[],status:'playing'});
export function moves(l,s){const a=[];s.cells.forEach((v,i)=>{if(v===null)return;s.cells.forEach((u,j)=>{if(u===null||!adjacent(i,j,l.width))return;a.push([i,j,'mul']);if(v>=u)a.push([i,j,'div'])})});return a}
export function step(l,s,[i,j,op]){if(s.status!=='playing'||!moves(l,s).some(m=>m[0]===i&&m[1]===j&&m[2]===op))return s;const cells=[...s.cells];cells[j]=op==='mul'?cells[i]+cells[j]:cells[i]-cells[j];cells[i]=null;const t={cells,moves:[...s.moves,[i,j,op]],status:'playing'},left=cells.filter(v=>v!==null);if(left.length===1)t.status=left[0]===l.target?'won':'lost';else if(!moves(l,t).length)t.status='lost';return t}
export function solve(l,s=initial(l),memo=new Set()){if(s.status==='won')return[];if(s.status==='lost')return null;const k=s.cells.join(',');if(memo.has(k))return null;memo.add(k);for(const m of moves(l,s)){const tail=solve(l,step(l,s,m),memo);if(tail)return[m,...tail]}return null}
export function restore(l,actions){let s=initial(l);for(const a of Array.isArray(actions)?actions:[])s=step(l,s,a);return s}
export function power(n,base='a'){return n===0?'1':n===1?base:`${base}^{${n}}`}
