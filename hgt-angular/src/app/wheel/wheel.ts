import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
export class Wheel {
  protected prepareWheelOnly(event: Event): void {
    const frame = event.target as HTMLIFrameElement;
    const doc = frame.contentDocument;
    if (!doc) return;
    const entry = doc.querySelector<HTMLElement>('#hgtEntry');
    if (entry) entry.hidden = true;
    doc.body.classList.remove('hgt-gated');
    for (const selector of ['.hgt-artifact-header', '.cloud-bar', '.hgt-artifact-tabs', '.tabs', '#communityTab', '#listTab', '#genealogyTab', '#tournamentTab', '#hallTab', '#duelLocalTab', '#multiplayerTab', '#universeTab']) {
      doc.querySelectorAll<HTMLElement>(selector).forEach(element => element.hidden = true);
    }
    doc.querySelectorAll<HTMLElement>('.tabpage:not(#wheelTab)').forEach(element => element.hidden = true);
  }
}
