import { HgtDescendant, HgtNpc } from '../../models/cloud.models';
import { CloudClient } from '../cloud-client';
import { CloudService } from '../cloud.service';
import { syncDescendants } from './descendant-sync';
import { syncNpcs } from './npc-sync';

export class GenealogyCloudStorage {
  constructor(
    private readonly client: CloudClient,
    private readonly domain: CloudService
  ) {}

  async sync(
    descendants: Record<string, HgtDescendant | null | undefined>,
    npcs: Record<string, HgtNpc | null | undefined>
  ): Promise<void> {
    // Ordre volontairement conservé.
    await syncDescendants(
      this.client,
      this.domain,
      descendants
    );

    await syncNpcs(
      this.client,
      this.domain,
      npcs
    );
  }
}
