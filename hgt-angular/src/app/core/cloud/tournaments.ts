import {
  CloudTournamentRow,
  HgtTournament
} from '../models/cloud.models';

export function tournamentCloudRow(
  tournament: HgtTournament,
  gameId: string
): CloudTournamentRow {
  return {
    game_id: gameId,
    season: tournament.season ?? 1,
    data: tournament
  };
}

export function tournamentPruneCutoff(
  season: number,
  keepSeasons: number
): number | null {
  const cutoff =
    Number(season || 1) -
    Number(keepSeasons || 0);

  return cutoff >= 1
    ? cutoff
    : null;
}
