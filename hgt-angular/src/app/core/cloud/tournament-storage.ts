import {
  HgtTournament
} from '../models/cloud.models';

import {
  CloudClient,
  throwCloudError
} from './cloud-client';

import {
  CloudService
} from './cloud.service';

export class TournamentCloudStorage {
  constructor(
    private readonly client: CloudClient,
    private readonly domain: CloudService
  ) {}

  async save(
    tournament: HgtTournament,
    keepSeasons: number
  ): Promise<unknown | null> {
    const row =
      this.domain.tournamentRow(
        tournament
      );

    const saved =
      await this.client
        .from('tournaments')
        .upsert(
          row,
          {
            onConflict:
              'game_id,season'
          }
        );

    throwCloudError(saved);

    const cutoff =
      this.domain.tournamentCutoff(
        row.season,
        keepSeasons
      );

    if (cutoff === null) {
      return null;
    }

    const pruned =
      await this.client
        .from('tournaments')
        .delete()
        .eq(
          'game_id',
          this.domain.gameId
        )
        .lte(
          'season',
          cutoff
        );

    return pruned.error ?? null;
  }

  async delete(
    season: number
  ): Promise<void> {
    const result =
      await this.client
        .from('tournaments')
        .delete()
        .eq(
          'game_id',
          this.domain.gameId
        )
        .eq(
          'season',
          season
        );

    throwCloudError(
      await result
    );
  }
}
