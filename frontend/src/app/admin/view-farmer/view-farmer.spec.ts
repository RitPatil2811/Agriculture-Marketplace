import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFarmer } from './view-farmer';

describe('ViewFarmer', () => {
  let component: ViewFarmer;
  let fixture: ComponentFixture<ViewFarmer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewFarmer],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewFarmer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
