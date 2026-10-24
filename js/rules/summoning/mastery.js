export function summonerMasteryFor(
  character
){
  if(!character?.powers?.length)
    return 0;

  return Number(
    character.powers[0]?.mastery
  )||0;
}
