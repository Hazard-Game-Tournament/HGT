import {
  HgtDescendant,
  HgtNpc
} from '../../models/cloud.models';

import {
  CloudClient,
  throwCloudError
} from '../cloud-client';

import {
  CloudService
} from '../cloud.service';


export async function syncDescendants(
  client: CloudClient,
  domain: CloudService,
  descendants: Record<string, HgtDescendant | null | undefined>
): Promise<void> {
  const rows = domain.descendantRows(descendants);

  if (rows.length) {
    const result = await client
      .from('descendants')
      .upsert(rows, {
        onConflict: 'game_id,descendant_code'
      });

    throwCloudError(result);
  }

  const remote = await client
    .from<Array<{ descendant_code: string | null }>>('descendants')
    .select('descendant_code')
    .eq('game_id', domain.gameId);

  throwCloudError(remote);

  const stale = domain.staleCodes(
    (remote.data ?? []).map(row => row.descendant_code),
    rows.map(row => row.descendant_code)
  );

  for (const code of stale) {
    const result = await client
      .from('descendants')
      .delete()
      .eq('game_id', domain.gameId)
      .eq('descendant_code', code);

    throwCloudError(await result);
  }
}
