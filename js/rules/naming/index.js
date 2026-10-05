export function namingStyleFor(culture='',race=''){const c=culture||'',r=race||'';
 // Culture is primary when it has a clear existing phonetic family.
 if(/Nexus|Technopolit|techno/i.test(c))return'Tech';
 if(/Sylvaine|Clairières|Verdoyante|Contemplative/i.test(c))return'Elf';
 if(/Forteresses|Hautes-cimes|Routes profondes|Minière|Forgienne/i.test(c))return'Dwarf';
 if(/Clans des steppes|Martiale|Volcanique/i.test(c))return'Orc';
 if(/Spirituelle|Bioluminescente/i.test(c))return'Spirit';
 if(/Haute-céleste/i.test(c))return'Angel';
 // Race is secondary/fallback.
 if(r.includes('N.E.X.U.S.'))return'Tech';
 if(r.includes('Dragon'))return'Dragon';
 if(r.includes('Démon'))return'Demon';
 if(r.includes('Ange'))return'Angel';
 if(r.includes('Elfe')||r.includes('Fée'))return'Elf';
 if(r.includes('Nain'))return'Dwarf';
 if(r.includes('Orc')||r.includes('Géant'))return'Orc';
 if(r.includes('Gobelin'))return'Goblin';
 if(r.includes('Esprit'))return'Spirit';
 if(r.includes('Humain'))return'Human';
 return'Default';
}
