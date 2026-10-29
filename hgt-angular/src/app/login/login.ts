import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../core/supabase.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <main class="hgt-login">
      <h1>⚔️ Hazard Game Tournament</h1>

      @if (!cloud.ready()) {
        <p>Connexion au serveur…</p>
      } @else if (cloud.user(); as u) {
        <p>Connecté en tant que <b>{{ u.email }}</b></p>
        <p class="note">Redirection vers le menu…</p>
        <button type="button" (click)="logout()">Se déconnecter</button>
      } @else {
        <form (ngSubmit)="login()">
          <label>E-mail<input type="email" name="email" [(ngModel)]="email" autocomplete="email" required /></label>
          <label>Mot de passe<input type="password" name="password" [(ngModel)]="password" autocomplete="current-password" required /></label>
          <button type="submit" [disabled]="busy()">Se connecter</button>
          <button type="button" class="secondary" [disabled]="busy()" (click)="register()">Créer un compte</button>
        </form>
      }

      @if (message()) { <p class="msg">{{ message() }}</p> }
    </main>
  `,
  styles: `
    .hgt-login { max-width: 380px; margin: 12vh auto; padding: 24px; color: #eee3d4; background: #0c0a0b; border: 1px solid #d7ad55; text-align: center; }
    h1 { color: #d6b36a; font-size: 24px; }
    form { display: grid; gap: 12px; text-align: left; }
    label { display: grid; gap: 4px; }
    input { padding: 10px; background: #1a1312; color: #eee3d4; border: 1px solid #4e3928; font-size: 16px; }
    button { padding: 10px; background: #6f1820; color: #fff; border: 1px solid #d6b36a; font-size: 16px; }
    button.secondary { background: transparent; }
    .msg { margin-top: 12px; color: #e8c37a; }
    .note { opacity: .7; }
  `,
})
export class Login {
  protected readonly cloud = inject(SupabaseService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected email = '';
  protected password = '';
  protected readonly busy = signal(false);
  protected readonly message = signal('');

  constructor() {
    effect(() => {
      if (this.cloud.ready() && this.cloud.user()) {
        const target = this.route.snapshot.queryParamMap.get('returnUrl');
        void this.router.navigateByUrl(target && target.startsWith('/') && !target.startsWith('/login') ? target : '/menu');
      }
    });
  }

  protected async login() { await this.run(() => this.cloud.signIn(this.email.trim(), this.password), ''); }
  protected async register() { await this.run(() => this.cloud.signUp(this.email.trim(), this.password), 'Compte créé. Vérifie tes e-mails si une confirmation est demandée.'); }
  protected async logout() { await this.run(() => this.cloud.signOut(), ''); }

  private async run(fn: () => Promise<void>, ok: string) {
    this.busy.set(true);
    this.message.set('');
    try { await fn(); this.message.set(ok); }
    catch (e: any) { this.message.set(e?.message || String(e)); }
    finally { this.busy.set(false); }
  }
}
