export interface HgtUser {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
}

export interface HgtSession {
  user: HgtUser;
}

export interface AuthResult<T = unknown> {
  data: T;
  error: { message?: string } | null;
}

export interface HgtAuthClient {
  getSession(): Promise<AuthResult<{ session?: HgtSession | null }>>;
  signInWithPassword(value: {
    email: string;
    password: string;
  }): Promise<AuthResult>;
  signUp(value: {
    email: string;
    password: string;
  }): Promise<AuthResult>;
  signOut(): Promise<AuthResult>;
  resetPasswordForEmail(
    email: string,
    options?: { redirectTo?: string }
  ): Promise<AuthResult>;
  updateUser(value: {
    password?: string;
    data?: Record<string, unknown>;
  }): Promise<AuthResult<{ user?: HgtUser | null }>>;
}
