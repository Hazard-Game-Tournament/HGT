import { HgtTournament } from '../../models/cloud.models';
import {
  tournamentCloudRow,
  tournamentPruneCutoff
} from '../tournaments';

export class CloudTournamentDomain {
  constructor(private readonly gameId: string) {}

  tournamentRow(tournament: HgtTournament) {
    return tournamentCloudRow(
      tournament,
      this.gameId
    );
  }

  tournamentCutoff(
    season: number,
    keepSeasons: number
  ) {
    return tournamentPruneCutoff(
      season,
      keepSeasons
    );
  }
}
