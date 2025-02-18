import { Component } from '@angular/core';
import { 
  TranslateService,
  TranslatePipe,
  TranslateDirective
} from '@ngx-translate/core';
import { CharacterComponent } from './character.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ TranslateDirective, TranslatePipe, CharacterComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor( private translate: TranslateService) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang ? browserLang : 'en');
  }
}
