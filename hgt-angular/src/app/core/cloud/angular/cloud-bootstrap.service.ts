import { Injectable } from '@angular/core';
import { CloudController } from '../controllers';
import { CloudRuntimeService } from './cloud-runtime.service';
import {
  ActiveCloudGame,
  CloudBootstrapConfig
} from './cloud-bootstrap.models';

export * from './cloud-bootstrap.models';

@Injectable({ providedIn: 'root' })
export class CloudBootstrapService {
  private activeGame: ActiveCloudGame | null = null;

  constructor(
    private readonly runtime: CloudRuntimeService
  ) {}

  bootstrap(config: CloudBootstrapConfig): CloudController {
    if (!config.game?.id) {
      throw new Error('Partie Cloud HGT invalide');
    }

    this.activeGame = { ...config.game };

    return this.runtime.configure({
      client: config.client,
      gameId: config.game.id,
      parseCharacterCode: config.parseCharacterCode,
      keepTournamentSeasons: config.keepTournamentSeasons,
      onStatus: config.onStatus,
      onUpdated: config.onUpdated,
      onError: config.onError
    });
  }

  get game(): ActiveCloudGame | null {
    return this.activeGame;
  }

  get ready(): boolean {
    return Boolean(this.activeGame?.id) &&
      this.runtime.configured;
  }

  requireController(): CloudController {
    if (!this.ready) {
      throw new Error('Cloud HGT non initialisé');
    }

    return this.runtime.requireController();
  }

  reset(): void {
    this.activeGame = null;
    this.runtime.reset();
  }
}
