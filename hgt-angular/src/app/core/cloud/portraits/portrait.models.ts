export interface PortraitContext {
  userId: string;
  gameId: string;
}

export interface GeneratedPortrait {
  name: string;
  path: string;
  number: number;
}

export interface CharacterPortraitState {
  championPath?: string | null;
  selectedPortrait?: string | null;
}

export interface StorageResult<T = unknown> {
  data: T;
  error: { message?: string } | null;
}
