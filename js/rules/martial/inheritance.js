export function martialInheritedClanFor(
  parentIds=[],
  roster={},
  random=Math.random
){
  if(!parentIds.length) return null;

  const parents=parentIds
    .map(id=>roster[id])
    .filter(Boolean);

  const clans=parents
    .map(parent=>parent?.martial?.clanId)
    .filter(Boolean);

  if(!clans.length) return null;

  if(clans.length>=2){
    if(clans[0]===clans[1]){
      return clans[0];
    }

    return clans[random()<0.5 ? 0 : 1];
  }

  return random()<0.5
    ? clans[0]
    : null;
}
