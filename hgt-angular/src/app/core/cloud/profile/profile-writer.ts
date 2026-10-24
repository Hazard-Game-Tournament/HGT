import { ProfileCloudClient } from './profile-client';
import {
  PlayerProfile,
  PROFILE_FIELDS,
} from './profile.models';
import { normalizedPseudo } from './profile.validation';

const TABLE = 'player_profiles';

export class ProfileWriter {
  constructor(private readonly client: ProfileCloudClient) {}

  async create(
    userId: string,
    username: string,
  ): Promise<PlayerProfile> {
    const row = {
      user_id: userId,
      username: normalizedPseudo(username),
    };

    const { data, error } = await this.client
      .from(TABLE)
      .insert(row)
      .select(PROFILE_FIELDS)
      .single();

    if (error) throw error;
    return data;
  }
}
