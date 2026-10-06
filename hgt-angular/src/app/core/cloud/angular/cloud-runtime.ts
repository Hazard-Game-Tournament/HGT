import {
  CloudClient
} from '../cloud-client';

import {
  CloudController,
  CloudControllerOptions
} from '../cloud-controller';

import {
  CloudService
} from '../cloud.service';

import {
  CharacterCloudStorage
} from '../character-storage';

import {
  GenealogyCloudStorage
} from '../genealogy-storage';

import {
  TournamentCloudStorage
} from '../tournament-storage';

import {
  GameStateCloudStorage
} from '../game-state-storage';

import {
  CharacterCodeParser
} from '../characters';

export interface CloudRuntimeConfig {
  client: CloudClient;
  gameId: string;

  parseCharacterCode:
    CharacterCodeParser;

  keepTournamentSeasons: number;

  onStatus?: (
    message: string,
    state?: string
  ) => void;

  onUpdated?: () => void;

  onError?: (
    error: unknown
  ) => void;
}

export interface CloudRuntime {
  domain: CloudService;

  characters:
    CharacterCloudStorage;

  genealogy:
    GenealogyCloudStorage;

  tournaments:
    TournamentCloudStorage;

  gameState:
    GameStateCloudStorage;

  controller:
    CloudController;
}

export function createCloudRuntime(
  config: CloudRuntimeConfig
): CloudRuntime {
  const domain =
    new CloudService({
      gameId: config.gameId,
      parseCharacterCode:
        config.parseCharacterCode
    });

  const characters =
    new CharacterCloudStorage(
      config.client,
      domain
    );

  const genealogy =
    new GenealogyCloudStorage(
      config.client,
      domain
    );

  const tournaments =
    new TournamentCloudStorage(
      config.client,
      domain
    );

  const gameState =
    new GameStateCloudStorage(
      config.client,
      domain
    );

  const controllerOptions:
    CloudControllerOptions = {
      keepTournamentSeasons:
        config.keepTournamentSeasons,

      onStatus:
        config.onStatus,

      onUpdated:
        config.onUpdated,

      onError:
        config.onError
    };

  const controller =
    new CloudController(
      characters,
      genealogy,
      tournaments,
      gameState,
      controllerOptions
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
