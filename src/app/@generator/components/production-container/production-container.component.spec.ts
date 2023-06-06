import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionContainerComponent } from './production-container.component';

describe('ProductionContainerComponent', () => {
  let component: ProductionContainerComponent;
  let fixture: ComponentFixture<ProductionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProductionContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
