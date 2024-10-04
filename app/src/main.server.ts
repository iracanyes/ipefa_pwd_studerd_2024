import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '@root';
import { config } from "@root";

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
