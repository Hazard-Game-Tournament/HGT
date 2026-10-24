export function powerExact(stage){if(stage.startsWith('1'))return 1+Math.floor(Math.random()*49);if(stage.startsWith('50'))return 50+Math.floor(Math.random()*41);return 91+Math.floor(Math.random()*10)}

export function weightedPick(opts){let total=opts.reduce((s,o)=>s+o.weight,0),r=Math.random()*total;for(let i=0;i<opts.length;i++){r-=opts[i].weight;if(r<0)return i}return opts.length-1}

export function readableText(hex){if(!hex||hex[0]!=='#')return'#fff';let h=hex.slice(1);if(h.length===3)h=h.split('').map(x=>x+x).join('');let r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);return (r*299+g*587+b*114)/1000>160?'#111827':'#fff'}
