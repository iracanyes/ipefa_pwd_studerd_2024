import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInPageComponent } from '@security';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '@shared/config/enum/language.enum';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SignInPageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'IPEFA Projet web - Client';
  private readonly translate: TranslateService = inject(TranslateService);

  ngOnInit() {
    this.translate.setDefaultLang(Language.FR);
    this.translate.use(Language.FR);
  }

}
