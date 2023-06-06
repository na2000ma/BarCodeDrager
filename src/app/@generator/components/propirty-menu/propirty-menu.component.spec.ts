import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropirtyMenuComponent } from './propirty-menu.component';

describe('PropirtyMenuComponent', () => {
  let component: PropirtyMenuComponent;
  let fixture: ComponentFixture<PropirtyMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PropirtyMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropirtyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
