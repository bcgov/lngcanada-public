import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LngComponent } from './lng.component';

describe('LngComponent', () => {
  let component: LngComponent;
  let fixture: ComponentFixture<LngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LngComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
