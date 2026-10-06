import { HgtCharacter, HgtDescendant, HgtNpc, HgtTournament } from '../models/cloud.models';
import { cloudGameStateRow } from './game-state';
import { CloudCharacterDomain } from './domain/cloud-character.domain';
import { CloudDomainConfig } from './domain/cloud-domain.models';
import { CloudGenealogyDomain } from './domain/cloud-genealogy.domain';
import { CloudTournamentDomain } from './domain/cloud-tournament.domain';

export type { CloudDomainConfig } from './domain/cloud-domain.models';

export class CloudService {
  private readonly character: CloudCharacterDomain;
  private readonly genealogy: CloudGenealogyDomain;
  private readonly tournament: CloudTournamentDomain;

  constructor(private readonly config: CloudDomainConfig) {
    this.character = new CloudCharacterDomain(config.gameId, config.parseCharacterCode);
    this.genealogy = new CloudGenealogyDomain(config.gameId);
    this.tournament = new CloudTournamentDomain(config.gameId);
  }

  get gameId(): string { return this.config.gameId; }

  characterRow(value: HgtCharacter) {
    return this.character.characterRow(value);
  }

  rosterRows(value: Record<string, HgtCharacter | null | undefined>) {
    return this.character.rosterRows(value);
  }

  descendantRows(value: Record<string, HgtDescendant | null | undefined>) {
    return this.genealogy.descendantRows(value);
  }

  npcRows(value: Record<string, HgtNpc | null | undefined>) {
    return this.genealogy.npcRows(value);
  }

  staleCodes(remote: Array<string | null | undefined>, local: Array<string | null | undefined>) {
    return this.genealogy.staleCodes(remote, local);
  }

  tournamentRow(value: HgtTournament) {
    return this.tournament.tournamentRow(value);
  }

  tournamentCutoff(season: number, keep: number) {
    return this.tournament.tournamentCutoff(season, keep);
  }

  gameStateRow(season: number, character: number, meta: unknown) {
    return cloudGameStateRow(season, character, meta);
  }
}
