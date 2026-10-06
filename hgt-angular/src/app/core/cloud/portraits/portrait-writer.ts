import { PortraitPaths } from './portrait-paths';
import { PortraitStorageClient } from './storage-client';

const BUCKET = 'character-images';

export class PortraitWriter {
  constructor(
    private readonly client: PortraitStorageClient,
    private readonly paths: PortraitPaths,
  ) {}

  async uploadLegacy(
    characterId: string,
    file: Blob,
  ): Promise<void> {
    const { error } = await this.client.storage
      .from(BUCKET)
      .upload(this.paths.legacy(characterId), file, {
        upsert: true,
        contentType: file.type || 'application/octet-stream',
      });

    if (error) throw error;
  }

  async remove(paths: string[]): Promise<void> {
    if (!paths.length) return;

    const { error } = await this.client.storage
      .from(BUCKET)
      .remove(paths);

    if (error) throw error;
  }
}
