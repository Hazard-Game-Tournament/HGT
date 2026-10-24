import { CloudClient } from '../cloud-client';
import { CloudGame, CloudGamePayload } from './game.models';
import { GameCloudReader } from './game-reader';
import { GameCloudWriter } from './game-writer';

export class GameCloudStorage {
  private readonly reader: GameCloudReader;
  private readonly writer: GameCloudWriter;

  constructor(client: CloudClient) {
    this.reader = new GameCloudReader(client);
    this.writer = new GameCloudWriter(client);
  }

  list(): Promise<CloudGame[]> {
    return this.reader.list();
  }

  load(id: string): Promise<CloudGamePayload> {
    return this.reader.load(id);
  }

  rename(id: string, name: string): Promise<void> {
    return this.writer.rename(id, name);
  }

  delete(id: string): Promise<void> {
    return this.writer.delete(id);
  }
}
