import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Par_Code';
  loader = true;

  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }
  ngOnInit(): void {
    //Loader variable set false after page load
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  }
}
