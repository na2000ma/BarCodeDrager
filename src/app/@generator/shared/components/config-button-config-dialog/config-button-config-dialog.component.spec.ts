import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigButtonConfigDialogComponent } from './config-button-config-dialog.component';

describe('ConfigButtonConfigDialogComponent', () => {
  let component: ConfigButtonConfigDialogComponent;
  let fixture: ComponentFixture<ConfigButtonConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ConfigButtonConfigDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigButtonConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
