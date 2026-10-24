import {
  CloudClient,
  throwCloudError
} from '../cloud-client';
import {
  CloudGame,
  CloudGamePayload
} from './game.models';

export class GameCloudReader {
  constructor(private readonly client: CloudClient) {}

  async list(): Promise<CloudGame[]> {
    const result = await this.client
      .from<CloudGame[]>('games')
      .select('*')
      .order('updated_at', { ascending: false });

    throwCloudError(result);
    return result.data ?? [];
  }

  async load(id: string): Promise<CloudGamePayload> {
    const [game, characters, descendants, npcs, tournaments] =
      await Promise.all([
        this.client.from<CloudGame>('games')
          .select('*').eq('id', id).single(),
        this.client.from('characters')
          .select('*').eq('game_id', id),
        this.client.from('descendants')
          .select('*').eq('game_id', id),
        this.client.from('npcs')
          .select('*').eq('game_id', id),
        this.client.from('tournaments')
          .select('*').eq('game_id', id)
          .order('season', { ascending: false })
      ]);

    [game, characters, descendants, npcs, tournaments]
      .forEach(throwCloudError);

    if (!game.data) {
      throw new Error('Partie Cloud introuvable');
    }

    return {
      game: game.data,
      characters: (characters.data ?? []) as CloudGamePayload['characters'],
      descendants: (descendants.data ?? []) as CloudGamePayload['descendants'],
      npcs: (npcs.data ?? []) as CloudGamePayload['npcs'],
      tournaments: (tournaments.data ?? []) as CloudGamePayload['tournaments']
    };
  }
}
