export function loadTournamentArchiveFromStorage(
  storage,
  archiveKey
){
  try{
    const value=JSON.parse(
      storage.getItem(archiveKey)||'{}'
    );

    return value &&
      typeof value==='object' &&
      !Array.isArray(value)
        ? value
        : {};
  }catch(e){
    return {};
  }
}

export function saveTournamentArchiveToStorage(
  storage,
  archiveKey,
  archive
){
  const value=
    archive &&
    typeof archive==='object' &&
    !Array.isArray(archive)
      ? archive
      : {};

  storage.setItem(
    archiveKey,
    JSON.stringify(value)
  );

  return value;
}

export function archiveTournamentInStorage({
  storage,
  archiveKey,
  tournament,
  currentSeason=1,
  keepSeasons=5
}={}){
  if(!tournament?.season)return null;

  const archive=
    loadTournamentArchiveFromStorage(
      storage,
      archiveKey
    );

  archive[String(tournament.season)] =
    JSON.parse(JSON.stringify(tournament));

  const seasons=
    Object.keys(archive)
      .map(Number)
      .filter(Number.isFinite);

  const maxSeason=Math.max(
    Number(currentSeason)||1,
    ...seasons
  );

  const keep=Math.max(
    1,
    Number(keepSeasons)||5
  );

  Object.keys(archive).forEach(key=>{
    if(
      Number(key) <
      maxSeason-(keep-1)
    ){
      delete archive[key];
    }
  });

  saveTournamentArchiveToStorage(
    storage,
    archiveKey,
    archive
  );

  return archive;
}

export function loadTournamentFromStorage(
  storage,
  tournamentKey
){
  try{
    return JSON.parse(
      storage.getItem(tournamentKey)||'null'
    );
  }catch(e){
    return null;
  }
}

export function tournamentForSeasonFromStorage({
  storage,
  tournamentKey,
  archiveKey,
  season
}={}){
  const active=
    loadTournamentFromStorage(
      storage,
      tournamentKey
    );

  if(
    Number(active?.season)===
    Number(season)
  ){
    return active;
  }

  const archive=
    loadTournamentArchiveFromStorage(
      storage,
      archiveKey
    );

  return archive[String(season)]||null;
}

export function normalizeTournamentRoster(
  rawRoster
){
  const raw=
    rawRoster &&
    typeof rawRoster==='object'
      ? rawRoster
      : {};

  const out={};

  Object.entries(raw).forEach(([key,c])=>{
    if(!c || typeof c!=='object')return;

    const candidates=[
      key,
      c.id,
      c.character_code,
      c.characterCode
    ]
      .filter(Boolean)
      .map(String);

    const id=candidates.find(
      value=>/^S\d+-\d+$/.test(value)
    );

    if(id){
      out[id]={...c,id};
    }
  });

  return out;
}

export function tournamentSeasonFromRoster(
  roster,
  charactersPerSeason=64
){
  const seasons={};

  Object.keys(roster||{}).forEach(id=>{
    const match=
      String(id).match(
        /^S(\d+)-(\d+)$/
      );

    if(!match)return;

    const season=Number(match[1]);

    (seasons[season]??=[]).push(id);
  });

  const complete=
    Object.keys(seasons)
      .map(Number)
      .filter(
        season=>
          seasons[season].length >=
          charactersPerSeason
      )
      .sort((a,b)=>b-a);

  return complete[0]||1;
}

export function shuffleTournamentEntries(
  entries,
  random=Math.random
){
  const result=[...(entries||[])];

  for(
    let i=result.length-1;
    i>0;
    i--
  ){
    const j=Math.floor(
      random()*(i+1)
    );

    [
      result[i],
      result[j]
    ]=[
      result[j],
      result[i]
    ];
  }

  return result;
}

export function tournamentRoundNameFor(i){
  return [
    '32es de finale',
    '16es de finale',
    '8es de finale',
    'Quarts de finale',
    'Demi-finales',
    'Finale'
  ][i] || `Tour ${i+1}`;
}
