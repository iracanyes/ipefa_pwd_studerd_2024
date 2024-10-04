import { Routes } from '@angular/router';
import { AppNode } from '@shared/routes/enum/node.enum';

export const securityRoutes : Routes = [
  {
    path: 'login',
    redirectTo: AppNode.SIGN_IN,
    pathMatch: 'full',
  },
  {
    path: 'signin',
    redirectTo: AppNode.SIGN_IN,
    pathMatch: 'full',
  },
  {
    path: AppNode.SIGN_IN,
    loadComponent: () => import('@security/page/sign-in-page/sign-in-page.component')
      .then( c => c.SignInPageComponent)
  },
  {
    path: AppNode.FALLBACK,
    loadComponent: () => import('@security/page/security-fallback-page/security-fallback-page.component')
    .then( c => c.SecurityFallbackPageComponent),
  }
];
