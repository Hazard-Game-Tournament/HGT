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


export async function syncNpcs(
  client: CloudClient,
  domain: CloudService,
  npcs: Record<string, HgtNpc | null | undefined>
): Promise<void> {
  const rows = domain.npcRows(npcs);

  if (rows.length) {
    const result = await client
      .from('npcs')
      .upsert(rows, {
        onConflict: 'game_id,npc_code'
      });

    throwCloudError(result);
  }

  const remote = await client
    .from<Array<{ npc_code: string | null }>>('npcs')
    .select('npc_code')
    .eq('game_id', domain.gameId);

  throwCloudError(remote);

  const stale = domain.staleCodes(
    (remote.data ?? []).map(row => row.npc_code),
    rows.map(row => row.npc_code)
  );

  for (const code of stale) {
    const result = await client
      .from('npcs')
      .delete()
      .eq('game_id', domain.gameId)
      .eq('npc_code', code);

    throwCloudError(await result);
  }
}
