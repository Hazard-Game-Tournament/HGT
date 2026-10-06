export function frenchPowerComplement(value){
  const x=String(value||'').trim();
  const special={Air:'des airs',Ténèbres:'des ténèbres',Eau:'de l’eau',Explosion:'de l’explosion',Illusion:'de l’illusion',Invisibilité:'de l’invisibilité',Absorption:'de l’absorption',Annulation:'de l’annulation',Espace:'de l’espace'};
  if(special[x])return special[x];
  const feminine=new Set(['Glace','Foudre','Terre','Nature','Lumière','Télékinésie','Télépathie','Téléportation','Métamorphose','Régénération','Gravité','Copie']);
  if(feminine.has(x))return `de la ${x.toLowerCase()}`;
  if(/^[AEIOUYÉÈÊËÀÂÄÎÏÔÖÙÛÜH]/i.test(x))return `de l’${x.toLowerCase()}`;
  return `du ${x.toLowerCase()}`;
}
