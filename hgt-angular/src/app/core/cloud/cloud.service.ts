import {
  HgtCharacter,
  HgtDescendant,
  HgtNpc,
  HgtTournament
} from '../models/cloud.models';

import {
  CharacterCodeParser,
  characterCloudRow,
  rosterCloudRows
} from './characters';

import {
  descendantCloudRows,
  npcCloudRows,
  staleCloudCodes
} from './genealogy';

import {
  tournamentCloudRow,
  tournamentPruneCutoff
} from './tournaments';

import {
  cloudGameStateRow
} from './game-state';

export interface CloudDomainConfig {
  gameId: string;
  parseCharacterCode: CharacterCodeParser;
}

export class CloudService {
  constructor(
    private readonly config: CloudDomainConfig
  ) {}

  characterRow(
    character: HgtCharacter
  ) {
    return characterCloudRow(
      character,
      this.config.gameId,
      this.config.parseCharacterCode
    );
  }

  rosterRows(
    roster: Record<
      string,
      HgtCharacter | null | undefined
    >
  ) {
    return rosterCloudRows(
      roster,
      this.config.gameId,
      this.config.parseCharacterCode
    );
  }

  descendantRows(
    descendants: Record<
      string,
      HgtDescendant | null | undefined
    >
  ) {
    return descendantCloudRows(
      descendants,
      this.config.gameId
    );
  }

  npcRows(
    npcs: Record<
      string,
      HgtNpc | null | undefined
    >
  ) {
    return npcCloudRows(
      npcs,
      this.config.gameId
    );
  }

  staleCodes(
    remoteCodes: Array<
      string | null | undefined
    >,
    localCodes: Array<
      string | null | undefined
    >
  ) {
    return staleCloudCodes(
      remoteCodes,
      localCodes
    );
  }

  tournamentRow(
    tournament: HgtTournament
  ) {
    return tournamentCloudRow(
      tournament,
      this.config.gameId
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

  gameStateRow(
    seasonNumber: number,
    characterNumber: number,
    universeMeta: unknown
  ) {
    return cloudGameStateRow(
      seasonNumber,
      characterNumber,
      universeMeta
    );
  }
}
