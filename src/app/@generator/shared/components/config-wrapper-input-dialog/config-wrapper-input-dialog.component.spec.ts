import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigWrapperInputDialogComponent } from './config-wrapper-input-dialog.component';

describe('ConfigWrapperInputDialogComponent', () => {
  let component: ConfigWrapperInputDialogComponent;
  let fixture: ComponentFixture<ConfigWrapperInputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ConfigWrapperInputDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigWrapperInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
