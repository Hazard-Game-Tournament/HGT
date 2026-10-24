import { CharacterCloudStorage } from '../character-storage';
import { GameStateCloudStorage } from '../game-state-storage';
import { GenealogyCloudStorage } from '../genealogy/genealogy-storage';
import { TournamentCloudStorage } from '../tournament-storage';

export interface CloudControllerDeps {
  characters: CharacterCloudStorage;
  genealogy: GenealogyCloudStorage;
  tournaments: TournamentCloudStorage;
  gameState: GameStateCloudStorage;
}

export interface CloudControllerOptions {
  keepTournamentSeasons: number;
  onStatus?: (message: string) => void;
  onUpdated?: () => void;
  onError?: (error: unknown) => void;
}

export interface CloudControllerState {
  seasonNumber: number;
  characterNumber: number;
  universeMeta: unknown;
  roster: Record<string, unknown>;
  descendants: Record<string, unknown>;
  npcs: Record<string, unknown>;
  tournament: unknown;
}
