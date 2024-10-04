import { Routes } from '@angular/router';
import { DashboardGuard } from '@dashboard/dashboard.guard';
import { AppNode } from '@shared/routes/enum/node.enum';

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppNode.REDIRECT_TO_PUBLIC,
    pathMatch: 'full',
  },
  {
    path: AppNode.AUTHENTICATED,
    canActivate: [DashboardGuard(AppNode.REDIRECT_TO_LOGIN)],
    loadChildren: () => import('@dashboard/dashboard.routes')
      .then( r => r.dashboardRoutes),
  },
  {
    path: AppNode.PUBLIC,
    loadChildren: () => import('@security/route/security.route')
      .then( r => r.securityRoutes),
  },
  {
    path: 'help',
    loadChildren: () => import('@help/help.route').then( r => r.helpRoutes),
  },
  {
    path: AppNode.FALLBACK,
    loadComponent: () => import('@root/page/global-fallback-page/global-fallback-page.component')
      .then(r => r.GlobalFallbackPageComponent),
  }
];
