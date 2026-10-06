import { GenealogyCloudStorage } from '../genealogy/genealogy-storage';

type SyncArgs =
  Parameters<GenealogyCloudStorage['sync']>;

export class GenealogyCloudController {
  constructor(
    private readonly storage: GenealogyCloudStorage
  ) {}

  sync(
    descendants: SyncArgs[0],
    npcs: SyncArgs[1]
  ): Promise<void> {
    return this.storage.sync(
      descendants,
      npcs
    );
  }
}
