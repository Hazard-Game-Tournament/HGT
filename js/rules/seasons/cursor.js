export function characterIdFor(
  season,
  number
){
  return `S${season}-${String(number).padStart(3,'0')}`;
}

export function firstEmptyCharacterNumberFor(
  season,
  roster={},
  charactersPerSeason=64
){
  const used=new Set(
    Object.keys(roster||{})
      .map(id=>
        String(id).match(
          /^S(\d+)-(\d+)$/
        )
      )
      .filter(Boolean)
      .filter(match=>
        Number(match[1])===Number(season)
      )
      .map(match=>Number(match[2]))
      .filter(number=>
        number>=1 &&
        number<=charactersPerSeason
      )
  );

  for(
    let number=1;
    number<=charactersPerSeason;
    number++
  ){
    if(!used.has(number))
      return number;
  }

  return null;
}

export function normalizeSeasonCursor(
  season,
  number,
  charactersPerSeason=64
){
  let normalizedSeason=
    Number.parseInt(season,10);

  let normalizedNumber=
    Number.parseInt(number,10);

  if(
    !Number.isFinite(normalizedSeason) ||
    normalizedSeason<1
  ){
    normalizedSeason=1;
  }

  if(
    !Number.isFinite(normalizedNumber) ||
    normalizedNumber<1
  ){
    normalizedNumber=1;
  }

  if(
    normalizedNumber>
    charactersPerSeason
  ){
    normalizedSeason +=
      Math.floor(
        (normalizedNumber-1)/
        charactersPerSeason
      );

    normalizedNumber=
      (
        (normalizedNumber-1)%
        charactersPerSeason
      )+1;
  }

  return {
    season:normalizedSeason,
    number:normalizedNumber
  };
}

export function canonicalSeasonCursorFor(
  completedCharacters=[],
  parseCharacterCode,
  charactersPerSeason=64
){
  const parsed=
    completedCharacters
      .filter(character=>character?.id)
      .map(character=>
        parseCharacterCode(character.id)
      )
      .filter(parsedCode=>
        Number.isFinite(parsedCode?.season) &&
        Number.isFinite(parsedCode?.number)
      );

  if(!parsed.length){
    return {
      season:1,
      number:1
    };
  }

  const counts={};

  for(const parsedCode of parsed){
    if(
      parsedCode.number>=1 &&
      parsedCode.number<=charactersPerSeason
    ){
      counts[parsedCode.season]=
        (counts[parsedCode.season]||0)+1;
    }
  }

  let canonicalSeason=1;

  while(
    (counts[canonicalSeason]||0)>=
    charactersPerSeason
  ){
    canonicalSeason++;
  }

  const used=new Set(
    parsed
      .filter(parsedCode=>
        parsedCode.season===
        canonicalSeason
      )
      .map(parsedCode=>
        parsedCode.number
      )
  );

  let canonicalNumber=1;

  while(
    canonicalNumber<=charactersPerSeason &&
    used.has(canonicalNumber)
  ){
    canonicalNumber++;
  }

  if(
    canonicalNumber>
    charactersPerSeason
  ){
    canonicalSeason++;
    canonicalNumber=1;
  }

  return {
    season:canonicalSeason,
    number:canonicalNumber
  };
}

export function isCursorAheadOf(
  season,
  number,
  canonicalSeason,
  canonicalNumber
){
  return (
    season>canonicalSeason ||
    (
      season===canonicalSeason &&
      number>canonicalNumber
    )
  );
}
