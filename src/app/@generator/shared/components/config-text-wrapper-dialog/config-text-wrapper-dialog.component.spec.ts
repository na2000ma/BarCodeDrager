import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigTextWrapperDialogComponent } from './config-text-wrapper-dialog.component';

describe('ConfigTextWrapperDialogComponent', () => {
  let component: ConfigTextWrapperDialogComponent;
  let fixture: ComponentFixture<ConfigTextWrapperDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ConfigTextWrapperDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigTextWrapperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
