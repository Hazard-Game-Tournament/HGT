import { CharacterCodeParser } from '../characters';

export interface CloudDomainConfig {
  gameId: string;
  parseCharacterCode: CharacterCodeParser;
}
