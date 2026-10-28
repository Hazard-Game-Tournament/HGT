import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../core/supabase.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="hgt-menu-shell">
      <header class="hgt-menu-header">
        <div class="hgt-menu-mark" aria-hidden="true">✥</div>
        <div><p class="eyebrow">VAELORIA · PORTAIL DES JOUEURS</p><h1>Hazard Game Tournament</h1></div>
        <button class="logout" type="button" (click)="logout()" [disabled]="busy()">Se déconnecter</button>
      </header>
      <section class="welcome panel">
        <p class="eyebrow">BIENVENUE{{ cloud.user()?.email ? ', ' + cloud.user()?.email : '' }}</p>
        <h2>Que souhaitez-vous faire ?</h2>
        <p class="muted">Choisissez votre prochaine étape dans Vaeloria.</p>
      </section>
      <section class="menu-grid" aria-label="Menu principal">
        <a class="menu-card featured" routerLink="/roue">
          <span class="card-icon">✥</span><span class="card-tag">DISPONIBLE</span>
          <h2>Création de personnage</h2><p>Tournez la roue et découvrez votre prochain combattant.</p><span class="card-action">Ouvrir la roue <b>↗</b></span>
        </a>
        <button class="menu-card" type="button" (click)="comingSoon('Personnages')"><span class="card-icon">▤</span><span class="card-tag">BIENTÔT</span><h2>Personnages</h2><p>Consultez votre registre et les fiches de vos combattants.</p><span class="card-action">Bientôt disponible</span></button>
        <button class="menu-card" type="button" (click)="comingSoon('Lignées')"><span class="card-icon">♜</span><span class="card-tag">BIENTÔT</span><h2>Lignées</h2><p>Explorez les descendants et les histoires familiales.</p><span class="card-action">Bientôt disponible</span></button>
        <button class="menu-card" type="button" (click)="comingSoon('Arène')"><span class="card-icon">⚔</span><span class="card-tag">BIENTÔT</span><h2>Arène</h2><p>Tournois, duels et combats entre joueurs.</p><span class="card-action">Bientôt disponible</span></button>
        <button class="menu-card" type="button" (click)="comingSoon('Univers')"><span class="card-icon">✧</span><span class="card-tag">BIENTÔT</span><h2>Univers</h2><p>Découvrez les terres et les peuples de Vaeloria.</p><span class="card-action">Bientôt disponible</span></button>
      </section>
      @if (message()) { <p class="menu-message" role="status">{{ message() }}</p> }
      <footer>Chaque destinée commence par un tour de roue.</footer>
    </main>
  `,
  styles: `
    :host{display:block;min-height:100vh;background:radial-gradient(ellipse at 50% -18%,#332328 0,#151015 47%,#09080b 100%);color:#eee3d4;font-family:'EB Garamond',Georgia,serif}
    .hgt-menu-shell{max-width:1120px;margin:auto;padding:clamp(20px,5vw,62px) clamp(16px,4vw,42px)}
    .hgt-menu-header{display:flex;align-items:center;gap:17px;padding-bottom:25px;border-bottom:1px solid #694b4b}
    .hgt-menu-mark{width:54px;height:54px;display:grid;place-items:center;border:1px solid #bc9758;color:#e2c67e;border-radius:50%;font-size:30px;box-shadow:0 0 24px #d6b36a22}
    h1,h2{font-family:Cinzel,Georgia,serif}.hgt-menu-header h1{font-size:clamp(21px,4vw,32px);color:#ead3a0;margin:2px 0}.eyebrow{font:600 11px/1.4 system-ui,sans-serif;letter-spacing:.18em;color:#c6a66d;margin:0}.logout{margin-left:auto;background:transparent;color:#e8d8c2;border:1px solid #765463;border-radius:8px;padding:10px 14px;font:600 13px system-ui,sans-serif;cursor:pointer}.logout:hover{border-color:#d6b36a;color:#f3d89f}.logout:disabled{opacity:.5}
    .welcome{margin:30px 0 18px;padding:24px 26px;border:1px solid #4a3438;border-radius:12px;background:linear-gradient(120deg,#21161a,#130f13)}.welcome h2{font-size:clamp(22px,3.5vw,31px);margin:7px 0;color:#f0dfbf}.welcome p:last-child{margin:0}.muted{color:#aa9ba0}
    .menu-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:14px}.menu-card{grid-column:span 2;position:relative;min-height:225px;padding:22px;text-align:left;display:flex;flex-direction:column;align-items:flex-start;border:1px solid #48333a;border-radius:12px;color:#eadfcd;background:linear-gradient(150deg,#1c151a,#100d11);font-family:inherit;cursor:pointer;transition:transform .18s,border-color .18s,box-shadow .18s}.menu-card:hover{transform:translateY(-3px);border-color:#b28b54;box-shadow:0 14px 32px #0006}.menu-card.featured{grid-column:span 3;border-color:#856347;background:linear-gradient(140deg,#39251f,#191115)}.card-icon{font-size:26px;color:#e1bf76;margin-bottom:12px}.card-tag{position:absolute;right:16px;top:17px;font:700 9px system-ui,sans-serif;letter-spacing:.12em;color:#c8a15e}.menu-card h2{font-size:19px;color:#ead3a0;margin:0 0 8px}.menu-card p{font-size:16px;color:#aa9ba0;line-height:1.45;margin:0 0 18px}.card-action{margin-top:auto;font:600 12px system-ui,sans-serif;color:#d4b16b}.card-action b{font-size:17px;padding-left:6px}.menu-message{padding:12px;border:1px solid #765463;background:#1e1519;border-radius:8px;color:#ead3a0}footer{text-align:center;color:#86767d;font-style:italic;margin:30px 0 0}
    @media(max-width:700px){.menu-grid{grid-template-columns:1fr 1fr}.menu-card,.menu-card.featured{grid-column:span 1;min-height:205px;padding:17px}.menu-card.featured{grid-column:span 2;min-height:185px}.hgt-menu-header{gap:11px}.logout{font-size:11px;padding:8px}.welcome{padding:19px}}
    @media(max-width:420px){.menu-grid{grid-template-columns:1fr}.menu-card,.menu-card.featured{grid-column:span 1;min-height:175px}}
  `,
})
export class Menu {
  protected readonly cloud = inject(SupabaseService);
  private readonly router = inject(Router);
  protected readonly busy = signal(false);
  protected readonly message = signal('');

  protected comingSoon(name: string): void { this.message.set(`${name} sera disponible dans une prochaine mise à jour.`); }

  protected async logout(): Promise<void> {
    this.busy.set(true);
    try { await this.cloud.signOut(); await this.router.navigateByUrl('/login'); }
    catch (error) { this.message.set(error instanceof Error ? error.message : String(error)); }
    finally { this.busy.set(false); }
  }
}
