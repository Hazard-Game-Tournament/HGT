import { CharacterPortraitState } from './portrait.models';
import { PortraitPaths } from './portrait-paths';
import { PortraitReader } from './portrait-reader';

export class PortraitResolver {
  constructor(
    private readonly reader: PortraitReader,
    private readonly paths: PortraitPaths,
  ) {}

  async downloadBest(
    characterId: string,
    state: CharacterPortraitState,
    generatedOnly = false,
  ): Promise<Blob | null> {
    if (state.championPath) {
      const blob = await this.reader.download(state.championPath);
      if (blob) return blob;
    }

    if (state.selectedPortrait) {
      const blob = await this.reader.download(state.selectedPortrait);
      if (blob) return blob;
    }

    const portraits = await this.reader.list(characterId);
    const latest = portraits.at(-1);

    if (latest) {
      const blob = await this.reader.download(latest.path);
      if (blob) return blob;
    }

    if (generatedOnly) return null;
    return this.reader.download(this.paths.legacy(characterId));
  }
}
