import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

// Mêmes réglages que l'ancienne version (js/app.js).
const SUPABASE_URL = 'https://qeuqxvyrmrqvymrafvtv.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_cRbNvF-wSAkFrSUYq_Uc6g_sJ56grrF';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  readonly client: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true },
  });

  readonly user = signal<User | null>(null);
  readonly ready = signal(false);

  constructor() {
    this.client.auth.getSession().then(({ data }) => {
      this.user.set(data.session?.user ?? null);
      this.ready.set(true);
    });
    this.client.auth.onAuthStateChange((_event, session) => {
      this.user.set(session?.user ?? null);
    });
  }

  async signIn(email: string, password: string): Promise<void> {
    const { error } = await this.client.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async signUp(email: string, password: string): Promise<void> {
    const { error } = await this.client.auth.signUp({ email, password });
    if (error) throw error;
  }

  async signOut(): Promise<void> {
    await this.client.auth.signOut();
  }
}
