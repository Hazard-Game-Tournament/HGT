export function loadJsonStore(
  storage,
  key,
  fallback
){
  try{
    const value=JSON.parse(
      storage.getItem(key)||'null'
    );

    return value ?? fallback;
  }catch(error){
    return fallback;
  }
}

export function saveJsonStore(
  storage,
  key,
  value
){
  storage.setItem(
    key,
    JSON.stringify(value)
  );

  return value;
}

export function defaultUniverseMeta(){
  return {
    nextDesc:1,
    nextNpc:1,
    selectedBySeason:{},
    champions:{},
    championTeam:[],
    multiplayerStats:{}
  };
}

export function normalizeUniverseMeta(
  meta
){
  const m=
    meta &&
    typeof meta==='object' &&
    !Array.isArray(meta)
      ? meta
      : defaultUniverseMeta();

  m.selectedBySeason??={};
  m.champions??={};

  m.championTeam=
    Array.isArray(m.championTeam)
      ? m.championTeam
      : [];

  m.championTeamDraft=
    Array.isArray(m.championTeamDraft)
      ? m.championTeamDraft
      : [];

  m.multiplayerStats=
    (
      m.multiplayerStats &&
      typeof m.multiplayerStats==='object' &&
      !Array.isArray(m.multiplayerStats)
    )
      ? m.multiplayerStats
      : {};

  const stats=m.multiplayerStats;

  stats.teamWins=
    Number(stats.teamWins)||0;

  stats.teamLosses=
    Number(stats.teamLosses)||0;

  stats.duelWins=
    Number(stats.duelWins)||0;

  stats.duelLosses=
    Number(stats.duelLosses)||0;

  stats.teamHistory=
    Array.isArray(stats.teamHistory)
      ? stats.teamHistory.slice(0,10)
      : [];

  stats.duelHistory=
    Array.isArray(stats.duelHistory)
      ? stats.duelHistory.slice(0,10)
      : [];

  return m;
}

export function loadUniverseMetaFromStorage(
  storage,
  key
){
  return normalizeUniverseMeta(
    loadJsonStore(
      storage,
      key,
      defaultUniverseMeta()
    )
  );
}
