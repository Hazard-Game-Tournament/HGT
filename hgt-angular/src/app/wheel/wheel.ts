import { Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

const HIDDEN_SELECTORS = [
  '#hgtEntry', '.hgt-artifact-header', '.cloud-bar', '.hgt-artifact-tabs', '.tabs',
  '#communityTab', '#listTab', '#genealogyTab', '#tournamentTab', '#hallTab',
  '#duelLocalTab', '#multiplayerTab', '#universeTab', '.tabpage:not(#wheelTab)',
];

const WHEEL_ONLY_CSS = `
${HIDDEN_SELECTORS.join(',\n')} { display: none !important; }
#wheelTab { display: block !important; visibility: visible !important; opacity: 1 !important; }
`;

@Component({
  selector: 'app-wheel',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="wheel-toolbar"><a routerLink="/menu">← Menu principal</a><span>CRÉATION DE PERSONNAGE</span></header>
    <iframe class="legacy-wheel" title="Roue de création de personnage Hazard Game Tournament" src="./legacy/index.html" loading="eager" allow="fullscreen; clipboard-read; clipboard-write" (load)="prepareWheelOnly($event)"></iframe>
  `,
  styles: `:host{display:flex;flex-direction:column;height:100dvh;background:#0b0e13;color:#eee3d4}.wheel-toolbar{height:48px;flex:0 0 48px;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 16px;border-bottom:1px solid #694b4b;background:#100d11;font:600 11px system-ui,sans-serif;letter-spacing:.12em;color:#c6a66d}.wheel-toolbar a{color:#ead3a0;text-decoration:none;letter-spacing:0;font-size:13px}.wheel-toolbar a:hover{text-decoration:underline}.legacy-wheel{display:block;flex:1;width:100%;min-height:0;border:0;background:#0b0e13}`,
})
export class Wheel implements OnDestroy {
  private observer?: MutationObserver;
  private scheduled = false;

  protected prepareWheelOnly(event: Event): void {
    const frame = event.target as HTMLIFrameElement;
    const doc = frame.contentDocument;
    if (!doc?.body) return;

    // Point 2 : règle CSS !important injectée, plus forte que css/styles.css
    if (!doc.getElementById('hgt-wheel-only')) {
      const style = doc.createElement('style');
      style.id = 'hgt-wheel-only';
      style.textContent = WHEEL_ONLY_CSS;
      doc.head.appendChild(style);
    }

    this.apply(doc);

    // Point 1 : on réapplique si l'ancienne app modifie la page
    this.observer?.disconnect();
    const view = doc.defaultView as (Window & typeof globalThis) | null;
    const Observer = view?.MutationObserver ?? MutationObserver;
    this.observer = new Observer(() => {
      if (this.scheduled) return;
      this.scheduled = true;
      (view ?? window).requestAnimationFrame(() => {
        this.scheduled = false;
        this.apply(doc);
      });
    });
    this.observer.observe(doc.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'hidden', 'style'] });
  }

  private apply(doc: Document): void {
    doc.body.classList.remove('hgt-gated');
    for (const selector of HIDDEN_SELECTORS) {
      doc.querySelectorAll<HTMLElement>(selector).forEach(el => { if (!el.hidden) el.hidden = true; });
    }
    // Point 3 : on force l'affichage de la roue
    const wheel = doc.getElementById('wheelTab');
    if (wheel) {
      if (wheel.hidden) wheel.hidden = false;
      if (!wheel.classList.contains('active')) wheel.classList.add('active');
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
