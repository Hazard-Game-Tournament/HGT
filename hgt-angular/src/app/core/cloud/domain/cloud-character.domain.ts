import { HgtCharacter } from '../../models/cloud.models';
import {
  characterCloudRow,
  CharacterCodeParser,
  rosterCloudRows
} from '../characters';

export class CloudCharacterDomain {
  constructor(
    private readonly gameId: string,
    private readonly parser: CharacterCodeParser
  ) {}

  characterRow(character: HgtCharacter) {
    return characterCloudRow(
      character,
      this.gameId,
      this.parser
    );
  }

  rosterRows(
    roster: Record<string, HgtCharacter | null | undefined>
  ) {
    return rosterCloudRows(
      roster,
      this.gameId,
      this.parser
    );
  }
}
