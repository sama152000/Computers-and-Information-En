/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DepartmentsService } from './departments.service';

describe('Service: Departments', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepartmentsService]
    });
  });

  it('should ...', inject([DepartmentsService], (service: DepartmentsService) => {
    expect(service).toBeTruthy();
  }));
});
