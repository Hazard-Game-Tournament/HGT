export class GenerationBusy {
  private readonly active = new Set<string>();

  key(characterId: string, champion = false): string {
    return champion
      ? `${characterId}::champion`
      : characterId;
  }

  has(characterId: string, champion = false): boolean {
    return this.active.has(this.key(characterId, champion));
  }

  start(characterId: string, champion = false): boolean {
    const key = this.key(characterId, champion);
    if (this.active.has(key)) return false;
    this.active.add(key);
    return true;
  }

  finish(characterId: string, champion = false): void {
    this.active.delete(this.key(characterId, champion));
  }
}
