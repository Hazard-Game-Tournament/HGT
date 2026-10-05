import {
  VAELORIA_CLOTHING_STYLES
} from "../../data/vaeloria/index.js";

const weighted=(label,weight=1)=>({
  label,
  weight
});

export function clothingStyleOptionsFor({
  culture='',
  birthRegion='',
  job='',
  archParts=[]
}={}){
  const score=Object.fromEntries(
    VAELORIA_CLOTHING_STYLES.map(
      x=>[x,1]
    )
  );

  const boost=(names,m)=>
    names.forEach(n=>{
      if(score[n]!=null)score[n]*=m;
    });

  const region=birthRegion||'';
  const arch=(archParts||[]).join(' / ');

  // Culture / région : influence principale.
  if(
    /Nexus|Technopolit|techno/i.test(culture) ||
    region==='Nexara'
  ){
    boost([
      'Vêtements futuristes',
      'Vêtements tactiques'
    ],3);
  }

  if(
    /Forteresses|Hautes-cimes|Martiale|Volcanique|Forgienne/i
      .test(culture)
  ){
    boost([
      'Armure lourde',
      'Armure légère'
    ],2);
  }

  if(
    /Nomade|Itinérante|Voyageuse|Navigatrice|Frontière/i
      .test(culture)
  ){
    boost([
      'Tenue de voyage',
      'Armure légère'
    ],2);
  }

  if(
    /Sylvaine|Clairières|Jungle|Forestière|Bioluminescente|Boréale/i
      .test(culture)
  ){
    boost([
      'Tenue sauvage',
      'Vêtements traditionnels'
    ],2);
  }

  if(
    /Haute-céleste|Contemplative|Spirituelle|Savante|Cristalline/i
      .test(culture)
  ){
    boost([
      'Robe / tenue mystique',
      'Vêtements traditionnels'
    ],2);
  }

  if(
    /Urbaine|Marchande|Côtière|Littorale|Cosmopolite/i
      .test(culture)
  ){
    boost([
      'Vêtements civils',
      'Tenue noble'
    ],1.5);
  }

  // Métier : seconde influence.
  if(
    /soldat|garde|mercenaire|chevalier|guerrier|chasseur|combattant/i
      .test(job)
  ){
    boost([
      'Armure lourde',
      'Armure légère',
      'Vêtements tactiques'
    ],2);
  }

  if(
    /mage|sorcier|prêtre|chaman|alchimiste|érudit|occult/i
      .test(job)
  ){
    boost([
      'Robe / tenue mystique',
      'Vêtements traditionnels'
    ],2);
  }

  if(
    /marchand|noble|diplomate|dirigeant/i
      .test(job)
  ){
    boost([
      'Tenue noble',
      'Vêtements civils'
    ],2);
  }

  if(
    /explorateur|voyageur|aventurier|messager|marin/i
      .test(job)
  ){
    boost([
      'Tenue de voyage',
      'Armure légère'
    ],2);
  }

  // Archétype : influence complémentaire.
  if(/Guerrier|Tank|Paladin|Slayer/i.test(arch))
    boost(['Armure lourde','Armure légère'],1.5);

  if(/Sorcier|Mage|Invocateur/i.test(arch))
    boost(['Robe / tenue mystique'],1.5);

  if(/Assassin|Voleur|Tireur/i.test(arch))
    boost([
      'Vêtements tactiques',
      'Armure légère'
    ],1.5);

  if(/Artiste martial/i.test(arch))
    boost([
      'Vêtements traditionnels',
      'Vêtements tactiques'
    ],1.5);

  return VAELORIA_CLOTHING_STYLES.map(
    x=>weighted(x,score[x])
  );
}

export function vaeloriaColorOptionsFor(
  palette,
  {
    race='',
    lineage={},
    birthRegion='',
    culture=''
  }={},
  exclude=null
){
  const available=(palette||[])
    .filter(x=>x!==exclude);

  const score=Object.fromEntries(
    available.map(x=>[x,1])
  );

  const boost=(xs,m=1.5)=>
    xs.forEach(x=>{
      if(score[x]!=null)score[x]*=m;
    });

  const L=lineage||{};

  const t=[
    race,
    L.vampire,
    L.werewolf,
    L.spiritEssence,
    L.dragonLineage,
    L.artificialOrigin,
    L.alienType,
    L.divineDomain,
    L.titanOrigin,
    birthRegion,
    culture
  ].filter(Boolean).join(' ');

  if(/Sang|Vampire/i.test(t))
    boost(['Rouge','Noir','Bordeaux']);

  if(/Nocturne|Ombre|Spectral|Squelette|Liche/i.test(t))
    boost(['Noir','Violet','Gris']);

  if(/Feu|Volcan|Magma/i.test(t))
    boost(['Rouge','Orange','Noir']);

  if(/Glace|Glaciaire/i.test(t))
    boost(['Blanc','Bleu','Cyan']);

  if(/Océan|Aquatique|Maritime|Naeroth/i.test(t))
    boost(['Bleu','Cyan','Turquoise']);

  if(/Forêt|Forestière|Nature|Sylva/i.test(t))
    boost(['Vert','Brun','Émeraude']);

  if(/Cristal|Cristallin|Kythera/i.test(t))
    boost(['Cyan','Violet','Blanc']);

  if(/Lumière|Céleste|Ange|Aetherys/i.test(t))
    boost(['Blanc','Or','Bleu']);

  if(/Nexus|Synthétique|Artificiel|Cyborg/i.test(t))
    boost(['Cyan','Argent','Noir']);

  return available.map(
    x=>weighted(x,score[x]||1)
  );
}
