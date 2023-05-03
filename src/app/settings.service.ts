import { Injectable } from '@angular/core';
import { PageService } from './bar-code/page.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  config: any;
  constructor(pageService: PageService) {
    this.config = {
      pageType: pageService.pages[0].type,
      width: pageService.pages[0].width + 'px',
      height: pageService.pages[0].height + 'px',
      barX: '0px',
      barY: '0px',
      barWidth: '120px',
      barHeight: '60px',
    };
  }
}
