import {
  HgtCharacter
} from '../models/cloud.models';

import {
  CloudClient,
  throwCloudError
} from './cloud-client';

import {
  CloudService
} from './cloud.service';

export class CharacterCloudStorage {
  constructor(
    private readonly client: CloudClient,
    private readonly domain: CloudService
  ) {}

  async save(
    character: HgtCharacter
  ): Promise<void> {
    const row =
      this.domain.characterRow(character);

    const result =
      await this.client
        .from('characters')
        .upsert(
          row,
          {
            onConflict:
              'game_id,character_code'
          }
        );

    throwCloudError(result);
  }

  async saveRoster(
    roster: Record<
      string,
      HgtCharacter | null | undefined
    >
  ): Promise<number> {
    const rows =
      this.domain.rosterRows(roster);

    if (!rows.length) {
      return 0;
    }

    const result =
      await this.client
        .from('characters')
        .upsert(
          rows,
          {
            onConflict:
              'game_id,character_code'
          }
        );

    throwCloudError(result);

    return rows.length;
  }

  async delete(
    characterCode: string
  ): Promise<void> {
    const result =
      await this.client
        .from('characters')
        .delete()
        .eq(
          'game_id',
          this.domain.gameId
        )
        .eq(
          'character_code',
          characterCode
        );

    throwCloudError(
      await result
    );
  }
}
