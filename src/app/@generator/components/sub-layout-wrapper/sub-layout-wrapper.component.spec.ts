import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubLayoutWrapperComponent } from './sub-layout-wrapper.component';

describe('SubLayoutWrapperComponent', () => {
  let component: SubLayoutWrapperComponent;
  let fixture: ComponentFixture<SubLayoutWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SubLayoutWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubLayoutWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
