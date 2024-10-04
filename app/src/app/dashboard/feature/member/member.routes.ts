import { AppNode } from '@shared/routes/enum/node.enum';

export const memberRoutes = [
  {
    path: AppNode.DETAIL,
    loadComponent: () => import('@dashboard/feature/member/page/member-detail-page/member-detail-page.component')
      .then( c => c.MemberDetailPageComponent),
  }
];
