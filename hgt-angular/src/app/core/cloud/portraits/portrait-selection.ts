import { GeneratedPortrait } from './portrait.models';
import { PortraitReader } from './portrait-reader';
import { PortraitWriter } from './portrait-writer';

export class PortraitSelection {
  constructor(
    private readonly reader: PortraitReader,
    private readonly writer: PortraitWriter,
  ) {}

  async nextNumber(characterId: string): Promise<number> {
    const portraits = await this.reader.list(characterId);

    return portraits.length
      ? Math.max(...portraits.map(item => item.number)) + 1
      : 1;
  }

  async keepOnly(
    characterId: string,
    path: string,
  ): Promise<GeneratedPortrait | null> {
    const portraits = await this.reader.list(characterId);
    const selected = portraits.find(item => item.path === path) ?? null;

    if (!selected) return null;

    await this.writer.remove(
      portraits
        .filter(item => item.path !== path)
        .map(item => item.path),
    );

    return selected;
  }
}
