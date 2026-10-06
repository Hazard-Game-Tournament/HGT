export interface PlayerProfile {
  user_id: string;
  username: string;
  avatar_champion_id?: string | null;
  avatar_image_path?: string | null;
  avatar_focus_x?: number | null;
  avatar_focus_y?: number | null;
  avatar_zoom?: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface ProfileAvatar {
  championId: string;
  imagePath: string;
  focusX: number;
  focusY: number;
  zoom: number;
}

export const PROFILE_FIELDS =
  'user_id,username,avatar_champion_id,avatar_image_path,' +
  'avatar_focus_x,avatar_focus_y,avatar_zoom,created_at,updated_at';
