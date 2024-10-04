/**
 * Le fait de les définir dans le « children » du DashboardRouter permet
 * de préciser au système de routing que les routes doivent être chargés
 * dans le router-outlet du DashboardRouter et non celui du app.component.ts
 */
import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('@dashboard/router/dashboard-router/dashboard-router.component')
      .then(c => c.DashboardRouterComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('@dashboard/home/page/dashboard-home-page/dashboard-home-page.component')
          .then(c => c.DashboardHomePageComponent),
      },
      {
        path: 'member',
        loadChildren: () => import('./feature/member/member.routes')
        .then( r => r.memberRoutes),
      },
    ],
  },

];
