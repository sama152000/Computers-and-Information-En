/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SectorsService } from './sectors.service';

describe('Service: Sectors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SectorsService]
    });
  });

  it('should ...', inject([SectorsService], (service: SectorsService) => {
    expect(service).toBeTruthy();
  }));
});
