export function mergeUniverseMeta(
  localValue: unknown,
  remoteValue: unknown
): Record<string, unknown> {
  const local =
    objectValue(localValue);

  const remote =
    objectValue(remoteValue);

  return {
    ...local,
    ...remote,

    champions: {
      ...objectValue(
        local['champions']
      ),
      ...objectValue(
        remote['champions']
      )
    },

    championTeam:
      nonEmptyArray(
        remote['championTeam']
      )
        ? remote['championTeam']
        : arrayValue(
            local['championTeam']
          ),

    championTeamDraft:
      nonEmptyArray(
        remote[
          'championTeamDraft'
        ]
      )
        ? remote[
            'championTeamDraft'
          ]
        : arrayValue(
            local[
              'championTeamDraft'
            ]
          ),

    multiplayerStats: {
      ...objectValue(
        local['multiplayerStats']
      ),
      ...objectValue(
        remote['multiplayerStats']
      )
    }
  };
}

export function shouldUseRemoteCursor(
  remoteSeason: number,
  remoteCharacter: number,
  localSeason: number,
  localCharacter: number
): boolean {
  return (
    remoteSeason > localSeason ||
    (
      remoteSeason === localSeason &&
      remoteCharacter >=
        localCharacter
    )
  );
}

export function tournamentScore(
  tournament:
    Record<string, unknown>
): number {
  const rounds =
    tournament['rounds'];

  const first =
    Array.isArray(rounds) &&
    Array.isArray(rounds[0])
      ? rounds[0].length
      : 0;

  const winners =
    objectValue(
      tournament['winners']
    );

  return (
    Number(
      tournament['season'] ?? 0
    ) *
      100000 +
    first * 100 +
    Object.keys(winners).length
  );
}

function objectValue(
  value: unknown
): Record<string, unknown> {
  return (
    value &&
    typeof value === 'object' &&
    !Array.isArray(value)
  )
    ? value as Record<
        string,
        unknown
      >
    : {};
}

function arrayValue(
  value: unknown
): unknown[] {
  return Array.isArray(value)
    ? value
    : [];
}

function nonEmptyArray(
  value: unknown
): value is unknown[] {
  return (
    Array.isArray(value) &&
    value.length > 0
  );
}
