import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { catchError, EMPTY, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '@environments';
import { TokenService } from '@security/service/token.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppNode } from '@shared/routes/enum/node.enum';
import {
  AddTokenHeaderFn,
  HttpInterceptorCommonErrorHandlerFn,
  HttpInterceptorHandlerFn
} from '@api/types';
import { ApiService } from '@shared/api';
import { ApiUri } from '@api/enum/api-uri.enum';
import { ApiResponse } from '@api/types/api.response';
import { Token } from '@api/model/token.type';


const baseURL: string = environment.apiUrl;

// List of all public routes
const publicRoutes: string[] = [
  `${baseURL}`,
  `${baseURL}${ApiUri.SIGN_IN}`,
  `${baseURL}${ApiUri.ADMIN_SIGN_IN}`,
  `${baseURL}${ApiUri.SIGN_UP}`,
  `${baseURL}${ApiUri.REFRESH_TOKEN}`,
];

/**
 * Check if the request's route is public (in publicRoutes array)
 * else
 * @param req
 * @param next
 * @constructor
 */
export const HttpInterceptor: HttpInterceptorFn = (req, next) => {

  if(
    !req.url.startsWith(baseURL)
    || publicRoutes.includes(req.url)
  ) {
    // If it's a public, we pass the request to next handler
    return next(req)
      .pipe(
        tap(() => console.log(`Exemple de route publique que l'on intercepte! ${req.url}`)),
      );
  }

  // Here we're in restricted area, a token is mandatory
  // We inject TokenService only for private routes
  // and retrieve the token's value
  const tokenService: TokenService = inject(TokenService);

  const router: Router = inject(Router);

  // If the token is not empty
  // We attach the token to the Authorization header
  if(!tokenService.token().isEmpty){
    const api = inject(ApiService);

    return next(setTokenInHeader(req, tokenService.token().token))
      .pipe(
        catchError(
          (err: HttpErrorResponse) => handleError(
            err,
            req,
            next,
            tokenService,
            router,
            api
          )),
        tap(() => console.log(`Exemple de route privée que l'on intercepte! ${req.url}`)),
      );
  }

  // Redirect to public as no access token found
  return redirectToPublic(router);
}

//
const redirectToPublic: (router: Router) => Observable<any> = (router: Router) => {

  router.navigate([AppNode.REDIRECT_TO_PUBLIC]).then();

  return EMPTY;
};

const setTokenInHeader: AddTokenHeaderFn = (req: HttpRequest<any>, token: string): HttpRequest<any> => {
  return req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  })
};

const handleCommonError: HttpInterceptorCommonErrorHandlerFn = (
  err: HttpErrorResponse,
): Observable<any> => {
  throw(err);
}

/**
 * Handle the 401 error
 * @param err
 * @param req
 * @param next
 * @param tokenService
 * @param router
 * @param api
 */
const handleError: HttpInterceptorHandlerFn = (
  err: HttpErrorResponse,
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  tokenService: TokenService,
  router: Router,
  api: ApiService
): Observable<any> => {
  //
  if(err.status === 401 || err.status === 403) {

    // Here the token is expired
    // Check if refreshToken exists, and refresh the token.
    // If not we redirect to public route
    if(!tokenService.token().isEmpty){
      return api.post(ApiUri.REFRESH_TOKEN, { refresh: tokenService.token().refreshToken })
        .pipe(
          switchMap((result: ApiResponse) => {
            if(result.result) {
              // Finally, if we get new token, we retry
              return next(setTokenInHeader(req, result.data.token))
                .pipe(
                  catchError((err: HttpErrorResponse) => handleCommonError(err)),
                  tap(() => tokenService.setToken({ ...result.data.token as Token, isEmpty: false } ))
                );
            }

            // Redirect because refreshToken is expired too
            return redirectToPublic(router);
          })
        );
    }

    // Redirect because the refreshToken doesn't exist
    return redirectToPublic(router);
  }

  // Here we can show something to client
  // Maybe a toaster or ...
  return handleCommonError(err);
};

