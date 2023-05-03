import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PageService } from '../page.service';
import { Dimension, Page } from '../page.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @ViewChild('pageRef', { static: false }) pageRef!: ElementRef;
  pages!: Page[];
  realPages!: Page[];
  dimensions!: Dimension[];
  formGroup!: FormGroup;
  templateFormGroup!: FormGroup;
  checked: [{}] = [{}];
  @Output('pageChange') pageChange: EventEmitter<string> =
    new EventEmitter<string>();
  @Output('dimensionChange') dimensionChange: EventEmitter<string> =
    new EventEmitter<string>();
  @Output('widthChange') widthChange: EventEmitter<number> =
    new EventEmitter<number>();
  @Output('heightChange') heightChange: EventEmitter<number> =
    new EventEmitter<number>();
  pageType: string = 'A4';
  dimensionType: string = 'px';
  width!: number;
  height!: number;
  constructor(private pageService: PageService) {}
  costumeMode: boolean = false;
  ngOnInit(): void {
    this.pageService.pagesObserver.subscribe((pages: Page[]) => {
      this.pages = pages;
    });
    this.pageService.realPagesObserver.subscribe((pages: Page[]) => {
      this.realPages = pages;
      this.pages.forEach((page: Page, index: number) => {
        this.checked.push(false);
      });
    });

    this.dimensions = this.pageService.dimensions;
    this.pageChange.emit(this.pageType);
    this.dimensionChange.emit(this.dimensionType);
    this.buildForm();
  }
  buildForm(): void {
    this.formGroup = new FormGroup({
      width: new FormControl(''),
      height: new FormControl(''),
      dimension: new FormControl(this.dimensions[0].type),
    });
    this.templateFormGroup = new FormGroup({
      name: new FormControl(''),
      pWidth: new FormControl(''),
      pHeight: new FormControl(''),
    });
  }

  onClickPage(page: Page, index: number): void {
    this.realPages.forEach((realPage: Page, i: number) => {
      if (page.type == realPage.type) {
        this.pageType = page.type;
      }
      this.checked[i] = false;
    });

    this.pageChange.emit(this.pageType);
    this.checked[index] = true;

    this.editForm();
  }

  onClickCostume(): void {
    this.costumeMode = !this.costumeMode;
  }

  onClickDimension(event: any): void {
    this.dimensionType = event.target['value'];

    this.dimensionChange.emit(this.dimensionType);
    this.editForm();
  }

  editForm(): void {
    this.realPages.forEach((page: Page) => {
      if (page.type == this.pageType) {
        this.dimensionChange.emit(this.dimensionType);
      }
    });
  }

  onSubmit(): void {
    let parWidth = this.formGroup.value['width'];
    let parHeight = this.formGroup.value['height'];
    this.dimensionType = this.formGroup.value['dimension'];
    this.widthChange.emit(parWidth);
    this.heightChange.emit(parHeight);
    this.dimensionChange.emit(this.dimensionType);
  }

  onTemplateSubmit(): void {
    let page: Page = new Page(
      this.templateFormGroup.value['name'],
      this.templateFormGroup.value['pWidth'],
      this.templateFormGroup.value['pHeight']
    );
    this.pageService.store(page);
  }
}
