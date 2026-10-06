import { GameStateCloudStorage } from '../game-state-storage';

export class StateCloudController {
  constructor(
    private readonly storage: GameStateCloudStorage
  ) {}

  save(
    seasonNumber: number,
    characterNumber: number,
    universeMeta: unknown
  ): Promise<void> {
    return this.storage.save(
      seasonNumber,
      characterNumber,
      universeMeta
    );
  }
}
