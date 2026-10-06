import {
  CloudClient
} from '../cloud-client';

import {
  CharacterCodeParser
} from '../characters';

import {
  createCloudRuntime
} from '../angular/cloud-runtime';

import {
  CloudRuntime
} from '../angular/cloud-runtime';

import {
  GameCloudStorage
} from '../games/game-storage';

import {
  CloudGame,
  CloudGamePayload
} from '../games/game.models';

import {
  CloudControllerState
} from '../cloud-controller';

import {
  HgtCharacter,
  HgtTournament
} from '../../models/cloud.models';

export interface BrowserCloudContext {
  client: () => CloudClient | null;

  game: () => {
    id: string;
    name?: string | null;
  } | null;

  ready: () => boolean;

  state: () => CloudControllerState;

  parseCharacterCode:
    CharacterCodeParser;

  keepTournamentSeasons: number;

  status?: (
    message: string,
    state?: string
  ) => void;

  updated?: () => void;
}

export class BrowserCloudApi {
  private runtime:
    CloudRuntime | null = null;

  private gameId:
    string | null = null;

  constructor(
    private readonly context:
      BrowserCloudContext
  ) {}

  private getRuntime():
    CloudRuntime | null {
    if (!this.context.ready()) {
      return null;
    }

    const client =
      this.context.client();

    const game =
      this.context.game();

    if (!client || !game?.id) {
      return null;
    }

    if (
      !this.runtime ||
      this.gameId !== game.id
    ) {
      this.runtime =
        createCloudRuntime({
          client,
          gameId: game.id,

          parseCharacterCode:
            this.context
              .parseCharacterCode,

          keepTournamentSeasons:
            this.context
              .keepTournamentSeasons,

          onStatus:
            this.context.status,

          onUpdated:
            this.context.updated
        });

      this.gameId = game.id;
    }

    return this.runtime;
  }

  async saveCharacter(
    character: HgtCharacter
  ): Promise<void> {
    const runtime =
      this.getRuntime();

    if (!runtime || !character?.id) {
      return;
    }

    await runtime.characters.save(
      character
    );

    this.context.updated?.();
  }

  async deleteCharacter(
    code: string
  ): Promise<void> {
    const runtime =
      this.getRuntime();

    if (!runtime) {
      return;
    }

    await runtime.characters.delete(
      code
    );
  }

  async saveGameState():
    Promise<void> {
    const runtime =
      this.getRuntime();

    if (!runtime) {
      return;
    }

    const state =
      this.context.state();

    await runtime.gameState.save(
      state.seasonNumber,
      state.characterNumber,
      state.universeMeta
    );
  }

  async syncGenealogy():
    Promise<void> {
    const runtime =
      this.getRuntime();

    if (!runtime) {
      return;
    }

    const state =
      this.context.state();

    await runtime.genealogy.sync(
      state.descendants,
      state.npcs
    );

    await runtime.gameState.save(
      state.seasonNumber,
      state.characterNumber,
      state.universeMeta
    );

    this.context.updated?.();
  }

  async saveTournament(
    tournament: HgtTournament
  ): Promise<void> {
    const runtime =
      this.getRuntime();

    if (!runtime) {
      return;
    }

    const pruneError =
      await runtime.tournaments.save(
        tournament,
        this.context
          .keepTournamentSeasons
      );

    if (pruneError) {
      console.warn(
        'Nettoyage anciens tournois',
        pruneError
      );
    }

    this.context.updated?.();
  }

  async deleteTournament(
    season: number
  ): Promise<void> {
    const runtime =
      this.getRuntime();

    if (!runtime) {
      return;
    }

    await runtime.tournaments.delete(
      season
    );
  }

  async syncAll():
    Promise<void> {
    const runtime =
      this.getRuntime();

    if (!runtime) {
      return;
    }

    const state =
      this.context.state();

    await runtime.characters.saveRoster(
      state.roster
    );

    await runtime.genealogy.sync(
      state.descendants,
      state.npcs
    );

    if (state.tournament) {
      await runtime.tournaments.save(
        state.tournament,
        this.context
          .keepTournamentSeasons
      );
    }

    await runtime.gameState.save(
      state.seasonNumber,
      state.characterNumber,
      state.universeMeta
    );

    this.context.updated?.();
  }

  async listGames():
    Promise<CloudGame[]> {
    const runtime =
      this.getRuntime();

    if (!runtime) {
      return [];
    }

    return new GameCloudStorage(
      this.context.client()!
    ).list();
  }

  async renameGame(
    id: string,
    name: string
  ): Promise<void> {
    const client =
      this.context.client();

    if (!client) {
      return;
    }

    await new GameCloudStorage(
      client
    ).rename(id, name);
  }

  async deleteGame(
    id: string
  ): Promise<void> {
    const client =
      this.context.client();

    if (!client) {
      return;
    }

    await new GameCloudStorage(
      client
    ).delete(id);
  }

  async loadGame(
    id: string
  ): Promise<CloudGamePayload> {
    const client =
      this.context.client();

    if (!client) {
      throw new Error(
        'Client Cloud indisponible'
      );
    }

    return new GameCloudStorage(
      client
    ).load(id);
  }

  reset(): void {
    this.runtime = null;
    this.gameId = null;
  }
}

export function createBrowserCloudApi(
  context: BrowserCloudContext
): BrowserCloudApi {
  return new BrowserCloudApi(
    context
  );
}
