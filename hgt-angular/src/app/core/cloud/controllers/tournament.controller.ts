import { TournamentCloudStorage } from '../tournament-storage';

export class TournamentCloudController {
  constructor(
    private readonly storage: TournamentCloudStorage,
    private readonly keepSeasons: number
  ) {}

  save(tournament: any): Promise<unknown | null> {
    return this.storage.save(
      tournament,
      this.keepSeasons
    );
  }

  delete(season: number): Promise<void> {
    return this.storage.delete(season);
  }
}
