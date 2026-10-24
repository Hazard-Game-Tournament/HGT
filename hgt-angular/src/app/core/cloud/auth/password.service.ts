import { HgtAuthClient } from './auth.models';

export class PasswordService {
  constructor(private readonly auth: HgtAuthClient) {}

  async requestReset(
    email: string,
    redirectTo?: string,
  ): Promise<void> {
    const { error } = await this.auth.resetPasswordForEmail(
      email.trim(),
      redirectTo ? { redirectTo } : undefined,
    );
    if (error) throw error;
  }

  async update(password: string): Promise<void> {
    if (password.length < 6) {
      throw new Error(
        'Le nouveau mot de passe doit contenir au moins 6 caractères.',
      );
    }

    const { error } = await this.auth.updateUser({ password });
    if (error) throw error;
  }
}
