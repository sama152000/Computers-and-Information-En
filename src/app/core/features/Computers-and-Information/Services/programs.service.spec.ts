/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProgramsService } from './programs.service';

describe('Service: Programs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgramsService]
    });
  });

  it('should ...', inject([ProgramsService], (service: ProgramsService) => {
    expect(service).toBeTruthy();
  }));
});
