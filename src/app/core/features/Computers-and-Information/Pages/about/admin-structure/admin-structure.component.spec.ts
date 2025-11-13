/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminStructureComponent } from './admin-structure.component';

describe('AdminStructureComponent', () => {
  let component: AdminStructureComponent;
  let fixture: ComponentFixture<AdminStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
