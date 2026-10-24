export function martialWeightedIndex(weights){let r=Math.random()*weights.reduce((a,b)=>a+b,0);for(let i=0;i<weights.length;i++){r-=weights[i];if(r<0)return i}return weights.length-1}

export function martialPickN(arr,n){let a=[...arr],out=[];while(a.length&&out.length<n)out.push(a.splice(Math.floor(Math.random()*a.length),1)[0]);return out}
