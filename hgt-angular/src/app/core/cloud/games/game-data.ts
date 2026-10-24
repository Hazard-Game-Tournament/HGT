import {
  CloudGamePayload
} from './game.models';

export function remoteRosterFrom(
  payload: CloudGamePayload
): Record<string, unknown> {
  const roster:
    Record<string, unknown> = {};

  for (
    const row of payload.characters
  ) {
    const data =
      row.data ?? {};

    const code =
      row.character_code ??
      String(data['id'] ?? '');

    if (code) {
      roster[code] = data;
    }
  }

  return roster;
}

export function remoteDescendantsFrom(
  payload: CloudGamePayload
): Record<string, unknown> {
  const descendants:
    Record<string, unknown> = {};

  for (
    const row of payload.descendants
  ) {
    const data =
      row.data ?? {};

    const code =
      row.descendant_code ??
      String(data['id'] ?? '');

    if (code) {
      descendants[code] = data;
    }
  }

  return descendants;
}

export function remoteNpcsFrom(
  payload: CloudGamePayload
): Record<string, unknown> {
  const npcs:
    Record<string, unknown> = {};

  for (
    const row of payload.npcs
  ) {
    const data =
      row.data ?? {};

    const code =
      row.npc_code ??
      String(data['id'] ?? '');

    if (code) {
      npcs[code] = data;
    }
  }

  return npcs;
}

export function remoteTournamentsFrom(
  payload: CloudGamePayload
): Record<string, unknown>[] {
  return payload.tournaments
    .map(row => row.data)
    .filter(
      (
        data
      ): data is Record<string, unknown> =>
        Boolean(data)
    )
    .sort(
      (a, b) =>
        Number(b['season'] ?? 0) -
        Number(a['season'] ?? 0)
    );
}
