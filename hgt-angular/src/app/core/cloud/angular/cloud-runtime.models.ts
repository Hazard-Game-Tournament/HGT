import { CloudClient } from '../cloud-client';
import { CloudController } from '../controllers';
import { CloudService } from '../cloud.service';
import { CharacterCloudStorage } from '../character-storage';
import { GenealogyCloudStorage } from '../genealogy/genealogy-storage';
import { TournamentCloudStorage } from '../tournament-storage';
import { GameStateCloudStorage } from '../game-state-storage';
import { CharacterCodeParser } from '../characters';

export interface CloudRuntimeConfig {
  client: CloudClient;
  gameId: string;
  parseCharacterCode: CharacterCodeParser;
  keepTournamentSeasons: number;
  onStatus?: (message: string, state?: string) => void;
  onUpdated?: () => void;
  onError?: (error: unknown) => void;
}

export interface CloudRuntime {
  domain: CloudService;
  characters: CharacterCloudStorage;
  genealogy: GenealogyCloudStorage;
  tournaments: TournamentCloudStorage;
  gameState: GameStateCloudStorage;
  controller: CloudController;
}
