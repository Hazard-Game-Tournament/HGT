import { Routes } from '@angular/router';
import { LegacyHostComponent } from './features/legacy/legacy-host.component';

export const routes: Routes = [
  { path: '', component: LegacyHostComponent },
  { path: '**', redirectTo: '' }
];
