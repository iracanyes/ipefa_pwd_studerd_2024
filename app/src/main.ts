import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '@root';
import { AppComponent } from '@root';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
