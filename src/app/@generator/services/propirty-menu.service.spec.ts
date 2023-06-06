import { TestBed } from '@angular/core/testing';

import { PropirtyMenuService } from './propirty-menu.service';

describe('PropirtyMenuService', () => {
  let service: PropirtyMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropirtyMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
