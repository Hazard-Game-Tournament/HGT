export function createMartialClanRecord({
  id,
  founderId,
  founderName='',
  foundedSeason,
  domains=[],
  patrimony={}
}={}){
  return {
    id,
    name:`Clan ${founderId}`,
    founderId,
    founderName,
    foundedSeason,
    domains,
    patrimony,
    members:[founderId]
  };
}

export function createEmptyFounderClanRecord({
  id,
  fighterId,
  fighterName='',
  foundedSeason
}={}){
  return {
    id,
    name:`Clan ${fighterName||fighterId}`,
    founderId:fighterId,
    founderName:fighterName||'',
    foundedSeason,
    domains:[],
    patrimony:{},
    members:[fighterId]
  };
}

export function addMartialClanMember(
  clan,
  fighterId
){
  if(!clan)
    return null;

  clan.members=[
    ...new Set([
      ...(clan.members||[]),
      fighterId
    ])
  ];

  return clan;
}

export function updateMartialClan(
  clan,
  mutator
){
  if(!clan)
    return null;

  mutator(clan);
  return clan;
}
