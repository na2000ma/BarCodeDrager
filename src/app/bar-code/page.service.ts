import { Injectable } from '@angular/core';
import { Dimension, Page } from './page.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  realPages!: Page[];
  pages!: Page[];
  pagesObserver: BehaviorSubject<Page[]> = new BehaviorSubject<Page[]>(
    this.pages
  );
  realPagesObserver: BehaviorSubject<Page[]> = new BehaviorSubject<Page[]>(
    this.pages
  );

  dimensions!: Dimension[];
  constructor() {
    this.realPages = [
      { type: 'A0', height: 118.8 * 37.8, width: 84.1 * 37.8 },
      { type: 'A1', height: 84.1 * 37.8, width: 59.4 * 37.8 },
      { type: 'A2', height: 59.4 * 37.8, width: 42.0 * 37.8 },
      { type: 'A3', height: 42.0 * 37.8, width: 29.7 * 37.8 },
      { type: 'A4', height: 29.8 * 37.8, width: 21.1 * 37.8 },
    ];

    this.pages = [
      {
        type: 'A0',
        height: this.realPages[0].height * 0.2,
        width: this.realPages[0].width * 0.2,
      },
      {
        type: 'A1',
        height: this.realPages[1].height * 0.25,
        width: this.realPages[1].width * 0.25,
      },
      {
        type: 'A2',
        height: this.realPages[2].height * 0.3,
        width: this.realPages[2].width * 0.3,
      },
      {
        type: 'A3',
        height: this.realPages[3].height * 0.35,
        width: this.realPages[3].width * 0.35,
      },
      {
        type: 'A4',
        height: this.realPages[4].height * 0.45,
        width: this.realPages[4].width * 0.45,
      },
      //{ type: 'A5', height: 490, width: 500 },
      // { type: 'A6', height: 100, width: 200 },
      // { type: 'A7', height: 100, width: 150 },
      // { type: 'A8', height: 100, width: 100 },
      // { type: 'A9', height: 100, width: 80 },
    ];

    this.pagesObserver.next(this.pages);
    this.realPagesObserver.next(this.realPages);
    this.dimensions = [{ type: 'px' }, { type: 'cm' }, { type: '%' }];
  }

  loadData(): Promise<any> {
    return new Promise((resolve, reject) => {
      // Load your data here
      // ...
      // Once the data is loaded, resolve the promise
      resolve(this.pages);
    });
  }

  public store(page: Page): void {
    this.realPages.push(page);
    this.realPagesObserver.next(this.realPages);
  }
}
