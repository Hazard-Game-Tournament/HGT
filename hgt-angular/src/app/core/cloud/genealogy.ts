import {
  CloudDescendantRow,
  CloudNpcRow,
  HgtDescendant,
  HgtNpc
} from '../models/cloud.models';

export function descendantCloudRows(
  descendants: Record<
    string,
    HgtDescendant | null | undefined
  >,
  gameId: string
): CloudDescendantRow[] {
  return Object.values(descendants)
    .filter(
      (item): item is HgtDescendant =>
        Boolean(item)
    )
    .map(item => ({
      game_id: gameId,
      descendant_code: item.id ?? null,
      season:
        item.eligibleSeason ??
        item.birthSeason ??
        null,
      data: item
    }));
}

export function npcCloudRows(
  npcs: Record<
    string,
    HgtNpc | null | undefined
  >,
  gameId: string
): CloudNpcRow[] {
  return Object.values(npcs)
    .filter(
      (item): item is HgtNpc =>
        Boolean(item)
    )
    .map(item => ({
      game_id: gameId,
      npc_code: item.id ?? null,
      data: item
    }));
}

export function staleCloudCodes(
  remoteCodes: Array<string | null | undefined>,
  localCodes: Array<string | null | undefined>
): string[] {
  const keep = new Set(
    localCodes.filter(
      (value): value is string =>
        typeof value === 'string' &&
        value.length > 0
    )
  );

  return remoteCodes.filter(
    (value): value is string =>
      typeof value === 'string' &&
      value.length > 0 &&
      !keep.has(value)
  );
}
