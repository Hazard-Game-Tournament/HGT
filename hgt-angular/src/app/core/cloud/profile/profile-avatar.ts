import { ProfileCloudClient } from './profile-client';
import {
  PlayerProfile,
  ProfileAvatar,
  PROFILE_FIELDS,
} from './profile.models';

const TABLE = 'player_profiles';

export class ProfileAvatarWriter {
  constructor(private readonly client: ProfileCloudClient) {}

  async save(
    userId: string,
    avatar: ProfileAvatar,
  ): Promise<PlayerProfile> {
    const row = {
      avatar_champion_id: avatar.championId,
      avatar_image_path: avatar.imagePath,
      avatar_focus_x: clamp(avatar.focusX, 0, 100),
      avatar_focus_y: clamp(avatar.focusY, 0, 100),
      avatar_zoom: clamp(Math.round(avatar.zoom || 160), 100, 300),
    };

    const { data, error } = await this.client
      .from(TABLE)
      .update(row)
      .eq('user_id', userId)
      .select(PROFILE_FIELDS)
      .single();

    if (error) throw error;
    return data;
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Number(value)));
}
