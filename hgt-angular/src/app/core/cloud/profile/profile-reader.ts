import {
  PlayerProfile,
  PROFILE_FIELDS,
} from './profile.models';
import { ProfileCloudClient } from './profile-client';

const TABLE = 'player_profiles';

export class ProfileReader {
  constructor(private readonly client: ProfileCloudClient) {}

  async load(userId: string): Promise<PlayerProfile | null> {
    const { data, error } = await this.client
      .from(TABLE)
      .select(PROFILE_FIELDS)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data ?? null;
  }
}
