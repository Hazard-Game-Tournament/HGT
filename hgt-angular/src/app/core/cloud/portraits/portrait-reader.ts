import {
  GeneratedPortrait,
} from './portrait.models';
import { PortraitPaths } from './portrait-paths';
import { PortraitStorageClient } from './storage-client';

const BUCKET = 'character-images';

export class PortraitReader {
  constructor(
    private readonly client: PortraitStorageClient,
    private readonly paths: PortraitPaths,
  ) {}

  async list(characterId: string): Promise<GeneratedPortrait[]> {
    const dir = this.paths.generatedDir(characterId);
    const prefix = this.paths.prefix(characterId);

    const { data, error } = await this.client.storage
      .from(BUCKET)
      .list(dir, {
        limit: 100,
        sortBy: { column: 'name', order: 'asc' },
      });

    if (error) throw error;

    return (data ?? [])
      .filter(file =>
        file.name.startsWith(prefix) &&
        /-Portrait_\d+\.png$/.test(file.name)
      )
      .map(file => portraitEntry(dir, file.name))
      .sort((a, b) => a.number - b.number);
  }

  async download(path: string): Promise<Blob | null> {
    const { data, error } = await this.client.storage
      .from(BUCKET)
      .download(path);

    return error ? null : data;
  }
}

function portraitEntry(dir: string, name: string): GeneratedPortrait {
  const number = Number(
    (name.match(/Portrait_(\d+)\.png$/) ?? [])[1],
  ) || 0;

  return { name, path: `${dir}/${name}`, number };
}
