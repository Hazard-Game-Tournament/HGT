export function martialStateFor(
  status,
  clan
){
  return {
    status,
    clanId:clan?.id||null,
    clanName:clan?.name||null,
    domains:[
      ...(clan?.domains||[])
    ],
    techniques:[],
    weaponMasteries:{}
  };
}

export function syncMartialStateWithClan(
  martial,
  clan
){
  if(!martial || !clan)
    return martial;

  martial.clanName=
    clan.name;

  martial.domains=[
    ...(clan.domains||[])
  ];

  return martial;
}
