import { PortraitContext } from './portrait.models';
import { PortraitPaths } from './portrait-paths';
import { PortraitReader } from './portrait-reader';
import { PortraitResolver } from './portrait-resolver';
import { PortraitSelection } from './portrait-selection';
import { PortraitStorageClient } from './storage-client';
import { PortraitWriter } from './portrait-writer';

export class PortraitService {
  readonly paths: PortraitPaths;
  readonly reader: PortraitReader;
  readonly writer: PortraitWriter;
  readonly selection: PortraitSelection;
  readonly resolver: PortraitResolver;

  constructor(
    client: PortraitStorageClient,
    context: PortraitContext,
    identity: (characterId: string) => string,
  ) {
    this.paths = new PortraitPaths(context, identity);
    this.reader = new PortraitReader(client, this.paths);
    this.writer = new PortraitWriter(client, this.paths);
    this.selection = new PortraitSelection(
      this.reader,
      this.writer,
    );
    this.resolver = new PortraitResolver(
      this.reader,
      this.paths,
    );
  }
}
