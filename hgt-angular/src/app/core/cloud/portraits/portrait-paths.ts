import { PortraitContext } from './portrait.models';

export class PortraitPaths {
  constructor(
    private readonly context: PortraitContext,
    private readonly identity: (characterId: string) => string,
  ) {}

  characterKey(characterId: string): string {
    return `${this.context.gameId}__${this.identity(characterId)}`;
  }

  generatedDir(characterId: string): string {
    return (
      `${this.context.userId}/characters/` +
      this.characterKey(characterId)
    );
  }

  generated(characterId: string, number: number): string {
    const id = this.identity(characterId);
    return `${this.generatedDir(characterId)}/${id}-Portrait_${number}.png`;
  }

  champion(characterId: string): string {
    const id = this.identity(characterId);
    return `${this.generatedDir(characterId)}/${id}-Champion.png`;
  }

  legacy(characterId: string): string {
    return (
      `${this.context.userId}/${this.context.gameId}/` +
      this.identity(characterId)
    );
  }

  prefix(characterId: string): string {
    return `${this.identity(characterId)}-Portrait_`;
  }
}
