import {
  CloudClient
} from '../cloud-client';

import {
  CloudController,
  CloudControllerState
} from '../cloud-controller';

import {
  CharacterCodeParser
} from '../characters';

import {
  createCloudRuntime
} from '../angular/cloud-runtime';

import {
  HgtCharacter,
  HgtTournament
} from '../../models/cloud.models';

export interface LegacyCloudContext {
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

  onStatus?: (
    message: string,
    state?: string
  ) => void;

  onUpdated?: () => void;

  onError?: (
    error: unknown
  ) => void;
}

export class LegacyCloudRuntime {
  private controller:
    CloudController | null = null;

  private gameId:
    string | null = null;

  constructor(
    private readonly context:
      LegacyCloudContext
  ) {}

  ready(): boolean {
    return this.context.ready();
  }

  getController():
    CloudController | null {
    if (!this.ready()) {
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
      !this.controller ||
      this.gameId !== game.id
    ) {
      const runtime =
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
            this.context.onStatus,

          onUpdated:
            this.context.onUpdated,

          onError:
            this.context.onError
        });

      this.controller =
        runtime.controller;

      this.gameId =
        game.id;
    }

    return this.controller;
  }

  async saveCharacter(
    character: HgtCharacter
  ): Promise<void> {
    const controller =
      this.getController();

    if (!controller || !character?.id) {
      return;
    }

    await controller.saveCharacter(
      character,
      this.context.state()
    );
  }

  async deleteCharacter(
    code: string
  ): Promise<void> {
    await this.getController()
      ?.deleteCharacter(code);
  }

  async saveGameState():
    Promise<void> {
    await this.getController()
      ?.saveGameState(
        this.context.state()
      );
  }

  async syncGenealogy():
    Promise<void> {
    await this.getController()
      ?.syncGenealogy(
        this.context.state()
      );
  }

  async saveTournament(
    tournament: HgtTournament
  ): Promise<void> {
    await this.getController()
      ?.saveTournament(tournament);
  }

  async deleteTournament(
    season: number
  ): Promise<void> {
    await this.getController()
      ?.deleteTournament(season);
  }

  async syncAll():
    Promise<void> {
    await this.getController()
      ?.syncAll(
        this.context.state()
      );
  }

  reset(): void {
    this.controller = null;
    this.gameId = null;
  }
}

export function createLegacyCloudRuntime(
  context: LegacyCloudContext
): LegacyCloudRuntime {
  return new LegacyCloudRuntime(
    context
  );
}
