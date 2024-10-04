/**
 *
 */
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { inject, PLATFORM_ID } from '@angular/core';
import { TokenService } from '@security/service';
import { environment } from '@environments';
import { isNil } from 'lodash';
import { isPlatformBrowser } from '@angular/common';

export const DashboardGuard = (redirectRoute: string = ""): CanActivateFn => {

  return () => {
    const router: Router = inject(Router);  // Dependency injection in order to get the Router class

    // Here we verify that we are on client side, not on server side
    if(isPlatformBrowser(PLATFORM_ID)) {
      // If we are on client side, we retrieve the token from localStorage
      // of the navigator.
      const tokenStr = localStorage.getItem(environment.TOKEN_KEY);
      // We parse the token and check that it's not empty
      const canAccess: boolean =  !isNil(tokenStr)
      && JSON.parse(tokenStr).token.length > 0;

      // Here we return canAcces if TRUE, else redirect to another route ( default: homepage )
      return canAccess || router.createUrlTree([redirectRoute]);
    }else{
      return router.createUrlTree([redirectRoute]);
    }

  };
}
