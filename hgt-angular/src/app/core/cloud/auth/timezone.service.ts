import {
  HgtAuthClient,
  HgtUser,
} from './auth.models';

const META_KEY = 'hgt_timezone';

export class TimezoneService {
  constructor(private readonly auth: HgtAuthClient) {}

  detected(): string {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    } catch {
      return 'UTC';
    }
  }

  current(user: HgtUser | null): string {
    const zone = user?.user_metadata?.[META_KEY];
    return typeof zone === 'string' && zone ? zone : this.detected();
  }

  async save(user: HgtUser, zone: string): Promise<HgtUser> {
    zone = String(zone || '').trim();
    new Intl.DateTimeFormat('fr-FR', { timeZone: zone }).format(new Date());

    const data = {
      ...(user.user_metadata ?? {}),
      [META_KEY]: zone,
    };

    const result = await this.auth.updateUser({ data });
    if (result.error) throw result.error;
    return result.data.user ?? user;
  }
}
