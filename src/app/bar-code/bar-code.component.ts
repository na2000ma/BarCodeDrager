import {Subject} from 'rxjs';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {PageService} from './page.service';
import {Page} from './page.model';
import {TranslateService} from '@ngx-translate/core';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-bar-code',
  templateUrl: './bar-code.component.html',
  styleUrls: ['./bar-code.component.scss'],
})
export class BarCodeComponent implements OnInit, AfterViewInit {
  //overlay configuration
  @ViewChild('overlayTemplate') overlayTemplate!: TemplateRef<any>;
  @ViewChild('overlayContainer', {read: ViewContainerRef}) overlayContainer!: ViewContainerRef;
  // reference on the bar_code and its container.
  @ViewChild('qrContainer') qrContainer!: ElementRef;
  @ViewChild('img') img!: ElementRef;
  pages!: Page[];
  realPages!: Page[];
  parentWidth!: number;
  parentHeight!: number;
  pageType!: string;
  dimensionType!: string;
  imgWidth!: number;
  imgHeight!: number;
  isOpen!: boolean;
  styleObj: any = {};
  //bar code position
  x!: number;
  y!: number;
  enImgPath =
    'data:image/png;base64,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';
  arImgPath =
    'data:image/jpeg;base64,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';
  languages!: any[];
  currentLang!: any;
  //observable on direction change
  directionObs: Subject<any> = new Subject<void>();

  constructor(
    private pageService: PageService,
    private translate: TranslateService,
    private overlay: Overlay,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngAfterViewInit(): void {
    this.parentWidth = this.qrContainer.nativeElement.offsetWidth;
    this.parentHeight = this.qrContainer.nativeElement.offsetHeight;
    this.imgWidth = this.img.nativeElement.offsetWidth;
    this.imgHeight = this.img.nativeElement.offsetHeight;
    //access to the query params
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let obj = this.imageProcess(
        params['x'],
        params['y'] - this.qrContainer.nativeElement.offsetTop * 0.15
      );
      // 40 : margin top
      this.styleObj = {
        left: obj.x + this.dimensionType,
        top: this.parentHeight - obj.y - 40 + this.dimensionType,
      };
    });
  }

  ngOnInit(): void {
    //fake pages
    this.pages = this.pageService.pages;
    this.pageService.pagesObserver.subscribe((pages: Page[]) => {
      this.pages = pages;
    });

    //real pages
    this.realPages = this.pageService.realPages;
    this.pageService.realPagesObserver.subscribe((pages: Page[]) => {
      this.realPages = pages;
    });

    //language configuration
    this.languages = this.translate.getLangs();
    this.currentLang = this.translate.currentLang;
    this.directionObs.next('ltr');

    //keys listener
    document.addEventListener('keydown', (event) => {
      this.onKeyDown(event);
    });
  }

  showOverlay(): void {
    const config = new OverlayConfig({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });

    const overlayRef = this.overlay.create(config);
    if (this.overlayContainer) {
      const portal = new TemplatePortal(
        this.overlayTemplate,
        this.overlayContainer
      );
      overlayRef.attach(portal);
    }
    this.isOpen = !this.isOpen;
  }

  switchLanguage(event: any) {
    let value: string = event.target['outerText'];
    this.translate.use(value);
    let htmlTag = document.getElementsByTagName('html')[0] as HTMLHtmlElement;
    htmlTag.dir = value === 'ar' ? 'rtl' : 'ltr';
    this.isOpen = !this.isOpen;
    this.directionObs.next(htmlTag.dir);
  }

  onKeyDown(event: any): void {
    const name = event.key;

    switch (name) {
      case 'ArrowRight':
        this.x += 1;
        break;
      case 'ArrowLeft':
        this.x -= 1;
        break;
      case 'ArrowUp':
        this.y -= 1;
        break;
      case 'ArrowDown':
        this.y += 1;
        break;
    }
    this.applyChanges();
  }

  onDropQR(event: any): void {
    event.preventDefault();
    const qrContainerRect = this.qrContainer.nativeElement.getBoundingClientRect();
    this.x = event['x'] - qrContainerRect.left - 0.5 * this.imgWidth;
    this.y = event['y'] - qrContainerRect.top - 0.5 * this.imgHeight;
    this.applyChanges();
  }

  onDragOver(event: Event): void {
    event.preventDefault();
  }

  onPageChange(page: any): void {
    this.pageType = page;
    this.pages.forEach((page: Page) => {
      if (page.type == this.pageType && !!this.qrContainer) {
        this.qrContainer.nativeElement.style.width =
          page.width + this.dimensionType;
        this.qrContainer.nativeElement.style.height =
          page.height + this.dimensionType;
        this.parentWidth = page.width;
        this.parentHeight = page.height;
      }
    });
  }

  onDimensionChange(dimension: any): void {
    this.dimensionType = dimension;
  }

  onWidthChange(width: any): void {
    let obj = this.imageProcess(width, 0);
    this.img.nativeElement.style.width = obj.x + this.dimensionType;
  }

  onHeightChange(height: any): void {
    let obj = this.imageProcess(0, height);
    this.img.nativeElement.style.height = obj.y + this.dimensionType;
  }

  initPages() {
    let pageWidth = 0;
    let realPageWidth = 0;
    let pageHeight = 0;
    let realPageHeight = 0;
    this.pages.forEach((page: Page) => {
      if (page.type == this.pageType) {
        pageWidth = page.width;
        pageHeight = page.height;
      }
    });
    this.realPages.forEach((page: Page) => {
      if (page.type == this.pageType) {
        realPageWidth = page.width;
        realPageHeight = page.height;
      }
    });
    return {
      pageWidth: pageWidth,
      realPageWidth: realPageWidth,
      pageHeight: pageHeight,
      realPageHeight: realPageHeight,
    };
  }

  imageProcess(x_axis: number, y_axis: number) {
    let page = this.initPages();
    let x = (x_axis * page.pageWidth) / page.realPageWidth;
    let y = (y_axis * page.pageHeight) / page.realPageHeight;
    return {
      x: x,
      y: y,
    };
  }

  axisProcess(x_axis: number, y_axis: number) {
    let page = this.initPages();
    let x = (x_axis * page.realPageWidth) / page.pageWidth;
    let y = (y_axis * page.realPageHeight) / page.pageHeight;
    return {
      x: x,
      y: y,
    };
  }

  applyChanges() {
    if (!(
      this.x < 0 ||
      this.y < 0 ||
      this.x > this.parentWidth - this.imgWidth ||
      this.y > this.parentHeight - this.imgHeight
    )) {
      this.styleObj = {
        left: this.x + this.dimensionType,
        top: this.y + this.dimensionType,
      };
      let obj = this.axisProcess(this.x, this.y);

      let obj1 = this.imageProcess(120, 60);

      console.log(
        obj.x,
        '   ',
        Math.min(
          this.realPages[0].height - 4 * obj1.y,
          this.realPages[0].height - obj.y - obj1.x
        )
      );
    }


  }

}
