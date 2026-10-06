export interface CloudGame {
  id: string;
  name?: string | null;
  current_season?: number | null;
  current_character_number?: number | null;
  universe_meta?: unknown;
  updated_at?: string | null;
  [key: string]: unknown;
}

export interface CloudDataRow {
  data?: Record<string, unknown> | null;
  [key: string]: unknown;
}

export interface CloudCharacterDataRow
  extends CloudDataRow {
  character_code?: string | null;
}

export interface CloudDescendantDataRow
  extends CloudDataRow {
  descendant_code?: string | null;
}

export interface CloudNpcDataRow
  extends CloudDataRow {
  npc_code?: string | null;
}

export interface CloudGamePayload {
  game: CloudGame;

  characters:
    CloudCharacterDataRow[];

  descendants:
    CloudDescendantDataRow[];

  npcs:
    CloudNpcDataRow[];

  tournaments:
    CloudDataRow[];
}
