import { TestBed, inject } from '@angular/core/testing';

import { MurService } from './mur.service';

describe('MurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MurService]
    });
  });

  it('should be created', inject([MurService], (service: MurService) => {
    expect(service).toBeTruthy();
  }));
});
