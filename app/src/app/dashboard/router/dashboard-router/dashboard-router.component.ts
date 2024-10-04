import { Component, inject } from '@angular/core';
import { AppRoutes } from '@shared/routes/enum/app.routes';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ApiService } from '@shared/api';
import { TokenService } from '@security/service/token.service';

@Component({
  selector: 'app-dashboard-router',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './dashboard-router.component.html',
  styleUrl: './dashboard-router.component.scss'
})
export class DashboardRouterComponent {
  routes = AppRoutes;

  private readonly api: ApiService = inject(ApiService);

  ngOnInit() {
    this.api.get('').subscribe((data) => {
      console.log('my data', data);

    })
  }

}
