import {
  CloudControllerState
} from '../cloud-controller';

import {
  HgtCharacter,
  HgtDescendant,
  HgtNpc,
  HgtTournament
} from '../../models/cloud.models';

export interface HgtCloudStateSource {
  seasonNumber: number;
  characterNumber: number;

  universeMeta:
    () => unknown;

  roster:
    () => Record<
      string,
      HgtCharacter | null | undefined
    >;

  descendants:
    () => Record<
      string,
      HgtDescendant | null | undefined
    >;

  npcs:
    () => Record<
      string,
      HgtNpc | null | undefined
    >;

  tournament:
    () => HgtTournament | null;
}

export function cloudStateFromHgt(
  source: HgtCloudStateSource
): CloudControllerState {
  return {
    seasonNumber:
      source.seasonNumber,

    characterNumber:
      source.characterNumber,

    universeMeta:
      source.universeMeta(),

    roster:
      source.roster(),

    descendants:
      source.descendants(),

    npcs:
      source.npcs(),

    tournament:
      source.tournament()
  };
}
