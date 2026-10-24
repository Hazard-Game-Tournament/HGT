import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

/**
 * Étape 1 de la migration : on héberge l'ancien js/app.js tel quel
 * dans un composant Angular. Les écrans seront ensuite extraits un par un
 * en vrais composants, puis ce composant sera supprimé.
 */
@Component({
  selector: 'hgt-legacy-host',
  standalone: true,
  template: `
    <div id="app" #host></div>
    @if (error) {
      <pre class="legacy-error">{{ error }}</pre>
    }
  `,
  styles: [`
    :host { display: block; min-height: 100vh; }
    .legacy-error {
      color: #ff8080; background: #200; padding: 1rem;
      white-space: pre-wrap; font-size: .8rem;
    }
  `]
})
export class LegacyHostComponent implements AfterViewInit, OnDestroy {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLElement>;
  error = '';
  private script?: HTMLScriptElement;

  ngAfterViewInit(): void {
    if (document.querySelector('script[data-hgt-legacy]')) {
      return;
    }
    const script = document.createElement('script');
    script.type = 'module';
    script.src = new URL('js/app.js', document.baseURI).href;
    script.dataset['hgtLegacy'] = 'true';
    script.onload = () => {
      document.dispatchEvent(new Event('DOMContentLoaded'));
      window.dispatchEvent(new Event('load'));
    };
    script.onerror = () => {
      this.error = 'Impossible de charger js/app.js (voir la console).';
    };
    window.addEventListener('error', this.onError);
    document.body.appendChild(script);
    this.script = script;
  }

  ngOnDestroy(): void {
    window.removeEventListener('error', this.onError);
  }

  private onError = (e: ErrorEvent) => {
    this.error += `${e.message}\n  ${e.filename}:${e.lineno}\n`;
  };
}
