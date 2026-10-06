import { CloudService } from '../cloud.service';
import { CharacterCloudStorage } from '../character-storage';
import { GenealogyCloudStorage } from '../genealogy/genealogy-storage';
import { TournamentCloudStorage } from '../tournament-storage';
import { GameStateCloudStorage } from '../game-state-storage';
import { CloudController, CloudControllerOptions } from '../controllers';
import {
  CloudRuntime,
  CloudRuntimeConfig
} from './cloud-runtime.models';

export * from './cloud-runtime.models';

export function createCloudRuntime(
  config: CloudRuntimeConfig
): CloudRuntime {
  const domain = new CloudService({
    gameId: config.gameId,
    parseCharacterCode: config.parseCharacterCode
  });

  const characters =
    new CharacterCloudStorage(config.client, domain);

  const genealogy =
    new GenealogyCloudStorage(config.client, domain);

  const tournaments =
    new TournamentCloudStorage(config.client, domain);

  const gameState =
    new GameStateCloudStorage(config.client, domain);

  const options: CloudControllerOptions = {
    keepTournamentSeasons: config.keepTournamentSeasons,
    onStatus: config.onStatus,
    onUpdated: config.onUpdated,
    onError: config.onError
  };

  const controller = new CloudController(
    characters,
    genealogy,
    tournaments,
    gameState,
    options
  );

  return {
    domain,
    characters,
    genealogy,
    tournaments,
    gameState,
    controller
  };
}
