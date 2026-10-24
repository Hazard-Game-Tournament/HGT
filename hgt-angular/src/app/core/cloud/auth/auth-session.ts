import {
  HgtAuthClient,
  HgtUser,
} from './auth.models';

export class AuthSession {
  constructor(private readonly auth: HgtAuthClient) {}

  async currentUser(): Promise<HgtUser | null> {
    const { data, error } = await this.auth.getSession();
    if (error) throw error;
    return data.session?.user ?? null;
  }

  async login(email: string, password: string): Promise<void> {
    const result = await this.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (result.error) throw result.error;
  }

  async signup(email: string, password: string): Promise<void> {
    const result = await this.auth.signUp({
      email: email.trim(),
      password,
    });
    if (result.error) throw result.error;
  }

  async logout(): Promise<void> {
    const { error } = await this.auth.signOut();
    if (error) throw error;
  }
}
