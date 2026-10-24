import {
  HgtDescendant,
  HgtNpc
} from '../../models/cloud.models';
import {
  descendantCloudRows,
  npcCloudRows,
  staleCloudCodes
} from '../genealogy';

export class CloudGenealogyDomain {
  constructor(private readonly gameId: string) {}

  descendantRows(
    values: Record<string, HgtDescendant | null | undefined>
  ) {
    return descendantCloudRows(values, this.gameId);
  }

  npcRows(
    values: Record<string, HgtNpc | null | undefined>
  ) {
    return npcCloudRows(values, this.gameId);
  }

  staleCodes(
    remote: Array<string | null | undefined>,
    local: Array<string | null | undefined>
  ) {
    return staleCloudCodes(remote, local);
  }
}
