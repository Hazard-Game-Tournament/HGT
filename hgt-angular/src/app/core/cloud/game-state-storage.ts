import {
  CloudClient,
  throwCloudError
} from './cloud-client';

import {
  CloudService
} from './cloud.service';

export class GameStateCloudStorage {
  constructor(
    private readonly client: CloudClient,
    private readonly domain: CloudService
  ) {}

  async save(
    seasonNumber: number,
    characterNumber: number,
    universeMeta: unknown
  ): Promise<void> {
    const row =
      this.domain.gameStateRow(
        seasonNumber,
        characterNumber,
        universeMeta
      );

    const result =
      await this.client
        .from('games')
        .update(row)
        .eq(
          'id',
          this.domain.gameId
        );

    throwCloudError(
      await result
    );
  }
}
