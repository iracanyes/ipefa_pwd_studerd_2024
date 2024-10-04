import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { HttpInterceptor } from '@api/service/http.interceptor';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '@shared/config/i18n';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // withComponentInputBinding allow to inject request params as input
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    // Alternative: importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch(), withInterceptors([HttpInterceptor])),
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      /**
       * Here we add a message formatter which compile with custom rule
       * for plural in french
       *
       */
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    }))
  ]
};
