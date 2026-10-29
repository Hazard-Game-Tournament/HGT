import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';

// withHashLocation : les URLs deviennent .../HGT/#/menu, .../HGT/#/roue.
// GitHub Pages ne sert alors toujours que index.html : plus de page 404
// ni de fichiers introuvables quand on recharge ou ouvre un lien direct.
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withHashLocation())
  ]
};
