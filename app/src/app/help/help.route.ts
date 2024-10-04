import { Routes } from '@angular/router';

export const helpRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('@help/help.component').then( r => r.HelpComponent),
  }
];
