/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VisionMissionPageComponent } from './vision-mission-page.component';

describe('VisionMissionPageComponent', () => {
  let component: VisionMissionPageComponent;
  let fixture: ComponentFixture<VisionMissionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisionMissionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisionMissionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
