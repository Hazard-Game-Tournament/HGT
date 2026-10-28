import { Routes } from '@angular/router';
import { signedInGuard } from './auth.guard';
import { Login } from './login/login';
import { Menu } from './menu/menu';
import { Wheel } from './wheel/wheel';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: Login },
  { path: 'menu', component: Menu, canActivate: [signedInGuard] },
  { path: 'roue', component: Wheel, canActivate: [signedInGuard] },
  { path: '**', redirectTo: 'login' },
];
