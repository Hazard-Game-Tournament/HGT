import {
  CloudClient,
  throwCloudError
} from '../cloud-client';

export class GameCloudWriter {
  constructor(private readonly client: CloudClient) {}

  async rename(
    id: string,
    name: string
  ): Promise<void> {
    const result = await this.client
      .from('games')
      .update({ name })
      .eq('id', id);

    throwCloudError(result);
  }

  async delete(id: string): Promise<void> {
    const result = await this.client
      .from('games')
      .delete()
      .eq('id', id);

    throwCloudError(result);
  }
}
