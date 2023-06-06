import { TestBed } from '@angular/core/testing';

import { SubLayoutService } from './sub-layout.service';

describe('SubLayoutService', () => {
  let service: SubLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
