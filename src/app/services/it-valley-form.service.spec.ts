import { TestBed } from '@angular/core/testing';

import { ItValleyFormService } from './it-valley-form.service';

describe('ItValleyFormService', () => {
  let service: ItValleyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItValleyFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
