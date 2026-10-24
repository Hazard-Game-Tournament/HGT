import { CloudClient } from '../cloud-client';
import { CharacterCode } from '../../models/cloud.models';

export interface ActiveCloudGame {
  id: string;
  name?: string | null;
}

export interface CloudBootstrapConfig {
  client: CloudClient;
  game: ActiveCloudGame;
  keepTournamentSeasons: number;
  parseCharacterCode: (id: string) => CharacterCode;
  onStatus?: (message: string, state?: string) => void;
  onUpdated?: () => void;
  onError?: (error: unknown) => void;
}
