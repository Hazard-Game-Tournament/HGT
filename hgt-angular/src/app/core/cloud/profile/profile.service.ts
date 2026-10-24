import { ProfileCloudClient } from './profile-client';
import { ProfileAvatarWriter } from './profile-avatar';
import { ProfileReader } from './profile-reader';
import { ProfileWriter } from './profile-writer';

export class ProfileService {
  readonly reader: ProfileReader;
  readonly writer: ProfileWriter;
  readonly avatar: ProfileAvatarWriter;

  constructor(client: ProfileCloudClient) {
    this.reader = new ProfileReader(client);
    this.writer = new ProfileWriter(client);
    this.avatar = new ProfileAvatarWriter(client);
  }
}
