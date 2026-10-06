import {
  HgtDescendant,
  HgtNpc
} from '../models/cloud.models';

import {
  CloudClient,
  throwCloudError
} from './cloud-client';

import {
  CloudService
} from './cloud.service';

export class GenealogyCloudStorage {
  constructor(
    private readonly client: CloudClient,
    private readonly domain: CloudService
  ) {}

  async sync(
    descendants: Record<
      string,
      HgtDescendant | null | undefined
    >,
    npcs: Record<
      string,
      HgtNpc | null | undefined
    >
  ): Promise<void> {
    await this.syncDescendants(
      descendants
    );

    await this.syncNpcs(
      npcs
    );
  }

  private async syncDescendants(
    descendants: Record<
      string,
      HgtDescendant | null | undefined
    >
  ): Promise<void> {
    const rows =
      this.domain.descendantRows(
        descendants
      );

    if (rows.length) {
      const result =
        await this.client
          .from('descendants')
          .upsert(
            rows,
            {
              onConflict:
                'game_id,descendant_code'
            }
          );

      throwCloudError(result);
    }

    const remote =
      await this.client
        .from<
          Array<{
            descendant_code:
              string | null;
          }>
        >('descendants')
        .select('descendant_code')
        .eq(
          'game_id',
          this.domain.gameId
        );

    throwCloudError(remote);

    const stale =
      this.domain.staleCodes(
        (remote.data ?? []).map(
          row =>
            row.descendant_code
        ),
        rows.map(
          row =>
            row.descendant_code
        )
      );

    for (const code of stale) {
      const result =
        await this.client
          .from('descendants')
          .delete()
          .eq(
            'game_id',
            this.domain.gameId
          )
          .eq(
            'descendant_code',
            code
          );

      throwCloudError(
        await result
      );
    }
  }

  private async syncNpcs(
    npcs: Record<
      string,
      HgtNpc | null | undefined
    >
  ): Promise<void> {
    const rows =
      this.domain.npcRows(npcs);

    if (rows.length) {
      const result =
        await this.client
          .from('npcs')
          .upsert(
            rows,
            {
              onConflict:
                'game_id,npc_code'
            }
          );

      throwCloudError(result);
    }

    const remote =
      await this.client
        .from<
          Array<{
            npc_code:
              string | null;
          }>
        >('npcs')
        .select('npc_code')
        .eq(
          'game_id',
          this.domain.gameId
        );

    throwCloudError(remote);

    const stale =
      this.domain.staleCodes(
        (remote.data ?? []).map(
          row =>
            row.npc_code
        ),
        rows.map(
          row =>
            row.npc_code
        )
      );

    for (const code of stale) {
      const result =
        await this.client
          .from('npcs')
          .delete()
          .eq(
            'game_id',
            this.domain.gameId
          )
          .eq(
            'npc_code',
            code
          );

      throwCloudError(
        await result
      );
    }
  }
}
