const weighted=(label,weight=1)=>({
  label,
  weight
});

function makeScores(options){
  return Object.fromEntries(
    (options||[]).map(x=>[x,1])
  );
}

function makeBoost(score){
  return (names,m=1.5)=>
    names.forEach(n=>{
      if(score[n]!=null)
        score[n]*=m;
    });
}

export function vaeloriaPowerOptionsFor(
  powers,
  {
    lineage={},
    race='',
    birthRegion='',
    culture=''
  }={}
){
  const score=makeScores(powers);
  const boost=makeBoost(score);

  const L=lineage||{};
  const region=birthRegion||'';

  // 1. Lignée / nature raciale.
  const tokens=[
    L.vampire,
    L.werewolf,
    L.spiritEssence,
    L.dragonLineage,
    L.artificialOrigin,
    L.alienType,
    L.alienEnvironment,
    L.divineDomain,
    L.titanOrigin,
    L.undeadForm,
    L.beastSpecies
  ].filter(Boolean).join(' ');

  if(
    /Sanguine|Sang|Vampire/i
      .test(tokens+' '+race)
  ){
    boost([
      'Sang',
      'Régénération',
      'Absorption'
    ],3);
  }

  if(
    /Nocturne|Spectrale|Ombre|Squelette|Liche/i
      .test(tokens+' '+race)
  ){
    boost([
      'Ténèbres',
      'Invisibilité',
      'Illusion'
    ],3);
  }

  if(/Psychique|Énergétique/i.test(tokens))
    boost([
      'Télépathie',
      'Télékinésie',
      'Barrières'
    ],3);

  if(/Lunaire|Spirituelle/i.test(tokens))
    boost([
      'Métamorphose',
      'Régénération',
      'Nature'
    ],2);

  if(/Tempête|Foudre/i.test(tokens))
    boost(['Foudre','Air'],3);

  if(/Volcan|Magma|Feu/i.test(tokens))
    boost(['Feu','Explosion'],3);

  if(/Glace|Glaciaire/i.test(tokens))
    boost(['Glace','Eau'],3);

  if(/Océan|Aquatique|Abyssale/i.test(tokens))
    boost(['Eau','Glace'],3);

  if(
    /Forêt|Forestière|Végétaloïde|Nature/i
      .test(tokens)
  ){
    boost(['Nature','Terre'],3);
  }

  if(/Cristal|Cristallin/i.test(tokens))
    boost(['Terre','Barrières'],3);

  if(
    /Lumière|Céleste|Ange/i
      .test(tokens+' '+race)
  ){
    boost([
      'Lumière',
      'Barrières',
      'Régénération'
    ],3);
  }

  if(/Démon/i.test(race))
    boost(
      [
        'Ténèbres',
        'Feu',
        'Malédiction'
      ].filter(x=>score[x]!=null),
      2
    );

  if(
    /Nexus|Synthétique|Artificiel|Cyborg|N\.E\.X\.U\.S/i
      .test(tokens+' '+race)
  ){
    boost([
      'Magnétisme',
      'Barrières',
      'Télékinésie'
    ],2);
  }

  // 2. Région / culture.
  if(
    region==='Varkhoryn' ||
    /Volcanique|Forgienne/i.test(culture)
  ){
    boost(['Feu','Explosion'],2);
  }

  if(
    region==='Kythera' ||
    /Cristalline|Minière/i.test(culture)
  ){
    boost(['Terre','Barrières'],2);
  }

  if(
    region==='Lumerys' ||
    /Forestière|Bioluminescente/i
      .test(culture)
  ){
    boost(['Nature','Lumière'],2);
  }

  if(
    region==='Naeroth' ||
    /Maritime|Littorale|Abyssale/i
      .test(culture)
  ){
    boost(['Eau','Glace'],2);
  }

  if(
    region==='Thoryndra' ||
    region==='Vaerunn' ||
    /tempêtes/i.test(culture)
  ){
    boost(['Foudre','Air'],2);
  }

  if(
    region==='Sylvaeryn' ||
    /Sylvaine|Clairières/i.test(culture)
  ){
    boost(['Nature','Terre'],2);
  }

  if(
    region==='Nexara' ||
    /Nexus|Technopolit|techno/i
      .test(culture)
  ){
    boost([
      'Magnétisme',
      'Télékinésie',
      'Barrières'
    ],2);
  }

  if(
    region==='Aetherys' ||
    /Haute-céleste/i.test(culture)
  ){
    boost(['Air','Lumière'],2);
  }

  return (powers||[]).map(
    x=>weighted(x,score[x])
  );
}

export function vaeloriaEnchantOptionsFor(
  enchantments,
  {
    lineage={},
    race='',
    birthRegion='',
    culture='',
    powers=[]
  }={}
){
  const score=makeScores(enchantments);
  const boost=makeBoost(score);

  const L=lineage||{};

  const ps=(powers||[])
    .map(p=>
      typeof p==='string'
        ? p
        : p?.name||''
    )
    .join(' ');

  const t=[
    ps,
    L.vampire,
    L.spiritEssence,
    L.dragonLineage,
    L.divineDomain,
    L.titanOrigin,
    birthRegion,
    culture,
    race
  ].filter(Boolean).join(' ');

  if(/Feu|Volcan|Magma/i.test(t))
    boost(['Flamme','Explosion']);

  if(/Glace|Givre|Glaciaire/i.test(t))
    boost(['Givre']);

  if(/Foudre|Tempête/i.test(t))
    boost(['Foudre']);

  if(/Poison/i.test(t))
    boost(['Poison']);

  if(/Sang|Vampire/i.test(t))
    boost(['Vampirisme']);

  if(/Lumière|Ange|Divin|Sacré/i.test(t))
    boost(['Sacré']);

  if(/Spectral|Esprit|Squelette|Liche/i.test(t))
    boost(['Spectral']);

  if(/Ténèbres|Démon/i.test(t))
    boost(['Démoniaque']);

  if(/Temps/i.test(t))
    boost(['Time Slasher']);

  if(/Espace|Téléport/i.test(t))
    boost(['Distorsion']);

  if(/Chaos/i.test(t))
    boost([
      'Chaos',
      'Reality Break'
    ]);

  return (enchantments||[]).map(
    x=>weighted(x,score[x])
  );
}
