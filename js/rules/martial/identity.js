export function martialClanChoicesFor(
  clans={}
){
  return Object.values(clans).map(
    clan=>({
      id:clan.id,
      label:
        `${clan.id} — ${clan.name||clan.id}`
    })
  );
}

export function martialClanIdFromChoice(
  value
){
  return String(value||'')
    .split(' — ')[0];
}

export function martialIdentityFor({
  inheritedClanId=null,
  clans={},
  founderChanceFor=()=>0
}={}){
  if(
    inheritedClanId &&
    clans[inheritedClanId]
  ){
    return {
      mode:'inherited',
      clanId:inheritedClanId,
      founderChance:null
    };
  }

  const ids=Object.keys(clans);

  if(!ids.length){
    return {
      mode:'founder-only',
      clanId:null,
      founderChance:1
    };
  }

  return {
    mode:'choice',
    clanId:null,
    founderChance:
      founderChanceFor(ids.length)
  };
}

export function applyMartialDomains(
  clan,
  martial,
  domains=[]
){
  const chosen=[...domains];

  if(clan){
    clan.domains=[...chosen];
    clan.patrimony=
      clan.patrimony||{};
  }

  if(martial){
    martial.domains=[...chosen];
  }

  return chosen;
}
