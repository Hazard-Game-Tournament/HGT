import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from './core/supabase.service';

export const signedInGuard: CanActivateFn = async (_route, state) => {
  const cloud = inject(SupabaseService);
  const router = inject(Router);
  const { data, error } = await cloud.client.auth.getSession();
  if (!error && data.session) return true;
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
