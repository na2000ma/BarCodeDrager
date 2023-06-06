import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentContainerComponent } from './development-container.component';

describe('DevelopmentContainerComponent', () => {
  let component: DevelopmentContainerComponent;
  let fixture: ComponentFixture<DevelopmentContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DevelopmentContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevelopmentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
