import {
  HgtCharacter,
  HgtDescendant,
  HgtNpc,
  HgtTournament
} from '../models/cloud.models';

import {
  CharacterCloudStorage
} from './character-storage';

import {
  GenealogyCloudStorage
} from './genealogy-storage';

import {
  TournamentCloudStorage
} from './tournament-storage';

import {
  GameStateCloudStorage
} from './game-state-storage';

export interface CloudControllerState {
  seasonNumber: number;
  characterNumber: number;
  universeMeta: unknown;

  roster: Record<
    string,
    HgtCharacter | null | undefined
  >;

  descendants: Record<
    string,
    HgtDescendant | null | undefined
  >;

  npcs: Record<
    string,
    HgtNpc | null | undefined
  >;

  tournament: HgtTournament | null;
}

export interface CloudControllerOptions {
  keepTournamentSeasons: number;
  onStatus?: (
    message: string,
    state?: string
  ) => void;
  onUpdated?: () => void;
  onError?: (error: unknown) => void;
}

export class CloudController {
  private syncBusy = false;

  constructor(
    private readonly characters:
      CharacterCloudStorage,

    private readonly genealogy:
      GenealogyCloudStorage,

    private readonly tournaments:
      TournamentCloudStorage,

    private readonly gameState:
      GameStateCloudStorage,

    private readonly options:
      CloudControllerOptions
  ) {}

  async saveCharacter(
    character: HgtCharacter,
    state: Pick<
      CloudControllerState,
      | 'seasonNumber'
      | 'characterNumber'
      | 'universeMeta'
    >
  ): Promise<void> {
    try {
      this.options.onStatus?.(
        '☁️ Sauvegarde…',
        'syncing'
      );

      await this.characters.save(
        character
      );

      await this.saveGameState(
        state
      );

      this.options.onUpdated?.();
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteCharacter(
    characterCode: string
  ): Promise<void> {
    try {
      await this.characters.delete(
        characterCode
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async saveGameState(
    state: Pick<
      CloudControllerState,
      | 'seasonNumber'
      | 'characterNumber'
      | 'universeMeta'
    >
  ): Promise<void> {
    await this.gameState.save(
      state.seasonNumber,
      state.characterNumber,
      state.universeMeta
    );
  }

  async syncGenealogy(
    state: Pick<
      CloudControllerState,
      | 'descendants'
      | 'npcs'
      | 'seasonNumber'
      | 'characterNumber'
      | 'universeMeta'
    >
  ): Promise<void> {
    try {
      await this.genealogy.sync(
        state.descendants,
        state.npcs
      );

      await this.saveGameState(
        state
      );

      this.options.onUpdated?.();
    } catch (error) {
      this.handleError(error);
    }
  }

  async saveTournament(
    tournament: HgtTournament
  ): Promise<void> {
    try {
      const pruneError =
        await this.tournaments.save(
          tournament,
          this.options
            .keepTournamentSeasons
        );

      if (pruneError) {
        console.warn(
          'Nettoyage anciens tournois',
          pruneError
        );
      }

      this.options.onUpdated?.();
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteTournament(
    season: number
  ): Promise<void> {
    try {
      await this.tournaments.delete(
        season
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async syncAll(
    state: CloudControllerState
  ): Promise<void> {
    if (this.syncBusy) {
      return;
    }

    this.syncBusy = true;

    this.options.onStatus?.(
      '☁️ Synchronisation…',
      'syncing'
    );

    try {
      await this.characters.saveRoster(
        state.roster
      );

      await this.genealogy.sync(
        state.descendants,
        state.npcs
      );

      if (state.tournament) {
        await this.tournaments.save(
          state.tournament,
          this.options
            .keepTournamentSeasons
        );
      }

      await this.saveGameState(
        state
      );

      this.options.onUpdated?.();
    } catch (error) {
      this.handleError(error);
    } finally {
      this.syncBusy = false;
    }
  }

  private handleError(
    error: unknown
  ): void {
    if (this.options.onError) {
      this.options.onError(error);
      return;
    }

    throw error;
  }
}
