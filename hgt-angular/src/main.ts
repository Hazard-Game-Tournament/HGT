import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => {
    console.error(err);
    const report = (window as any).__hgtReport;
    const msg = 'Erreur au démarrage d\'Angular : ' + (err && err.stack ? err.stack : String(err));
    if (typeof report === 'function') {
      report(msg);
    } else {
      const pre = document.createElement('pre');
      pre.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:99999;margin:0;padding:8px;background:#b00020;color:#fff;font:12px monospace;white-space:pre-wrap;max-height:50vh;overflow:auto';
      pre.textContent = msg;
      document.body.appendChild(pre);
    }
  });
