import {
  CharacterCode,
  CloudCharacterRow,
  HgtCharacter
} from '../models/cloud.models';

export type CharacterCodeParser =
  (id: string) => CharacterCode;

export function characterCloudRow(
  character: HgtCharacter,
  gameId: string,
  parseCharacterCode: CharacterCodeParser
): CloudCharacterRow {
  const parsed = parseCharacterCode(character.id);

  return {
    game_id: gameId,
    character_code: character.id,
    season: parsed.season,
    character_number: parsed.number,
    name: character.name ?? null,
    data: character
  };
}

export function rosterCloudRows(
  roster: Record<string, HgtCharacter | null | undefined>,
  gameId: string,
  parseCharacterCode: CharacterCodeParser
): CloudCharacterRow[] {
  return Object.values(roster)
    .filter(
      (character): character is HgtCharacter =>
        Boolean(character?.id)
    )
    .map(character =>
      characterCloudRow(
        character,
        gameId,
        parseCharacterCode
      )
    );
}
