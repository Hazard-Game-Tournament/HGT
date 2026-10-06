export const VAMPIRE_WEREWOLF_ORIGIN_EXCLUSIONS=[
  'Squelette',
  'Golem / Artificiel',
  'Esprit',
  'Vampire',
  'Loup-garou'
];

export const SPIRIT_ORIGIN_EXCLUSIONS=[
  'Squelette',
  'Golem / Artificiel',
  'Esprit'
];

export const UNDEAD_ORIGIN_EXCLUSIONS=[
  'Squelette',
  'Golem / Artificiel',
  'Esprit',
  'Vampire',
  'Loup-garou'
];

export function raceOptionsFor(
  races=[],
  excluded=[],
  birthRegion='',
  affinityWeightsFor
){
  const labels=races.filter(
    race=>!excluded.includes(race)
  );

  return affinityWeightsFor(
    birthRegion,
    labels
  );
}

export function vampireWerewolfOriginOptionsFor(
  races,
  birthRegion,
  affinityWeightsFor
){
  return raceOptionsFor(
    races,
    VAMPIRE_WEREWOLF_ORIGIN_EXCLUSIONS,
    birthRegion,
    affinityWeightsFor
  );
}

export function spiritOriginRaceOptionsFor(
  races,
  birthRegion,
  affinityWeightsFor
){
  return raceOptionsFor(
    races,
    SPIRIT_ORIGIN_EXCLUSIONS,
    birthRegion,
    affinityWeightsFor
  );
}

export function undeadOriginRaceOptionsFor(
  races,
  birthRegion,
  affinityWeightsFor
){
  return raceOptionsFor(
    races,
    UNDEAD_ORIGIN_EXCLUSIONS,
    birthRegion,
    affinityWeightsFor
  );
}
