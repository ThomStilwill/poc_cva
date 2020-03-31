import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegacyeditComponent } from './legacyedit.component';

describe('LegacyeditComponent', () => {
  let component: LegacyeditComponent;
  let fixture: ComponentFixture<LegacyeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegacyeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegacyeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
