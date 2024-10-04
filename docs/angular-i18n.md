# Angular - Internationalization

## Ngx Translate

### Install

````shell
$ npm i @ngx-translate/core @ngx-translate/http-loader --save 
````
### Configuration

#### Translation Loader

First we create a helper function which will load translation over HTTP calls.
````typescript
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
````

#### Configure the provider
In ``app.config.ts`` 
````typescript
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
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '@shared/config/i18n';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

export const appConfig: ApplicationConfig = {
  providers: [
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

````

### Translation files
#### French translation

````json
{
  "feature": {
    "security": {
      "page": {
        "sign-in": {
          "label": {
            "username": "Identifiant",
            "password": "Mot de passe"
          },
          "error": {
            "username-required": "Le nom d'utilisateur est requis!",
            "password-required": "Le mot de passe est requis!",
            "description": "{ count, plural, =0{Vous n'avez pas d'erreur} one{Vous avez une erreur} other {Vous avez # erreur(s)}}"
          }
        }
      }
    }
  }
}

````

### Initialize translation

In ``app.component.ts``, we inject the translation's service provided by the library
and initialize it with defaults options.

````typescript
import { TranslateService } from '@ngx-translate/core';
import { Language } from '@shared/config/enum/language.enum';

export class AppComponent implements OnInit { 
  title = 'app'; 
  translate = inject(TranslateService); 
  ngOnInit(): void { 
    this.translate.setDefaultLang(Language.FR); 
    this.translate.use(Language.FR); 
  } 
}
````

### Usage

````typescript
import { OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { inject } from '@angular/core';
import { Language } from './language.enum';

export class MyComponent implements OnInit {
  private readonly translate: TranslateService = inject(TranslateService);

  ngOnInit() {
    this.translate.setDefaultLang(Language.FR);
    this.translate.use(Language.FR);
  }
}

````

## Templating

````html
<p> {{'security-feature.sign-in-page.error.username-required' | translate}}</p>
<!-- fr.json => "security-feature.sign-in-page.error.description": "Vous avez {{count}} erreur(s)" -->
<p>{{'security-feature.sign-in-page.error.description' | translate: {count: errors().length} }}</p>

````

### Using the Message Formatter 

````json
{
  "security-feature.sign-in-page.error.description": "{count, plural, =0{Vous n'avez pas d'erreur} one{Vous avez une erreur} other{Vous avez {count} erreurs}}."
  
}
````