import {
  arrayValue,
  nonEmptyArray,
  objectValue
} from './game-merge.helpers';

export function mergeUniverseMeta(
  localValue: unknown,
  remoteValue: unknown
): Record<string, unknown> {
  const local = objectValue(localValue);
  const remote = objectValue(remoteValue);

  return {
    ...local,
    ...remote,
    champions: {
      ...objectValue(local['champions']),
      ...objectValue(remote['champions'])
    },
    championTeam:
      nonEmptyArray(remote['championTeam'])
        ? remote['championTeam']
        : arrayValue(local['championTeam']),
    championTeamDraft:
      nonEmptyArray(remote['championTeamDraft'])
        ? remote['championTeamDraft']
        : arrayValue(local['championTeamDraft']),
    multiplayerStats: {
      ...objectValue(local['multiplayerStats']),
      ...objectValue(remote['multiplayerStats'])
    }
  };
}

export function shouldUseRemoteCursor(
  remoteSeason: number,
  remoteCharacter: number,
  localSeason: number,
  localCharacter: number
): boolean {
  return remoteSeason > localSeason ||
    (
      remoteSeason === localSeason &&
      remoteCharacter >= localCharacter
    );
}

export { tournamentScore } from './game-tournament-score';
