/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeanMessageComponent } from './dean-message.component';

describe('DeanMessageComponent', () => {
  let component: DeanMessageComponent;
  let fixture: ComponentFixture<DeanMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeanMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeanMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
