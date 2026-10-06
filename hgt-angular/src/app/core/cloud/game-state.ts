import {
  CloudGameStateRow
} from '../models/cloud.models';

export function cloudGameStateRow(
  seasonNumber: number,
  characterNumber: number,
  universeMeta: unknown
): CloudGameStateRow {
  return {
    current_season: seasonNumber,
    current_character_number: characterNumber,
    universe_meta: universeMeta
  };
}
