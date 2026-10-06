export function martialTechniqueFor(
  domain,
  name,
  type
){
  return {
    domain,
    name,
    type,
    masteryBase:null,
    chiBonus:0,
    mastery:null,
    equivalentPower:null
  };
}

export function martialPatrimonyPoolFor(
  clan,
  type,
  chosen=new Set()
){
  if(!clan)
    return [];

  return (clan.domains||[])
    .flatMap(domain=>
      (
        clan.patrimony?.[domain]?.[type]||
        []
      ).map(name=>({
        d:domain,
        n:name
      }))
    )
    .filter(
      item=>
        !chosen.has(
          `${item.d}|${item.n}`
        )
    );
}

export function ensureMartialPatrimonyDomain(
  clan,
  domain,
  reset=false
){
  clan.patrimony??={};

  if(
    reset ||
    !clan.patrimony[domain]
  ){
    clan.patrimony[domain]={
      secret:[],
      legendary:[]
    };
  }

  return clan.patrimony[domain];
}

export function addMartialPatrimonyTechnique(
  clan,
  domain,
  type,
  name
){
  const patrimony=
    ensureMartialPatrimonyDomain(
      clan,
      domain
    );

  patrimony[type]??=[];

  if(
    !patrimony[type].includes(name)
  ){
    patrimony[type].push(name);
  }

  return patrimony[type];
}
