import { objectValue } from './game-merge.helpers';

export function tournamentScore(
  tournament: Record<string, unknown>
): number {
  const rounds = tournament['rounds'];

  const first =
    Array.isArray(rounds) &&
    Array.isArray(rounds[0])
      ? rounds[0].length
      : 0;

  const winners = objectValue(
    tournament['winners']
  );

  return (
    Number(tournament['season'] ?? 0) * 100000 +
    first * 100 +
    Object.keys(winners).length
  );
}
