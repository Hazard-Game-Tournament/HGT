export interface CharacterCode {
  season: number;
  number: number;
}

export interface HgtCharacter {
  id: string;
  name?: string | null;
  [key: string]: unknown;
}

export interface HgtDescendant {
  id?: string | null;
  eligibleSeason?: number | null;
  birthSeason?: number | null;
  [key: string]: unknown;
}

export interface HgtNpc {
  id?: string | null;
  [key: string]: unknown;
}

export interface HgtTournament {
  season?: number;
  [key: string]: unknown;
}

export interface CloudCharacterRow {
  game_id: string;
  character_code: string;
  season: number;
  character_number: number;
  name: string | null;
  data: HgtCharacter;
}

export interface CloudDescendantRow {
  game_id: string;
  descendant_code: string | null;
  season: number | null;
  data: HgtDescendant;
}

export interface CloudNpcRow {
  game_id: string;
  npc_code: string | null;
  data: HgtNpc;
}

export interface CloudTournamentRow {
  game_id: string;
  season: number;
  data: HgtTournament;
}

export interface CloudGameStateRow {
  current_season: number;
  current_character_number: number;
  universe_meta: unknown;
}
